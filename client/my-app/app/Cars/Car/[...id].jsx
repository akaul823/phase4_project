import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Car() {
  const router = useRouter();
  const { id } = router.query; // Get the id parameter from the URL

  const [car, setCar] = useState(null);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:5555/cars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCar(data);
        } else {
          console.error("Error fetching car details");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    }

    if (id) {
      console.log(id)
      fetchCarDetails();
    }
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Car Details
        </h2>

        <div className="mt-6">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
            <img
              src={`http://127.0.0.1:5555/static${car.pictures}/1.jpeg`}
              alt={car.car_make + car.car_model}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900">
              {car.car_make} {car.car_model}
            </h3>
            <p className="mt-2 text-gray-700">
              Listed Price: {car.listed_price} $
            </p>
            {/* Display other car details */}
          </div>
        </div>
      </div>
    </div>
  );
}
