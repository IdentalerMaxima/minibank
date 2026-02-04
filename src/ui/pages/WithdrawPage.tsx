import type { Dispatch } from "react"
import type { Action } from "../../app/actions"
import { WithdrawForm } from "../components/WithdrawForm";

type WithdrawPageProps = {
    dispatch: Dispatch<Action>;
}

export function WithdrawPage({ dispatch }: WithdrawPageProps) {
    return (
        <div>
            <h1> Withdraw Page </h1>
            <WithdrawForm
                dispatch={dispatch}
            >
            </WithdrawForm>
        </div>
    );
}
