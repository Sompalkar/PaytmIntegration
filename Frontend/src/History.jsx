import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      setTransactionHistory(response.data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <div className="     w-full m-auto  p-10 ">
      <h2 className="text-3xl font-bold mb-4">Transaction History</h2>

      {transactionHistory.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <div className=" flex  flex-row  w-full  flex-wrap justify-evenly gap-10 m-auto ">
          {transactionHistory.map((transaction) => (
            <div
              key={transaction._id}
              className={`bg-white  w-[400px] flex gap-3 flex-col  p-4 rounded-md shadow-indigo-800 ${
                transaction.status === "SUCCESS"
                  ? "border-green-500 shadow-lg"
                  : transaction.status === "INITIATED"
                  ? "border-orange-500 shadow"
                  : "border-red-500 shadow-md"
              }`}
            >
              <div className="flex  items-center justify-between border-b border-black">
                <p
                  className={`mb-2 ${
                    transaction.status === "SUCCESS"
                      ? "text-green-500"
                      : transaction.status === "INITIATED"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  UserName:- <span className=" text-black text-lg font-bold  "> {transaction.name} </span>
                </p>
                <p
                  className={`text-gray-600 mb-2 ${
                    transaction.status === "SUCCESS"
                      ? "text-green-500"
                      : transaction.status === "INITIATED"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {transaction.status}
                </p>
              </div>
              <p className="text-gray-600 mb-2">
                Amount: Rs. {transaction.amount}
              </p>
              <p className="text-gray-600 mb-2">
                Order ID: {transaction.orderId}
              </p>

              <p className="text-sm text-gray-500">
                Transaction Time : {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
