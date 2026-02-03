type NavBarProps = { 
    setPage: (page: string) => void;
}

export function NavBar({ setPage }: NavBarProps) {
    return (
        <nav>
            <button onClick={() => setPage("create")}>Create Account</button>
            <button onClick={() => setPage("list")}>List Accounts</button>
            <button onClick={() => setPage("deposit")}>Deposit</button>
            <button onClick={() => setPage("withdraw")}>Withdraw</button>
            <button onClick={() => setPage("transfer")}>Transfer</button>
        </nav>
    );
}
