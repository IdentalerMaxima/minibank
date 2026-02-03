import { useState, type Dispatch } from "react";
import type { Action } from "../../app/actions"

type CreateAccountFormProps = {
    dispatch: Dispatch<Action>;
    onError?: (message: string) => void;
    onSuccess?: () => void;
}
    
export function CreateAccountForm({ dispatch, onError, onSuccess }: CreateAccountFormProps) {
    const [ownerName, setOwnerName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState<"normal" | "savings">("normal");

    const handleSubmit = ( e: React.SyntheticEvent<HTMLFormElement> ) => {
        e.preventDefault();
        
        try {
            dispatch({
                type: "CREATE_ACCOUNT",
                payload: {
                    kind: accountType,
                    accountNumber,
                    ownerName,
                },
            });
            
            if (onSuccess) onSuccess();
            setOwnerName("");
            setAccountNumber("");
            setAccountType("normal");
        } catch (err: any) {
            if (onError) onError(err.message)
        }
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Owner Name: {" "}
                    <input 
                        type="text"
                        value={ownerName} 
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Account Number: {" "}
                    <input 
                        type="text"
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Account Type: {" "}
                    <select value={accountType} onChange={(e) => setAccountType(e.target.value as any)}>
                        <option value="normal">Normal</option>
                        <option value="savings">Savings</option>
                    </select>
                </label>
            </div>
            
            <button type="submit">
                Create Account!
            </button>
        </form>
    );
}
