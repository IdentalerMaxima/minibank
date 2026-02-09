import { useState, useEffect, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import type { Account } from "../../domain/Account";
import './TransferForm.css';

type TransferFormProps = {
    stateError?: string;
    dispatch: Dispatch<Action>;
    accounts: Account[];
};

export function TransferForm({ stateError, dispatch}: TransferFormProps) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [lastTransfer, setLastTransfer] = useState<{ from: string; to: string; amount: number } | null>(null);

    useEffect(() => {
        if (stateError) setSuccess("");
    }, [stateError]);

    useEffect(() => {
        if (!stateError && lastTransfer) {
            setSuccess(`Transferred ${lastTransfer.amount} from ${lastTransfer.from} to ${lastTransfer.to} successfully!`);
            setFrom("");
            setTo("");
            setAmount("");
            setLastTransfer(null);
        }
    }, [stateError, lastTransfer]);

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setSuccess("");
        setLastTransfer(null);

        if (from === to) {
            setError("Cannot transfer to the same account");
            return;
        }

        dispatch({
            type: "TRANSFER",
            payload: { from, to, amount: Number(amount) },
        });

        setLastTransfer({ from, to, amount: Number(amount) });
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
                    pattern="\d{3}-\d{7}-\d{2}"
                    title="Account number must be in format XXX-XXXXXXX-XX"
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

            <button type="submit">Transfer</button>

            {stateError && <div className="form-error">{stateError}</div>}
            {success && <div className="form-success">{success}</div>}
        </form>
    );
}

