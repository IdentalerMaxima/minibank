import { describe, it, expect } from "vitest";
import { appReducer } from "../../src/app/reducer";
import type { AppState } from "../../src/app/state";
import type { Action } from "../../src/app/actions";

describe("full account workflow", () => {
  let state: AppState = { accounts: [] };

  it("should handle the full scenario correctly", () => {
    const actions: Action[] = [
      //1. Create a normal account for Mr. Big Buck with EUR currency
      { type: "CREATE_ACCOUNT", payload: { kind: "normal", accountNumber: "555-1111111-58", ownerName: "Mr. Big Buck", currency: "EUR" } },

      //2. Deposit 500 EUR into Mr. Big Buck's normal account
      { type: "DEPOSIT", payload: { accountNumber: "555-1111111-58", amount: 500 } },

      //3. Create a savings account for Mr. Big Buck
      { type: "CREATE_ACCOUNT", payload: { kind: "savings", accountNumber: "666-2222222-31", ownerName: "Mr. Big Buck", interestRate: 1.5, currency: "EUR" } },

      //4. Transfer 250 EUR from normal account to savings account for Mr. Big Buck
      { type: "TRANSFER", payload: { from: "555-1111111-58", to: "666-2222222-31", amount: 250 } },

      //5. Create a normal account for Ms. Small Pocket
      { type: "CREATE_ACCOUNT", payload: { kind: "normal", accountNumber: "555-3333333-10", ownerName: "Ms. Small Pocket", currency: "EUR" } },

      //6. Create a savings account for Ms. Small Pocket
      { type: "CREATE_ACCOUNT", payload: { kind: "savings", accountNumber: "666-4444444-80", ownerName: "Ms. Small Pocket", interestRate: 1.5, currency: "EUR" } },

      //7. Transfer 50 EUR from Ms. Small Pocket's normal account to her savings account
      { type: "TRANSFER", payload: { from: "555-3333333-10", to: "666-4444444-80", amount: 50 } },
    ];

    // Execute all actions sequentially
    actions.forEach(action => {
      state = appReducer(state, action);
    });

    const acc1 = state.accounts.find(a => a.accountNumber === "555-1111111-58")!; // Mr. Big Buck normal
    const acc2 = state.accounts.find(a => a.accountNumber === "666-2222222-31")!; // Mr. Big Buck savings
    const acc3 = state.accounts.find(a => a.accountNumber === "555-3333333-10")!; // Ms. Small Pocket normal
    const acc4 = state.accounts.find(a => a.accountNumber === "666-4444444-80")!; // Ms. Small Pocket savings

    // Verify balances after all valid actions
    expect(acc1.balance).toBe(260); // 10 welcome + 500 deposit - 250 transfer
    expect(acc2.balance).toBe(250); // received 250 transfer
    expect(acc3.balance).toBe(-40);  // 10 welcome - 50 transfer (overdraft allowed for normal)
    expect(acc4.balance).toBe(50);  // received 50 transfer

    //8. Attempting an invalid transfer from savings to normal that exceeds balance
    const invalidTransfer: Action = { type: "TRANSFER", payload: { from: "666-4444444-80", to: "555-3333333-10", amount: 250 } };

    // Use error property instead of toThrow
    const newState = appReducer(state, invalidTransfer);
    expect(newState.error).toBe("Savings account overdraft exceeded");
  });
});

