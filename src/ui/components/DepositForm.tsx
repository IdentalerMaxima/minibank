import { useState, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import './DepositForm.css';

type DepositFormProps = {
    dispatch: Dispatch<Action>;
};

export function DepositForm({ dispatch }: DepositFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch({
            type: "DEPOSIT",
            payload: {
                accountNumber,
                amount: Number(amount),
            },
        });
        setAccountNumber("");
        setAmount("");
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
                />
            </div>

            <button type="submit">Deposit</button>
        </form>
    );
}

