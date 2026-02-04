import { useState, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import type { Account } from "../../domain/Account";
import './TransferForm.css';

type TransferFormProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
};

export function TransferForm({ dispatch, accounts }: TransferFormProps) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch({
            type: "TRANSFER",
            payload: {
                from,
                to,
                amount: Number(amount),
            },
        });

        setFrom("");
        setTo("");
        setAmount("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="from">Your Account Number:</label>
                <input
                    id="from"
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="to">Target Account Number:</label>
                <input
                    id="to"
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
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

            <button type="submit">Transfer</button>
        </form>
    );
}

