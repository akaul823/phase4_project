"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function ProfilePage() {
  // const [user, setUser] = useState({});
  // const [userId, setUserId] = useState(0);
  const { loggedInUser } = useContext(UserContext);
  console.log("ProfilePage.loggedInUser", loggedInUser);
  const user = loggedInUser;

  // useEffect(() => {
  //   async function fetchAndSetUserId() {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5555/session", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const user = await response.json();
  //         if (user) {
  //           console.log(user.id);
  //           // setUserId(user.id);
  //           setUserId(user.id);
  //           // console.log(carData);
  //         } else {
  //           console.error("No user data found");
  //         }
  //       } else {
  //         console.error("Error fetching data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //     console.log("Fetch and state update complete.");
  //   }
  //   fetchAndSetUserId();
  //   async function getUser() {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
  //         credentials: "include",
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setUser(data);
  //       } else {
  //         console.error("Error fetching data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   getUser();
  // }, [userId]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loggedInUser !== {} ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="px-4 sm:px-0 text-center">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Profile Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.fullname}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.address}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
}
