"use client";

import { useState, useEffect, useContext } from "react";
// import CarLink from "./cars/CarLink";
import CarLink from "./CarLink";
import { UserContext } from "../UserContext";

export default function Example() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5555/cars", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          console.log(data);
          // setCars(data.filter((car) => car.seller_id !== loggedInUser.id));
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const filteredResults = cars.filter((car) =>
  //     (car.car_make + " " + car.car_model)
  //       .toLowerCase()
  //       .includes(search.toLowerCase())
  //   );
  //   setFilteredCars(filteredResults);
  // }, [search]);

  const filteredResults = cars.filter((car) =>
    (car.car_make + " " + car.car_model)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // setFilteredCars(filteredResults);
  console.log(filteredResults);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex items-center bg-white rounded-full shadow-sm">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 w-64 text-gray-700 outline-none rounded-r-full"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Car List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredResults
            ? filteredResults.map((car) => (
                <div key={car.id} className="group relative">
                  <CarLink car={car} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
