import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const TransactionDetails = () => {
  const transaction = useLoaderData(); // directly use the object

  if (!transaction) {
    return <p>Transaction details not found.</p>;
  }

  return (
    <div className="transaction-details">
      <h2>Transaction #{transaction.transactionId}</h2>
      <p><strong>Amount:</strong> {transaction.transactionAmount}</p>
      <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}</p>
      <p><strong>Type:</strong> {transaction.transactionType}</p>
      <p><strong>Description:</strong> {transaction.transactionDescription}</p>
      <p><strong>Status:</strong> {transaction.transactionStatus}</p>
      <p><strong>By:</strong> {transaction.transactionbyName}</p>
      <p><strong>Phone:</strong> {transaction.transactionbyPhone}</p>
      <p><strong>Email:</strong> {transaction.transactionbyEmail}</p>
      <p><strong>Address:</strong> {transaction.transactionbyAddress}</p>
      <p><strong>UTR:</strong> {transaction.UTR}</p>

      <Link to="/PaymentGateWay/Transaction" className="back-link">← Back to Transactions</Link>
    </div>
  );
};

export default TransactionDetails;

// Loader for fetching single transaction details
export const TransactionDetailsLoader = async ({ params }) => {
  const res = await fetch("http://16.16.185.214:8081/Payments/GetTransDeatails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( params.transactionId ),
  });

 if (!res.ok) {
    throw new Error("Failed to fetch transaction details");
  }

  return res.json(); // returns the transaction object
};
