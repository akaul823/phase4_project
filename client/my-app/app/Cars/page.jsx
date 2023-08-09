/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState, useEffect } from "react";
import CarLink from "./car";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function Example() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("http://127.0.0.1:5555/cars", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          console.log(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCars();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Car List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cars.map((car) => (
            <div key={car.id} className="group relative">
              <CarLink car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
