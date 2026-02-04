import { useState, type Dispatch } from "react";
import type { Action } from "../../app/actions";
import type { Account } from "../../domain/Account";
import './CreateAccountForm.css';

type CreateAccountFormProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
};

export function CreateAccountForm({ accounts, dispatch }: CreateAccountFormProps) {
    const [ownerName, setOwnerName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState<"normal" | "savings">("normal");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const accRegex = /^\d{3}-\d{7}-\d{2}$/;
        if (!accRegex.test(accountNumber)) {
            setError("Invalid account number format, valid format example: 555-1111111-58");
            return;
        }

        const exists = accounts.some(acc => acc.accountNumber === accountNumber);
        if (exists) {
            setError(`Account number ${accountNumber} already exists`);
            return;
        }

        try {
            dispatch({
                type: "CREATE_ACCOUNT",
                payload: {
                    kind: accountType,
                    accountNumber,
                    ownerName,
                },
            });

            setOwnerName("");
            setAccountNumber("");
            setAccountType("normal");
            setSuccess(`Account ${accountNumber} created successfully!`);

        } catch (err: any) {
            setError(err.message);
        }
    };

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

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <button type="submit">Create Account!</button>
        </form>
    );
}

