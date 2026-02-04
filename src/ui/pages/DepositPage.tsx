import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { DepositForm } from "../components/DepositForm";

type DepositPageProps = {
    dispatch: Dispatch<Action>;
}

export function DepositPage({ dispatch }: DepositPageProps) {
    return (
        <div>
            <h2> Deposit Page </h2>
            <DepositForm
                dispatch={dispatch}
            >
            </DepositForm>
        </div>
    );
}
