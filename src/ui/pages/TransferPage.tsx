import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { TransferForm } from "../components/TransferForm";
import type { Account } from "../../domain/Account";

type TransferPageProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
}

export function TransferPage({ dispatch, accounts }: TransferPageProps) {
    return (
        <div>
            <h2> Transfer Page </h2>
            <TransferForm
                accounts={accounts}
                dispatch={dispatch}
            >
            </TransferForm>
        </div>
    );
}
