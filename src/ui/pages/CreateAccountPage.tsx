import { CreateAccountForm } from "../components/CreateAccountForm";
import type { Action } from "../../app/actions";
import type { Dispatch } from "react";

type CreateAccountPageProps = {
    stateError?: string;
    dispatch: Dispatch<Action>;
};

export function CreateAccountPage({ stateError, dispatch }: CreateAccountPageProps) {
    return (
        <div>
            <h2>Create Account</h2>
            <CreateAccountForm
                stateError={stateError}
                dispatch={dispatch}
            />
        </div>
    );
}

