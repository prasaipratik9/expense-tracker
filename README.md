<div align="center">

# 💰 Expense Tracker

A sleek **React-based expense tracking app** to manage your personal finances with **real-time analytics, filters, and responsive design**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

</div>

---

## 🚀 Features

- 💸 **Add Transactions** – Record income & Expense with date, amount, category, and optional notes  
- 🗑️ **Delete Transactions** – Remove individual transactions with one click  
- 🎯 **Filter by Category** – View transactions by spending type  
- 📅 **Filter by Month** – Analyze spending patterns over time  
- 📊 **Financial Summary** – Real-time totals for **income**, **Expense**, and **net balance**  
- 💾 **Data Persistence** – Stored locally using **localStorage API**  
- 📱 **Responsive Design** – Works seamlessly across devices  
- ✅ **Input Validation** – Prevents negative amounts & caps transactions at `$999,999.99`

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|----------|
| ⚛️ **React** | UI library with hooks (`useState`, `useEffect`) |
| ⚡ **Vite** | Fast dev server & bundler |
| 🎨 **Tailwind CSS v4** | Utility-first styling |
| 💽 **localStorage API** | Persistent client data |
| 🔧 **Git & GitHub** | Version control & collaboration |

---

## 🪄 Getting Started

### 📋 Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### ⚙️ Installation

# 1️⃣ Clone the repository
git clone https://github.com/prasaipratik9/expense-tracker

# 2️⃣ Move into the project directory
cd expense-tracker

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
Open http://localhost:5173 in your browser

#### 🧭 Usage

# 1️⃣ Add a Transaction
- Fill in: Date, Amount, Category, and (optional) Note
- Click "Add" to save

# 2️⃣ Filter Transactions
- Select Category or Month to filter
- Click "Reset Filters" to clear filters and show all

# 3️⃣ View Summary
- Total Income
- Total Expense
- Net Balance → Blue if positive, Red if negative

4️⃣ Delete a Transaction
- Click the red "Delete" button beside a transaction

##### 🧠 What I Learned

🧩 React State Management  → Handling multiple & derived states
🔄 Array Methods           → map(), filter(), reduce()
⚙️ useEffect Hook          → Synchronizing state with localStorage
🧾 Controlled Forms        → Managing and validating user inputs
💡 Conditional Rendering   → Showing different UI states dynamically
🎨 Tailwind Styling        → Conditional classNames with template literals
🧭 Git Workflow            → Semantic commits and version control

###### 🌟 Future Improvements

[ ] ✏️ Edit existing transactions  
[ ] 📤 Export data to CSV  
[ ] 📊 Add charts (pie/line visualizations)  
[ ] 💰 Add budget settings and alerts  
[ ] 💱 Multi-currency support  
[ ] 🌙 Dark mode toggle  
[ ] ☁️ Backend integration (MongoDB)


<div align="center">
📜 License

🪪 This project is open source and available under the MIT License.
