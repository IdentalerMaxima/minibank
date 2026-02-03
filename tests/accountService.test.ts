import { describe, expect, it} from "vitest";
import { createAccount, deposit, DomainError } from "../src/domain/accountService.ts";

describe("create account", () => {
    it("should create a normal acc with a welcome bonus", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck");

        expect(acc.accountNumber).toBe("555-1111111-58"); 
        expect(acc.ownerName).toBe("Mr. Big Buck");             
        expect(acc.type).toBe("normal");                
        expect(acc.balance).toBe(10);                  
    });
});

describe("deposit function", () => {
    it("should increase the account balance for a normal deposit", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck");
        const updated = deposit(acc, 500);

        expect(updated.balance).toBe(acc.balance + 500);
        expect(acc.balance).toBe(10);
    });

    it("should throw DomainError for zero or negative deposit", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck");

        expect(() => deposit(acc, 0)).toThrow(DomainError);
        expect(() => deposit(acc, -50)).toThrow(DomainError);
    });
});


