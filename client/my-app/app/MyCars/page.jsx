"use client";
import React from "react";
import { UserContext } from "../UserContext";
import { useState, useContext, useEffect } from "react";
import CarLink from "../Cars/CarLink";
import { useRouter } from "next/navigation";
import NotLoggedIn from "../notloggedin/page";

const MyCars = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [myCars, setMyCars] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:5555/users/${loggedInUser.id}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMyCars(data.cars);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [loggedInUser]);

  return (
    <div>
      {" "}
      {Object.keys(loggedInUser).length > 0 ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              My Car List
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {myCars.map((car) => (
                <div key={car.id} className="group relative">
                  <CarLink car={car} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default MyCars;
