# MiniBank SPA

## Project Overview

MiniBank is a Single Page Application (SPA) built with **React** and **TypeScript**.  
It allows users to manage bank accounts entirely in-browser, performing operations like creating accounts, deposits, withdrawals, transfers, and listing all accounts.  
The focus is on **clean architecture, TypeScript type safety, and correct business logic**, rather than visual design.

---

## Installation & Running

Clone the repository and install dependencies:

```bash
git clone git@github.com:IdentalerMaxima/minibank.git
cd minibank
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display a URL in the console (usually `http://localhost:5173`) where you can open the app in your browser.

---

## High-Level Architecture

The application is organized into three main layers:

- **Domain Layer**  
  Handles business logic, account models, and operations (`createAccount`, `deposit`, `withdraw`, `transfer`).  
  Errors are handled via the `DomainError` class.

- **App Layer**  
  Coordinates between Domain and UI.  
  State is managed using `useReducer` with `AppState`.  
  Actions (`CREATE_ACCOUNT`, `DEPOSIT`, `WITHDRAW`, `TRANSFER`) update accounts and propagate errors.

- **UI Layer**  
  React function components for pages and forms.  
  Pages dispatch actions to the App Layer and render success/error messages.  
  CSS is semantic and maintainable, with one file per component.

---

## Folder Structure

```
.
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── app
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   └── state.ts
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── domain
│   │   ├── accountService.ts
│   │   └── Account.ts
│   ├── index.css
│   ├── main.tsx
│   └── ui
│       ├── components
│       │   ├── CreateAccountForm.css
│       │   ├── CreateAccountForm.tsx
│       │   ├── DepositForm.css
│       │   ├── DepositForm.tsx
│       │   ├── NavBar.tsx
│       │   ├── TransferForm.css
│       │   ├── TransferForm.tsx
│       │   ├── WithdrawForm.css
│       │   └── WithdrawForm.tsx
│       └── pages
│           ├── CreateAccountPage.tsx
│           ├── DepositPage.tsx
│           ├── ListAllPage.css
│           ├── ListAllPage.tsx
│           ├── TransferPage.tsx
│           └── WithdrawPage.tsx
├── tests
│   └── accountService.test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Domain Model & Business Rules

### Account Types

- **Normal Account**
  - Fields: `accountNumber`, `ownerName`, `balance`
  - Overdraft allowed up to `-500`
  - Starts with a **welcome bonus** of `10`

- **Savings Account**
  - Fields: `accountNumber`, `ownerName`, `balance`, `interestRate`
  - No overdraft allowed
  - No welcome bonus

### Operations

- `createAccount(kind, accountNumber, ownerName, interestRate?)`
- `deposit(account, amount)`
- `withdraw(account, amount)`
- `transfer(from, to, amount)`

Errors are thrown via `DomainError` for invalid operations, such as:

- Depositing or withdrawing negative amounts
- Exceeding overdraft limits
- Transferring to non-existent accounts or same account

---

## Assumptions & Constraints

- In-memory storage only; no persistence
- Account numbers must follow `XXX-XXXXXXX-XX` format
- SPA focused; no server-side rendering
- Minimal styling, emphasis on logic and functionality

---

## Edge Cases Handled

- Overdraft rules for normal accounts
- Savings accounts cannot go negative
- Cannot transfer to the same account
- Cannot deposit/withdraw/transfer zero or negative amounts
- Duplicate account numbers prevented

