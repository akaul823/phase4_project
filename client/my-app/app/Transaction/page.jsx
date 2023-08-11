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
  // const [formData, setFormData] = useState({});

  // function handleData(e) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: parseInt(e.target.value),
  //     buyer_id: loggedInUser.id,
  //   });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   fetch("http://127.0.0.1:5555/transactions", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   alert(`You have successfully purchased a car from the marketplace!`);
  //   e.target.reset();
  // }
  // return (
  //   <div class="w-full max-w-lg mx-auto p-8">
  //     {Object.keys(loggedInUser).length > 0 ? (
  //       <div>
  //       {transactions.map((transaction) => (
  //             <div key={transaction.id} className="group relative">
  //               <div className="mt-4 flex justify-between">
  //                 <div>
  //                 Transaction Amount
  //                 <h3 className="text-sm text-gray-700">
  //                   <span aria-hidden="true" className="absolute inset-0" />
  //                   {"$"+transaction.price_paid}
  //                   </h3>
  //               </div>
  //               <div>
  //                 Time of Sale
  //                 <h3 className="text-sm text-gray-700">
  //                   <span aria-hidden="true" className="absolute inset-0" />
  //                   {transaction.date}
  //                   </h3>
  //               </div>
  //                 {/* <p className="text-sm font-medium text-gray-900">
  //                   {transaction.date}
  //                   </p> */}
  //             </div>
  //             </div>
  //           ))}
  //       </div>
  //       <div class="bg-white rounded-lg shadow-lg p-6">
  //         <h2 class="text-lg font-medium mb-6">Buy Car</h2>
  //         <form onSubmit={handleSubmit}>
  //           <div class="grid grid-cols-2 gap-6">
  //             <div class="col-span-2 sm:col-span-1">
  //               <label
  //                 for="card-number"
  //                 class="block text-sm font-medium text-gray-700 mb-2"
  //               >
  //                 Agreed Upon Purchase Price
  //               </label>
  //               <input
  //                 type="text"
  //                 name="price_paid"
  //                 id="card-number"
  //                 placeholder="Enter price"
  //                 onChange={handleData}
  //                 class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
  //               />
  //             </div>
  //             <div class="col-span-2 sm:col-span-1">
  //               <label
  //                 for="expiration-date"
  //                 class="block text-sm font-medium text-gray-700 mb-2"
  //               >
  //                 Car ID
  //               </label>
  //               <input
  //                 type="text"
  //                 name="car_id"
  //                 id="expiration-date"
  //                 placeholder="Enter the car ID"
  //                 onChange={handleData}
  //                 class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
  //               />
  //             </div>
  //             <div class="col-span-2 sm:col-span-1">
  //               <label
  //                 for="cvv"
  //                 class="block text-sm font-medium text-gray-700 mb-2"
  //               >
  //                 User ID
  //               </label>
  //               <input
  //                 type="text"
  //                 name="buyer_id"
  //                 id="cvv"
  //                 placeholder="Enter your user ID"
  //                 onChange={handleData}
  //                 class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
  //               />
  //             </div>
  //             {/* <div class="col-span-2 sm:col-span-1">
  //               <label
  //                 for="card-holder"
  //                 class="block text-sm font-medium text-gray-700 mb-2"
  //               >
  //                 Card Holder
  //               </label>
  //               <input
  //                 type="text"
  //                 name="card-holder"
  //                 id="card-holder"
  //                 placeholder="Full Name"
  //                 onChange={handleData}
  //                 class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
  //               />
  //             </div> */}
  //           </div>
  //           <div class="mt-8">
  //             <button
  //               type="submit"
  //               class="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         </form>
  //       </div> ) : (
  //       <NotLoggedIn />
  //     )}
  //   </div>
  // );
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
