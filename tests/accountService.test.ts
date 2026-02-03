import { describe, expect, it} from "vitest";
import { createAccount, deposit, DomainError, withdraw, transfer } from "../src/domain/accountService.ts";

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


describe("withdraw function", () => {
    it("should decrease the account balance for a valid withdrawal", () => {
        let acc = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        acc = deposit(acc, 100); 
        const updated = withdraw(acc, 50);

        expect(updated.balance).toBe(60);
        expect(acc.balance).toBe(110); 
    });

    it("should allow normal account to overdraft up to -500", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        const updated = withdraw(acc, 510); 

        expect(updated.balance).toBe(-500);
    });

    it("should throw DomainError if normal account overdraft exceeds -500", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        expect(() => withdraw(acc, 520)).toThrow(DomainError);
    });

    it("should throw DomainError if savings account goes negative", () => {
        const acc = createAccount("savings", "555-1111111-58", "Mr Big Buck");
        expect(() => withdraw(acc, 1)).toThrow(DomainError);
    });

    it("should throw DomainError for zero or negative withdrawal amount", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr Big Buck");
        expect(() => withdraw(acc, 0)).toThrow(DomainError);
        expect(() => withdraw(acc, -10)).toThrow(DomainError);
    });
});

describe("transfer function", () => {
  it("should transfer money between two normal accounts", () => {
    let from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
    let to = createAccount("normal", "555-3333333-10", "Ms Small Pocket");

    from = deposit(from, 100); 
    const result = transfer(from, to, 50);

    expect(result.from.balance).toBe(60); 
    expect(result.to.balance).toBe(60);  

    expect(from.balance).toBe(110);
    expect(to.balance).toBe(10);
  });

  it("should transfer money from normal to savings account", () => {
    let from = createAccount("normal", "555-1111111-58", "Mr Big Buck");
    let to = createAccount("savings", "555-3333333-10", "Ms Small Pocket");

    from = deposit(from, 100); 
    const result = transfer(from, to, 50);

    expect(result.from.balance).toBe(60); 
    expect(result.to.balance).toBe(50);   
  });

  it("should throw DomainError if transfer exceeds normal account overdraft", () => {
    const from = createAccount("normal", "555-1111111-58", "Mr Big Buck"); 
    const to = createAccount("normal", "555-3333333-10", "Ms Small Pocket");     

    
    expect(() => transfer(from, to, 520)).toThrow(DomainError);
  });

  it("should throw DomainError if transfer would make savings account negative", () => {
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
