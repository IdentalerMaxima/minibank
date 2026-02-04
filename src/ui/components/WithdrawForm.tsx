import { useState, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import './WithdrawForm.css';

type WithdrawFormProps = {
    dispatch: Dispatch<Action>;
};

export function WithdrawForm({ dispatch }: WithdrawFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch({
            type: "WITHDRAW",
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

            <button type="submit">Withdraw</button>
        </form>
    );
}

