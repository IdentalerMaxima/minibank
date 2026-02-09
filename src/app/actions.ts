export type Action =
| {
    type: "CREATE_ACCOUNT";
    payload: {
        kind: "normal" | "savings";
        accountNumber: string;
        ownerName: string;
        interestRate?: number;
        currency?: string;
    };
}
| {
    type: "DEPOSIT";
    payload: {
        accountNumber: string;
        amount: number;
    };
}
| {
    type: "WITHDRAW";
    payload: {
        accountNumber: string;
        amount: number;
    };
}
| {
    type: "TRANSFER";
    payload: {
        from: string;
        to: string;
        amount: number;
    };
}
| { type: "CLEAR_ERROR" };


