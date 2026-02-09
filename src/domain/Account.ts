export type Currency = "EUR" | "GBP" | string;

export type NormalAccount = {
    type: "normal";
    accountNumber: string;
    ownerName: string;
    balance: number; 
    currency: Currency;
}

export type SavingsAccount = {
    type: "savings";
    accountNumber: string;
    ownerName: string;
    balance: number;
    interestRate: number;
    currency: Currency;
}   

export type Account = NormalAccount | SavingsAccount;
