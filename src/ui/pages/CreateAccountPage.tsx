import { CreateAccountForm } from "../components/CreateAccountForm";
import type { Action } from "../../app/actions";
import type { Dispatch } from "react";
import type { Account } from "../../domain/Account";

type CreateAccountPageProps = {
    accounts: Account[];
    dispatch: Dispatch<Action>;
};

export function CreateAccountPage({ accounts, dispatch }: CreateAccountPageProps) {
    return (
        <div>
            <h2>Create Account</h2>
            <CreateAccountForm
                accounts={accounts}
                dispatch={dispatch}
            />
        </div>
    );
}

