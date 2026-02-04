import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { TransferForm } from "../components/TransferForm";
import type { Account } from "../../domain/Account";

type TransferPageProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
    stateError?: string;
}

export function TransferPage({ dispatch, accounts, stateError }: TransferPageProps) {
    return (
        <div>
            <h2> Transfer Page </h2>
            <TransferForm
                accounts={accounts}
                dispatch={dispatch}
                stateError={stateError}
            >
            </TransferForm>
        </div>
    );
}
