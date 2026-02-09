import type { Account, NormalAccount, SavingsAccount, Currency } from "./Account";

export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DomainError";
    }
}

const NORMAL_ACCOUNT_OVERDRAFT_LIMIT = -500;
const WELCOME_BONUS: Record<Currency, number> = {
    EUR: 10,
    GBP: 8,
};

export function createAccount(
    type: "normal" | "savings",
    accountNumber: string,
    ownerName: string,
    interestRate?: number,
    currency: Currency = "EUR",
): Account { 
    if (type === "normal") {
        const account: NormalAccount = { 
            type: "normal",
            accountNumber,
            ownerName,
            balance: WELCOME_BONUS[currency] ?? 0,
            currency,
        };
        return account;
    } else {
        const account: SavingsAccount = { 
            type: "savings",
            accountNumber,
            ownerName,
            balance: 0, //No bonus for savings
            interestRate: interestRate || 0,
            currency,
        };
        return account;
    }
}

export function deposit(account: Account, amount: number): Account {
    if (amount <= 0) throw new DomainError("Deposit amount must be positive");
    return { ...account, balance: account.balance + amount };
}

export function withdraw(account: Account, amount: number): Account {
    if (amount <= 0) throw new DomainError("Withdraw amount must be positive");
    
    if (account.type === "normal" && account.balance - amount < NORMAL_ACCOUNT_OVERDRAFT_LIMIT) {
        throw new DomainError("Normal account overdraft exceeded");
    }
    
    if (account.type === "savings" && account.balance - amount < 0) {
        throw new DomainError("Savings account overdraft exceeded");
    }

    return { ...account, balance: account.balance - amount };
}

export function transfer(
    from: Account,
    to: Account,
    amount: number,
): { from: Account, to: Account } {
    const updatedFrom = withdraw(from, amount);
    const updatedTo = deposit(to, amount);
    return { from: updatedFrom, to: updatedTo };
}

