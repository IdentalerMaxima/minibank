import { useState, type Dispatch } from "react"
import type { Action } from "../../app/actions"
import type { Account } from "../../domain/Account";

type TransferFormProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
}   
 
export function TransferForm({ dispatch, accounts }: TransferFormProps) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    function handleSumbit(e: React.SyntheticEvent) {
        e.preventDefault();

        dispatch({
            type: "TRANSFER",
            payload: {
                from,
                to,
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
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                        required
                    >
                    </input>
                </label>
            </div>

            <div>
                <label>
                Target Account Number:
                    <input 
                        type="text"
                        value={to}
                        onChange={e => setTo(e.target.value)}
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

            <button type="submit">Transfer</button>

        </form>
    );
}
