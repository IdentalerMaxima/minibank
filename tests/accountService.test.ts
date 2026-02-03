import { describe, expect, it} from "vitest";
import { createAccount } from "../src/domain/accountService.ts";

describe("Account service", () => {
    it("should create a normal acc with a welcome bonus", () => {
        const acc = createAccount("normal", "555-1111111-58", "Mr. Big Buck");

        expect(acc.accountNumber).toBe("555-1111111-58"); 
        expect(acc.ownerName).toBe("Mr. Big Buck");             
        expect(acc.type).toBe("normal");                
        expect(acc.balance).toBe(10);                  
    });
});


