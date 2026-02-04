import { useState, type Dispatch } from "react"
import type { Action } from "../../app/actions"

type WithdrawFormProps = {
    dispatch: Dispatch<Action>;
}   
 
export function WithdrawForm({ dispatch }: WithdrawFormProps) {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");

    function handleSumbit(e: React.SyntheticEvent) {
        e.preventDefault();

        dispatch({
            type: "WITHDRAW",
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

            <button type="submit">Withdraw</button>

        </form>
    );
}
