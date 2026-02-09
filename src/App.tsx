import { useReducer, useState } from "react";
import { NavBar } from "./ui/components/NavBar";
import { CreateAccountPage } from "./ui/pages/CreateAccountPage";
import { DepositPage } from "./ui/pages/DepositPage";
import { WithdrawPage } from "./ui/pages/WithdrawPage";
import { TransferPage } from "./ui/pages/TransferPage";
import { ListAllPage } from "./ui/pages/ListAllPage";
import { appReducer } from "./app/reducer";
import type { AppState } from "./app/state";
import './App.css';

const initialState: AppState = { accounts: [] };

export function App() {
    const [currentPage, setCurrentPage] = useState<"list" | "create" | "deposit" | "withdraw" | "transfer">("create");
    const [state, dispatch] = useReducer(appReducer, initialState);

    const clearError = () => {
        dispatch({ type: "CLEAR_ERROR" });
    };

    return (
        <div>
            <h1>MiniBank</h1>
            <NavBar setPage={setCurrentPage} clearError={clearError} />

            {currentPage === "create" && <CreateAccountPage stateError={state.error} dispatch={dispatch} />}
            {currentPage === "deposit" && <DepositPage stateError={state.error} dispatch={dispatch} />}
            {currentPage === "list" && <ListAllPage accounts={state.accounts} />}
            {currentPage === "withdraw" && <WithdrawPage stateError={state.error} dispatch={dispatch} />}
            {currentPage === "transfer" && <TransferPage stateError={state.error} dispatch={dispatch} accounts={state.accounts} />}
        </div>
    );
}

export default App;
