import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { WithdrawForm } from "../components/WithdrawForm";

type WithdrawPageProps = {
    stateError?: string;
    dispatch: Dispatch<Action>;
}

export function WithdrawPage({ stateError, dispatch }: WithdrawPageProps) {
    return (
        <div>
            <h2> Withdraw Page </h2>
            <WithdrawForm
                stateError={stateError}
                dispatch={dispatch}
            >
            </WithdrawForm>
        </div>
    );
}
