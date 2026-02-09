# MiniBank – React + TypeScript SPA

## Project Overview

MiniBank is a simple Single Page Application (SPA) built with **React and TypeScript** that simulates basic banking operations. The focus is on **code quality, architecture, and domain correctness** rather than visual design. Users can create accounts, deposit, withdraw, transfer money, and list all accounts within a browser session.

---

## Installation

Clone the repository and enter the folder:

```bash
git clone git@github.com:IdentalerMaxima/minibank.git
cd minibank
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite (e.g., `http://localhost:5173`) in your browser.

---

## High-Level Architecture

The application is divided into three layers:

1. **Domain Layer**

   * Core business logic for accounts
   * Account types: `NormalAccount` and `SavingsAccount`
   * Operations: `createAccount`, `deposit`, `withdraw`, `transfer`
   * Domain rules: overdraft, interest rates, welcome bonuses
   * Currency support added; cross-currency transfers **not yet implemented**
   * Errors thrown via `DomainError`

2. **App Layer**

   * Coordinates Domain and UI
   * State management with `useReducer` (`AppState`)
   * Actions: `CREATE_ACCOUNT`, `DEPOSIT`, `WITHDRAW`, `TRANSFER`, `CLEAR_ERROR`
   * `CLEAR_ERROR` is triggered by `NavBar` when switching pages

3. **UI Layer**

   * React functional components for pages and forms
   * Pages: `CreateAccountPage`, `DepositPage`, `WithdrawPage`, `TransferPage`, `ListAllPage`
   * Components encapsulate forms and validation logic
   * `NavBar` handles page navigation and error clearing

---

## Folder Structure

```
.
├── src
│   ├── app
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   └── state.ts
│   ├── domain
│   │   ├── Account.ts
│   │   └── accountService.ts
│   ├── ui
│   │   ├── components
│   │   │   ├── CreateAccountForm.tsx
│   │   │   ├── DepositForm.tsx
│   │   │   ├── WithdrawForm.tsx
│   │   │   ├── TransferForm.tsx
│   │   │   └── NavBar.tsx
│   │   └── pages
│   │       ├── CreateAccountPage.tsx
│   │       ├── DepositPage.tsx
│   │       ├── WithdrawPage.tsx
│   │       ├── TransferPage.tsx
│   │       └── ListAllPage.tsx
├── tests
│   ├── unit
│   │   └── accountService.test.ts
│   └── integration
│       └── integrationTest.test.ts
```

---

## Domain Model and Business Rules

```ts
export type NormalAccount = {
  type: "normal";
  accountNumber: string;
  ownerName: string;
  balance: number;
  currency: string;
};

export type SavingsAccount = {
  type: "savings";
  accountNumber: string;
  ownerName: string;
  balance: number;
  interestRate: number;
  currency: string;
};

export type Account = NormalAccount | SavingsAccount;
```

**Behaviors:**

* Normal Account: welcome bonus 10, overdraft allowed up to -500
* Savings Account: no welcome bonus, no negative balance, optional interest rate

**Operations:**

* `createAccount(type, accountNumber, ownerName, interestRate?)`
* `deposit(account, amount)`
* `withdraw(account, amount)`
* `transfer(from, to, amount)` (same currency only)

---

## Application State

```ts
export type AppState = {
  accounts: Account[];
  error?: string;
};
```

**Actions:**

```ts
type Action =
  | { type: "CREATE_ACCOUNT"; payload: { kind: "normal" | "savings"; accountNumber: string; ownerName: string; currency: string; interestRate?: number } }
  | { type: "DEPOSIT"; payload: { accountNumber: string; amount: number } }
  | { type: "WITHDRAW"; payload: { accountNumber: string; amount: number } }
  | { type: "TRANSFER"; payload: { from: string; to: string; amount: number } }
  | { type: "CLEAR_ERROR" };
```

`appReducer` enforces domain rules and updates `state.error` on invalid operations.

---

## Testing

**Unit Tests** (`tests/unit/accountService.test.ts`)

* Account creation, deposits, withdrawals
* Edge cases: overdraft limits, negative deposits/withdrawals, duplicate accounts

**Integration Tests** (`tests/integration/integrationTest.test.ts`)

* Full workflow scenario across multiple accounts
* Handles deposits, transfers between normal and savings accounts
* Validates overdraft and savings balance rules
* `CLEAR_ERROR` behavior tested via NavBar

**Run tests:**

```bash
npm run test
```

---

### Notes

* Currency support added, but cross-currency transfers are not yet implemented
* NavBar triggers `CLEAR_ERROR` on page change
* Focus is on correctness, maintainability, and clean architecture
* Minimal visual styling; semantic HTML and CSS

