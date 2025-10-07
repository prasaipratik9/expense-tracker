import { useState } from "react";
import "./App.css";

function App() {
  // State-variable-to-store-all-arrays
  const [transactions, setTransactions] = useState([]);

  // State object to hold form input values
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    note: "",
  });

  // Function to handle submit events
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.amount || !form.date || !form.category) return;
    const newTransactions = { id: Date.now(), ...form };
    setTransactions((prev) => [newTransactions, ...prev]);
    setForm({ date: "", amount: "", category: "", note: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600">Expense Tracker</h1>

      {/* Add transaction */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm bg-white p-4 rounded-2xl shadow mx-auto">
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
              step="0.02"
              value={form.amount}
              required
              placeholder="e.g. 42.50"
              className="border rounded px-2 py-1"
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
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
            className="bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
          >
            Add
          </button>
        </form>
      </section>

      {/* Transactions */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
    {
        transactions.length === 0  ? (
        <p className="text-gray-500 italic">No transactions yet.</p>
        ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li key={tx.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{tx.category} </p>
                  <p className="text-sm text-gray-600">{tx.note || "No Note"} </p>
                  <p className="text-xm text-gray-400">{tx.date} </p>
                </div>

                <div>
                  <p className="font-bold">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </p>
                </div>
            </li>
          ))}
          
        </ul>
        ) }
      </section>
    </div>
  );
}

export default App;
