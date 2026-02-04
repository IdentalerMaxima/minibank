import { useState, useEffect, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import './CreateAccountForm.css';

type CreateAccountFormProps = {
    dispatch: Dispatch<Action>;
    stateError?: string; 
};

export function CreateAccountForm({ stateError, dispatch }: CreateAccountFormProps) {
    const [ownerName, setOwnerName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState<"normal" | "savings">("normal");
    const [success, setSuccess] = useState("");
    const [lastAccount, setLastAccount] = useState("");

    useEffect(() => {
        if (stateError) {
            setSuccess("");
        }
    }, [stateError]);

    useEffect(() => {
        if (!stateError && lastAccount) {
            setSuccess(`Account ${lastAccount} created successfully!`);
            setOwnerName("");
            setAccountNumber("");
            setAccountType("normal");
            setLastAccount("");
        }
    }, [stateError, lastAccount]);

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

        setLastAccount(accountNumber);
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

            <button type="submit">Create Account!</button>

            {stateError 
                ? <div className="form-error">{stateError}</div>
                : success 
                    ? <div className="form-success">{success}</div>
                    : null
            }
        </form>
    );
}

