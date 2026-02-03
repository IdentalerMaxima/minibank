import { useState } from "react";
import { NavBar } from "./ui/components/NavBar";

export function App() {
  const [currentPage, setCurrentPage] = useState<
    "list" | "create" | "deposit" | "withdraw" | "transfer"
  >("list");

  return (
    <div>
      <h1>MiniBank</h1>
      <NavBar setPage={setCurrentPage} />
      <p>Current page: {currentPage}</p>
    </div>
  );
}

export default App;

