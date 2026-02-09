import type { Account } from "../../domain/Account";
import './ListAllPage.css';

type ListAllPageProps = {
    accounts: Account[];
};

export function ListAllPage({ accounts }: ListAllPageProps) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Owner</th>
                        <th>Type</th>
                        <th>Balance</th>
                        <th>Interest Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.accountNumber}>
                            <td>{account.accountNumber}</td>
                            <td>{account.ownerName}</td>
                            <td>{account.type}</td>
                            <td>{account.balance} {account.currency}</td>
                            <td>{account.type === "savings" ? account.interestRate : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

