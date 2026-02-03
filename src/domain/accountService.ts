import type { Account, NormalAccount, SavingsAccount } from "./Account";

export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainError";
    }
}

export function createAccount(
    type: "normal" | "savings",
    accountNumber: string,
    ownerName: string,
    interestRate?: number
): Account { 
    if (type === "normal") {
        const account: NormalAccount = { 
            type: "normal",
            accountNumber,
            ownerName,
            balance: 10, //this is the welcome bonus, could be moved to common const to change later more easily
        };
        return account;
    } else {
        const account: SavingsAccount = { 
            type: "savings",
            accountNumber,
            ownerName,
            balance: 0, //no signing bonus for savings acc
            interestRate: interestRate || 0,
        };
        return account;
    }
}

export function deposit(account: Account, amount: number): Account {
    if (amount <= 0) throw new DomainError("Deposit amount must be positive");
    return { ...account, balance: account.balance + amount };
}
