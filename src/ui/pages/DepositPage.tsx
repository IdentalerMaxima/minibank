import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { DepositForm } from "../components/DepositForm";

type DepositPageProps = {
    stateError?: string;
    dispatch: Dispatch<Action>;
}

export function DepositPage({ stateError, dispatch }: DepositPageProps) {
    return (
        <div>
            <h2> Deposit Page </h2>
            <DepositForm
                stateError={stateError}
                dispatch={dispatch}
            >
            </DepositForm>
        </div>
    );
}
