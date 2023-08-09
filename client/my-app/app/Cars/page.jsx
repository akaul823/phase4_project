// import { useState, useEffect } from "react";
// import Car from "./Car/page";
// import Link from "next/link";

// export default function Cars({search}) {
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     async function fetchCars() {
//       try {
//         const response = await fetch("http://127.0.0.1:5555/cars");
//         if (response.ok) {
//           const data = await response.json();
//           setCars(data);
//           console.log(data);
//         } else {
//           console.error("Error fetching data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchCars();
//   }, []);

//   useEffect(() => {
//     const filteredResults = cars.filter(car =>
//       (car.car_make + " " + car.car_model).toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCars(filteredResults);
//   }, [search, cars]);

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//           Car List
//         </h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//         {filteredCars.map((car) => (<Link key={car.id} href={`/car/${car.id}`} passHref>
//           <a className="group relative">
//         {/* Render car thumbnail and name */}
//         </a>
//     </Link>
//   ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Car from "./Car/page";

export default function Cars({ search }) {
  const [filteredCars, setFilteredCars] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("http://127.0.0.1:5555/cars");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCars();
  }, []);

  useEffect(() => {
    const filteredResults = cars.filter(
      (car) =>
        (car.car_make + " " + car.car_model).toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCars(filteredResults);
  }, [search, cars]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Car List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredCars.map((car) => (
            <Link key={car.id} href={`/cars/${car.id}`} passHref>
              <Car car={car} />
            </Link>
          ))}
      </div>


    </div>
    </div>
  );
}

