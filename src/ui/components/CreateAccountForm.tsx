import { useState, useEffect, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import type { AppState } from "../../app/state";
import './CreateAccountForm.css';

type CreateAccountFormProps = {
    state: AppState;
    dispatch: Dispatch<Action>;
};

export function CreateAccountForm({ state, dispatch }: CreateAccountFormProps) {
    const [ownerName, setOwnerName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState<"normal" | "savings">("normal");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (state.error) {
            setSuccess("");
        }
    }, [state.error]);

    useEffect(() => {
        if (!state.error && accountNumber) {
            setSuccess(`Account ${accountNumber} created successfully!`);
            setOwnerName("");
            setAccountNumber("");
            setAccountType("normal");
        }
    }, [state.error]);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess("");

        dispatch({
            type: "CREATE_ACCOUNT",
            payload: {
                kind: accountType,
                accountNumber,
                ownerName,
            },
        });
    };

    const accPattern = "\\d{3}-\\d{7}-\\d{2}";

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="ownerName">Owner Name:</label>
                <input
                    id="ownerName"
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                    id="accountNumber"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                    pattern={accPattern}
                    title="Account number must be in format XXX-XXXXXXX-XX"
                />
            </div>

            <div className="form-field">
                <label htmlFor="accountType">Account Type:</label>
                <select
                    id="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as "normal" | "savings")}
                >
                    <option value="normal">Normal</option>
                    <option value="savings">Savings</option>
                </select>
            </div>

            {state.error && <div className="form-error">{state.error}</div>}

            {success && <div className="form-success">{success}</div>}

            <button type="submit">Create Account!</button>
        </form>
    );
}

