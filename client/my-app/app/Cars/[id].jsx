import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CarLink from "./CarLink"; // Import your CarLink component

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [car, setCar] = useState(null);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:5555/cars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCar(data);
          console.log(data);
        } else {
          console.error("Error fetching car details");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    }

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{car.car_make + " " + car.car_model}</h1>
      {/* Render other car details here */}
    </div>
  );
}
