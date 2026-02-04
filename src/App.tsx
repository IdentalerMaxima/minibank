import { useReducer, useState } from "react";
import { NavBar } from "./ui/components/NavBar";
import { CreateAccountPage } from "./ui/pages/CreateAccountPage";
import { appReducer } from "./app/reducer";
import type { AppState } from "./app/state";
import { DepositPage } from "./ui/pages/DepositPage";
import { ListAllPage } from "./ui/pages/ListAllPage";
import { WithdrawPage } from "./ui/pages/WithdrawPage";
import { TransferPage } from "./ui/pages/TransferPage";
import './App.css';

const initialState: AppState = { accounts: [] };

export function App() {
    const [currentPage, setCurrentPage] = useState<"list" | "create" | "deposit" | "withdraw" | "transfer">("create");

    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <div>
            <h1>MiniBank</h1>
            <NavBar setPage={setCurrentPage} />

            {currentPage === "create" && <CreateAccountPage stateError={state.error} dispatch={dispatch} />}
            {currentPage === "deposit" && <DepositPage stateError={state.error} dispatch={dispatch} />}
            {currentPage === "list" && <ListAllPage accounts={state.accounts} />}
            {currentPage === "withdraw" && <WithdrawPage dispatch={dispatch} />}
            {currentPage === "transfer" && <TransferPage dispatch={dispatch} accounts={state.accounts} />}
        </div>
    );
}

export default App;

