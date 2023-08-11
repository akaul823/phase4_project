"use client"
import React from "react";
import { useState, useEffect } from "react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

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
    <div class="w-full max-w-lg mx-auto p-8">
      <div>
      {transactions.map((transaction) => (
            <div key={transaction.id} className="group relative">
              <div className="mt-4 flex justify-between">
                <div>
                 <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {transaction.listed_price}
                  </h3>
              </div>
                 <p className="text-sm font-medium text-gray-900">
                  {transaction.date}
                  </p>
             </div>
            </div>
          ))}
      </div>
      {/* <div class="bg-white rounded-lg shadow-lg p-6"> */}
        {/* <h2 class="text-lg font-medium mb-6">Payment Information</h2>
        <form>
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
              <label
                for="card-number"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                name="card-number"
                id="card-number"
                placeholder="0000 0000 0000 0000"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="expiration-date"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Expiration Date
              </label>
              <input
                type="text"
                name="expiration-date"
                id="expiration-date"
                placeholder="MM / YY"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="cvv"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="000"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="card-holder"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Card Holder
              </label>
              <input
                type="text"
                name="card-holder"
                id="card-holder"
                placeholder="Full Name"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div class="mt-8">
            <button
              type="submit"
              class="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Transaction;
