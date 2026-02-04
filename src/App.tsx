import { useReducer, useState } from "react";
import { NavBar } from "./ui/components/NavBar";
import { CreateAccountPage } from "./ui/pages/CreateAccountPage";
import { appReducer } from "./app/reducer";
import type { AppState } from "./app/state";
import { DepositPage } from "./ui/pages/DepositPage";

const initialState: AppState = { accounts: [] };

export function App() {
    const [currentPage, setCurrentPage] = useState<"list" | "create" | "deposit" | "withdraw" | "transfer">("list");

    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <div>
            <h1>MiniBank</h1>
            <NavBar setPage={setCurrentPage} />

            {currentPage === "create" && <CreateAccountPage dispatch={dispatch} />}
            {currentPage === "deposit" && <DepositPage dispatch={dispatch} />}
        </div>
    );
}

export default App;

