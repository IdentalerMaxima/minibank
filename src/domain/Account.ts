export type NormalAccount = {
    type: "normal";
    accountNumber: string;
    ownerName: string;
    balance: number;
}

export type SavingsAccount = {
    type: "savings";
    accountNumber: string;
    ownerName: string;
    balance: number;
    interestRate: number;
}   

export type Account = NormalAccount | SavingsAccount;
