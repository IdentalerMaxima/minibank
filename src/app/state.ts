import type { Account } from "../domain/Account.ts";

export type AppState = {
    accounts: Account[];
    error?: string;
}
