import { useState, type Dispatch } from "react"
import type { Action } from "../../app/actions"

type DepositFormProps = {
    dispatch: Dispatch<Action>;
}   
 
export function DepositForm({ dispatch }: DepositFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    function handleSumbit(e: React.SyntheticEvent) {
        e.preventDefault();

        dispatch({
            type: "DEPOSIT",
            payload: {
                accountNumber,
                amount: Number(amount),
            },
        });
    }
    
    return (
        <form onSubmit={handleSumbit}>

            <div>
                <label>
                Your Account Number:
                    <input 
                        type="text"
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                        required
                    >
                    </input>
                </label>
            </div>

            <div>
                <label>
                Amount:
                    <input 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    >
                    </input>
                </label>
            </div>

            <button type="submit">Deposit</button>

        </form>
    );
}
