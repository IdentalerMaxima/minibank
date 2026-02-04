import { CreateAccountForm } from "../components/CreateAccountForm";
import type { Action } from "../../app/actions";
import type { Dispatch } from "react";
import type { AppState } from "../../app/state";

type CreateAccountPageProps = {
    state: AppState;
    dispatch: Dispatch<Action>;
};

export function CreateAccountPage({ state, dispatch }: CreateAccountPageProps) {
    return (
        <div>
            <h2>Create Account</h2>
            <CreateAccountForm
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
}

