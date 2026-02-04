import { useState, useEffect, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import './WithdrawForm.css';

type WithdrawFormProps = {
    dispatch: Dispatch<Action>;
    stateError?: string; 
};

export function WithdrawForm({ dispatch, stateError }: WithdrawFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [lastWithdrawal, setLastWithdrawal] = useState<{ account: string; amount: number } | null>(null);

    useEffect(() => {
        if (stateError) {
            setSuccess("");
        }
    }, [stateError]);

    useEffect(() => {
        if (!stateError && lastWithdrawal) {
            setSuccess(`Withdrew ${lastWithdrawal.amount} successfully from ${lastWithdrawal.account}`);
            setAccountNumber("");
            setAmount("");
            setLastWithdrawal(null);
        }
    }, [stateError, lastWithdrawal]);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const numericAmount = Number(amount);

        try {
            dispatch({
                type: "WITHDRAW",
                payload: {
                    accountNumber,
                    amount: numericAmount,
                },
            });

            setLastWithdrawal({ account: accountNumber, amount: numericAmount });
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="accountNumber">Your Account Number:</label>
                <input
                    id="accountNumber"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                    pattern="\d{3}-\d{7}-\d{2}"
                    title="Account number must be in format XXX-XXXXXXX-XX"
                />
            </div>

            <div className="form-field">
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min={0}
                    step="any" 
                />
            </div>

            <button type="submit">Withdraw</button>

            {error && <div className="form-error">{error}</div>}
            {stateError && <div className="form-error">{stateError}</div>}
            {success && <div className="form-success">{success}</div>}
        </form>
    );
}

