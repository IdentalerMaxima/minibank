import { createAccount, DomainError } from "../domain/accountService";
import type { Action } from "./actions";
import type { AppState } from "./state";

export function appReducer(state: AppState, action: Action): AppState {
    try {
        switch(action.type) { 
            case "CREATE_ACCOUNT": {
                const account = createAccount(
                    action.payload.kind,
                    action.payload.accountNumber,
                    action.payload.ownerName
                );

                return {
                    ...state,
                    accounts: [...state.accounts, account],
                };
            }

            case "DEPOSIT": {
                return state;
            }

            case "WITHDRAW": {
                return state;
            }

            case "TRANSFER": {
                return state;
            }

            default: 
                return state;
        }
    } catch (e) {
        if (e instanceof DomainError) {
            return state;
        }
        throw e;
    }
}
