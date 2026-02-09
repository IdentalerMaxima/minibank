import type { Dispatch } from "react";
import type { Action } from "../../app/actions";
import { TransferForm } from "../components/TransferForm";
import type { Account } from "../../domain/Account";

type TransferPageProps = {
    stateError?: string;
    dispatch: Dispatch<Action>;
    accounts: Account[];
}

export function TransferPage({ stateError, dispatch, accounts }: TransferPageProps) {
    return (
        <div>
            <h2>Transfer Page</h2>
            <TransferForm
                stateError={stateError}
                dispatch={dispatch}
                accounts={accounts}
            />
        </div>
    );
}

