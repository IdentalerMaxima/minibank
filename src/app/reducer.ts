import {
    createAccount,
    deposit,
    withdraw,
    transfer,
    DomainError,
} from "../domain/accountService";
import type { Action } from "./actions";
import type { AppState } from "./state";
import type { Account } from "../domain/Account";

function replaceAccount(accounts: Account[], updated: Account): Account[] {
    return accounts.map(acc =>
        acc.accountNumber === updated.accountNumber ? updated : acc
    );
}

export function appReducer(state: AppState, action: Action): AppState {
    try {
        switch (action.type) {
            case "CREATE_ACCOUNT": {
                const exists = state.accounts.some(
                    acc => acc.accountNumber === action.payload.accountNumber
                );

                if (exists) throw new DomainError("Account number already exists");

                const account = createAccount(
                    action.payload.kind,
                    action.payload.accountNumber,
                    action.payload.ownerName,
                    action.payload.kind === "savings" ? action.payload.interestRate : undefined,
                    action.payload.currency
                );

                return {
                    ...state,
                    accounts: [...state.accounts, account],
                    error: undefined,
                };
            }

            case "DEPOSIT": {
                const account = state.accounts.find(
                    acc => acc.accountNumber === action.payload.accountNumber
                );

                if (!account) throw new DomainError("Account not found");

                const updated = deposit(account, action.payload.amount);

                return {
                    ...state,
                    accounts: replaceAccount(state.accounts, updated),
                    error: undefined,
                };
            }

            case "WITHDRAW": {
                const account = state.accounts.find(
                    acc => acc.accountNumber === action.payload.accountNumber
                );

                if (!account) throw new DomainError("Account not found");

                const updated = withdraw(account, action.payload.amount);

                return {
                    ...state,
                    accounts: replaceAccount(state.accounts, updated),
                    error: undefined,
                };
            }

            case "TRANSFER": {
                const from = state.accounts.find(
                    acc => acc.accountNumber === action.payload.from
                );
                const to = state.accounts.find(
                    acc => acc.accountNumber === action.payload.to
                );

                if (!from || !to) throw new DomainError("Account not found");

                if (from.currency !== to.currency) {
                    throw new DomainError("Cross-currency transfers not supported yet");
                }

                const { from: updatedFrom, to: updatedTo } = transfer(
                    from,
                    to,
                    action.payload.amount
                );

                return {
                    ...state,
                    accounts: state.accounts.map(acc => {
                        if (acc.accountNumber === updatedFrom.accountNumber) return updatedFrom;
                        if (acc.accountNumber === updatedTo.accountNumber) return updatedTo;
                        return acc;
                    }),
                    error: undefined,
                };
            }

            case "CLEAR_ERROR":
                return { ...state, error: undefined };

            default:
                return state;
        }
    } catch (e) {
        if (e instanceof DomainError) {
            return { ...state, error: e.message };
        }
        throw e;
    }
}

