import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State-variable-to-store-all-arrays (Update: Updated useState initialization to load data from localStorage on Mount)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // State object to hold form input values
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    note: "",
  });

  const [filters, setFilters] = useState({
    category: "All",
    month: "All",
  });

  //Saving to local storage using useEffect
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Function to handle submit events
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.amount || !form.date || !form.category) return;
    const newTransactions = { id: Date.now(), ...form };
    setTransactions((prev) => [newTransactions, ...prev]);
    setForm({ date: "", amount: "", category: "", note: "" });
  }

  //Function for handling deletion of items
  function handleDelete(id) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  //Adding the filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesCategory =
      filters.category === "All" || tx.category === filters.category;

    const txMonth = tx.date.slice(0, 7);
    const matchesMonth = filters.month === "All" || txMonth === filters.month;

    return matchesCategory && matchesMonth;
  });

  //Adding logic for Cashflow summary

  //#1 Using reduce to narrow down income from the filteredTransactions array
  const totalIncome = filteredTransactions.reduce((sum, tx) => {
    if (tx.category === "Income") {
      return sum + parseFloat(tx.amount);
    }
    return sum;
  }, 0);

  //#2 Using reduce to narrow down expenses from the filteredTransactions array
  const totalExpense = filteredTransactions.reduce((sum, tx) => {
    if (tx.category !== "Income") {
      return sum + parseFloat(tx.amount);
    }
    return sum;
  }, 0);

  //#3 Using subtraction operator to differentiate income vs expenses
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600">Expense Tracker</h1>

      {/* Add transaction */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 max-w-sm bg-white p-4 rounded-2xl shadow mx-auto"
        >
          {/* Date */}
          <label className="flex flex-col">
            <span className="font-medium">Date</span>
            <input
              type="date"
              value={form.date}
              required
              className="border rounded px-2 py-1"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>

          {/* Amount */}
          <label className="flex flex-col">
            <span className="font-medium">Amount</span>
            <input
              type="number"
              min="0.01"
              max="999999.99"
              step="0.01"
              value={form.amount}
              required
              placeholder="e.g. 42.50"
              className="border rounded px-2 py-1"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || parseFloat(value) >= 0) {
                  setForm({ ...form, amount: value });
                }
              }}
            />
          </label>

          {/* Category */}
          <label className="flex flex-col">
            <span className="font-medium">Category</span>
            <select
              required
              className="border rounded px-2 py-1"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Income">Income</option>
              <option value="Transport">Transport</option>
              <option value="Fitness & Health">Fitness & Health</option>
              <option value="Eating out">Eating Out</option>
              <option value="Fun">Fun</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
          </label>

          {/* Note */}
          <label className="flex flex-col">
            <span className="font-medium">Note</span>
            <input
              type="text"
              value={form.note}
              placeholder="Optional.."
              className="border rounded px-1 py-1"
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>
      </section>

      {/* Filters section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex gap-4 flex-wrap">
          {/* Start of filter dropdown */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">Category</span>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="border rounded px-3 py-2 bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Income">Income</option>
              <option value="Transport">Transport</option>
              <option value="Fitness & Health">Fitness & Health</option>
              <option value="Eating out">Eating Out</option>
              <option value="Fun">Fun</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
          </label>

          {/* Start of month dropdown */}
          <label className="flex flex-col">
            <span className="font-medium mb-1">Month</span>
            <input
              type="month"
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: e.target.value })
              }
              className="border rounded px-3 py-2 bg-white"
            />
          </label>

          {/* Reset button for filters */}
          <button
            onClick={() => setFilters({ category: "All", month: "All" })}
            className="self-end bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Reset Filters
          </button>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Income */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm text-green-700 font-medium">Total Income</p>
            <p
              className="text-2xl font-bold text-green-600"
              aria-label={"Total income: $${totalIncome.toFixed(2)}"}
            >
              {totalIncome.toFixed(2)}
            </p>
          </div>

          {/* Total Expenses */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-sm text-red-700 font-medium">Total Expenses</p>
            <p
              className="text-2xl font-bold text-red-600"
              aria-label={"Total expense: $${totalExpense.toFixed(2)}"}
            >
              {totalExpense.toFixed(2)}
            </p>
          </div>

          {/* Net Balance : Have used a ternary operator to switch up the colors between red and blue depending on the net balance outcome*/}
          <div
            className={`${
              netBalance >= 0
                ? "bg-blue-50 border border-blue-200"
                : "bg-red-50 border-red-200"
            } p-4 rounded-lg`}
            aria-label={"Total netBalance: $${netBalance.toFixed(2)}"}
          >
            <p
              className={`text-sm font-medium ${
                netBalance >= 0 ? "text-blue-700" : "text-red-700"
              }`}
              aria-label={"Total netBalance: $${netBalance.toFixed(2)}"}
            >
              Net Balance
            </p>
            <p
              className={`text-2xl font-bold ${
                netBalance >= 0 ? "text-blue-600" : "text-red-600"
              }`}
              aria-label={"Total netBalance: $${netBalance.toFixed(2)}"}
            >
              {netBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 italic">
            No transactions match your filter.
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredTransactions.map((tx) => (
              <li
                key={tx.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{tx.category} </p>
                  <p className="text-sm text-gray-600">
                    {" "}
                    {tx.note || "No Note"}{" "}
                  </p>
                  <p className="text-xm text-gray-400">{tx.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-lg">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
