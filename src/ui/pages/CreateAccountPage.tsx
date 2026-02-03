import { CreateAccountForm } from "../components/CreateAccountForm";
import type { Action } from "../../app/actions";
import type { Dispatch } from "react";

type CreateAccountPageProps = {
    dispatch: Dispatch<Action>;
};

export function CreateAccountPage({ dispatch }: CreateAccountPageProps) {
    return (
        <div>
            <h2>Create Account</h2>
            <CreateAccountForm
                dispatch={dispatch}
                onError={(msg) => alert(msg)}
                onSuccess={() => alert("Account created!")}
            />
        </div>
    );
}

