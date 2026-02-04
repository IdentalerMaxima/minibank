import { useState, useEffect, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import './DepositForm.css';

type DepositFormProps = {
    dispatch: Dispatch<Action>;
    stateError?: string; 
};

export function DepositForm({ dispatch, stateError }: DepositFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [lastDeposit, setLastDeposit] = useState<{ account: string; amount: number } | null>(null);

    useEffect(() => {
        if (stateError) {
            setSuccess("");
        }
    }, [stateError]);

    useEffect(() => {
        if (!stateError && lastDeposit) {
            setSuccess(`Deposited ${lastDeposit.amount} successfully into ${lastDeposit.account}`);
            setAccountNumber("");
            setAmount("");
            setLastDeposit(null);
        }
    }, [stateError, lastDeposit]);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Amount must be a positive number");
            return;
        }123

        try {
            dispatch({
                type: "DEPOSIT",
                payload: {
                    accountNumber,
                    amount: numericAmount,
                },
            });

            setLastDeposit({ account: accountNumber, amount: numericAmount });

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
                    step="any"
                />
            </div>

            <button type="submit">Deposit</button>

            {error && <div className="form-error">{error}</div>}
            {stateError && <div className="form-error">{stateError}</div>}
            {success && <div className="form-success">{success}</div>}

        </form>
    );
}

