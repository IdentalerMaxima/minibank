import { useReducer } from "react";
import { appReducer } from "./app/reducer";
import type { AppState } from "./app/state";
import './App.css';

const initialState: AppState = {
  accounts: []
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <>
      <h1>MiniBank</h1>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: "CREATE_ACCOUNT",
              payload: { kind: "normal", accountNumber: "555-1111111-58", ownerName: "Mr Big Bucket" }
            })
          }
        >
          Create Normal Account
        </button>
      </div>

      <h2>Accounts</h2>
      <ul>
        {state.accounts.map(acc => (
          <li key={acc.accountNumber}>
            {acc.ownerName} ({acc.type}) - Balance: {acc.balance} EUR
          </li>
        ))}
      </ul>
    </>
  );
}


export default App
