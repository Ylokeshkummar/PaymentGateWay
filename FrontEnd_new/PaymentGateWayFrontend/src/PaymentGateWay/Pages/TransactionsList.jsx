import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Fetch all transactions on component mount (when user clicks Transactions)
  useEffect(() => {
    const fetchAll = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch("http://localhost:8081/Payments/fetchTransactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( user.userId ),
      });
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : data.transactions);
    };
    fetchAll();
  }, []);

  // ✅ Fetch filtered transactions only when user clicks Filter
const handleFilter = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const url = `http://localhost:8081/Payments/fetchTransactionsfilter?id=${user.userId}&start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user.userId),
  });

  const data = await res.json();
  setTransactions(Array.isArray(data) ? data : data.transactions);
};


  return (
    <div className="transactions">
      <h2>Transactions</h2>

      {/* Filter bar */}
      <div className="filter-bar">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      {/* Transactions list */}
      {transactions?.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((transaction) => (
          <Link
            key={transaction.transactionId}
            to={`${transaction.transactionId}`}
            className="transaction-link"
          >
            <h3>Transaction #{transaction.transactionId}</h3>
            <p>Amount: {transaction.transactionAmount}</p>
            <p>Date: {new Date(transaction.transactionDate).toLocaleString()}</p>
            <p>By: {transaction.transactionbyName}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default TransactionsList;
