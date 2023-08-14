"use client";
import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext, useEffect } from "react";
import NotLoggedIn from "../notloggedin/page";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5555/transactions", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      {Object.keys(loggedInUser).length > 0 ? (
        <div>
          {transactions.map((transaction) => (
            <div key={transaction.id} className="group relative">
              <div className="mt-4 flex justify-between">
                <div>
                  <p>Transaction Amount</p>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {"$" + transaction.price_paid}
                  </h3>
                </div>
                <div>
                  <p>Time of Sale</p>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {transaction.date}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Transaction;
