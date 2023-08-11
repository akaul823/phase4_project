"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../../UserContext";
import { useRouter } from "next/navigation";

export default function CarDetail({ params: { id } }) {
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:5555/cars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCar(data);
          console.log(data);
          console.log(data.seller_id, loggedInUser.id, "adsasdasd");
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

  function handleData(e) {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
      buyer_id: loggedInUser.id,
      car_id: id,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/transactions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert(`You have successfully purchased a car from the marketplace!`);
          router.push("/MyCars");
          res.json();
        } else {
          alert("This price does not match the listed price");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    e.target.reset();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img
            src={car.pictures}
            alt={`${car.car_make} ${car.car_model}`}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-4">
          {car.car_make} {car.car_model}
        </h1>
        {/* <p className="text-gray-600 mb-2">Marketplace ID: {car.id}</p> */}
        <p className="text-gray-600 mb-2">
          Status: {car.status[0].toUpperCase() + car.status.slice(1)}
        </p>
        <p className="text-gray-600 mb-2">Listed Price: ${car.listed_price}</p>
        {/* <p className="text-gray-600 mb-4">Description: {car.description}</p> */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <p>Doors: {car.spec[0].doors}</p>
          <p>Energy: {car.spec[0].energy}</p>
          <p>Engine: {car.spec[0].engine}</p>
          <p>History: {car.spec[0].history}</p>
          <p>HP: {car.spec[0].hp}</p>
          <p>Mileage: {car.spec[0].milage}</p>
          <p>MPG: {car.spec[0].mpg}</p>
          <p>Seats: {car.spec[0].seats}</p>
          <p>Transmission: {car.spec[0].transmission}</p>
          <p>VIN Number: {car.spec[0].vin_num}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
          <p>Full Name: {car.seller.fullname}</p>
          <p>Email: {car.seller.email}</p>
          <p>Phone: {car.seller.phone}</p>
          <p>Address: {car.seller.address}</p>
        </div>
        {car.seller_id !== loggedInUser.id ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium mb-6">Buy Car</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Purchase Price
                  </label>
                  <input
                    type="text"
                    name="price_paid"
                    id="card-number"
                    placeholder="Enter price"
                    // value={car.listed_price}
                    onChange={handleData}
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  // href="/MyCars"
                  type="submit"
                  className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
                >
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
