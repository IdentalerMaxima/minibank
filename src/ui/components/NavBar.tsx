type NavBarProps = { 
    setPage: (page:
        "list" | "create" | "deposit" | "withdraw" | "transfer"
    ) => void;
    clearError: () => void;
}

export function NavBar({ setPage, clearError }: NavBarProps) {
    const handleClick = (page: "list" | "create" | "deposit" | "withdraw" | "transfer") => {
        clearError();
        setPage(page);
    };

    return (
        <nav>
            <button onClick={() => handleClick("create")}>Create Account</button>
            <button onClick={() => handleClick("list")}>List Accounts</button>
            <button onClick={() => handleClick("transfer")}>Transfer</button>
            <button onClick={() => handleClick("withdraw")}>Withdraw</button>
            <button onClick={() => handleClick("deposit")}>Deposit</button>
        </nav>
    );
}

