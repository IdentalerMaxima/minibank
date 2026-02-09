import { describe, expect, it } from "vitest";
import { createAccount, deposit, DomainError, withdraw, transfer } from "../src/domain/accountService.ts";

describe("create account", () => {
    it("should create a normal account with EUR welcome bonus", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck", undefined, "EUR");

        expect(acc.accountNumber).toBe("555-1111111-58"); 
        expect(acc.ownerName).toBe("Mr. Big Buck");             
        expect(acc.type).toBe("normal");                
        expect(acc.balance).toBe(10);                  
        expect(acc.currency).toBe("EUR");
    });

    it("should create a normal account with GBP welcome bonus", () => {
        const acc = createAccount("normal", "555-2222222-58", "Ms. Small Pocket", undefined, "GBP");

        expect(acc.balance).toBe(8);
        expect(acc.currency).toBe("GBP");
    });

    it("should create a savings account with zero balance", () => {
        const acc = createAccount("savings", "555-3333333-58", "Alice", 2.5, "USD");

        expect(acc.balance).toBe(0);
        expect(acc.interestRate).toBe(2.5);
        expect(acc.currency).toBe("USD");
    });
});

describe("deposit function", () => {
    it("should increase the account balance correctly", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck", undefined, "EUR");
        const updated = deposit(acc, 500);

        expect(updated.balance).toBe(acc.balance + 500);
        expect(acc.balance).toBe(10);
    });

    it("should throw DomainError for zero or negative deposit", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck", undefined, "EUR");
        expect(() => deposit(acc, 0)).toThrow(DomainError);
        expect(() => deposit(acc, -50)).toThrow(DomainError);
    });
});

describe("withdraw function", () => {
    it("should decrease the account balance for valid withdrawals", () => {
        let acc = createAccount("normal", "555-1111111-58", "Mr Big Buck", undefined, "EUR");
        acc = deposit(acc, 100);
        const updated = withdraw(acc, 50);

        expect(updated.balance).toBe(60);
        expect(acc.balance).toBe(110);
    });

    it("should enforce normal account overdraft limit", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        const updated = withdraw(acc, 510);
        expect(updated.balance).toBe(-500);

        expect(() => withdraw(acc, 520)).toThrow(DomainError);
    });

    it("should prevent savings account from going negative", () => {
        const acc = createAccount("savings", "555-3333333-58", "Alice");
        expect(() => withdraw(acc, 1)).toThrow(DomainError);
    });

    it("should throw DomainError for zero or negative withdrawal amount", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck");
        expect(() => withdraw(acc, 0)).toThrow(DomainError);
        expect(() => withdraw(acc, -10)).toThrow(DomainError);
    });
});

describe("transfer function", () => {
    it("should transfer money between two normal accounts", () => {
        let from = createAccount("normal", "555-1111111-58", "Mr Big Buck", undefined, "EUR");
        let to = createAccount("normal", "555-3333333-10", "Ms Small Pocket", undefined, "EUR");

        from = deposit(from, 100);
        const result = transfer(from, to, 50);

        expect(result.from.balance).toBe(60);
        expect(result.to.balance).toBe(60);
    });

    it("should transfer from normal to savings account", () => {
        let from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        let to = createAccount("savings", "555-3333333-10", "Ms Small Pocket");

        from = deposit(from, 100);
        const result = transfer(from, to, 50);

        expect(result.from.balance).toBe(60);
        expect(result.to.balance).toBe(50);
    });

    it("should prevent overdraft during transfer", () => {
        const from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        const to = createAccount("normal", "555-3333333-10", "Ms Small Pocket");
        expect(() => transfer(from, to, 520)).toThrow(DomainError);
    });

    it("should prevent negative savings balance during transfer", () => {
        const from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        const to = createAccount("savings", "555-3333333-10", "Ms Small Pocket");
        expect(() => transfer(to, from, 1)).toThrow(DomainError);
    });

    it("should throw DomainError for zero or negative transfer amount", () => {
        const from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        const to = createAccount("normal", "555-3333333-10", "Ms Small Pocket");

        expect(() => transfer(from, to, 0)).toThrow(DomainError);
        expect(() => transfer(from, to, -50)).toThrow(DomainError);
    });
});

