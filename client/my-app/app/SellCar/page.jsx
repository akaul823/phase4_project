"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
export default function SellCar() {
  const [carData, setCarData] = useState({});
  const [specData, setSpecData] = useState({});
  const [userId, setUserId] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  //   const router = useRouter();

  function handleSpecData(e) {
    if ("milage, hp, doors, seats, vin_num, mpg".includes(e.target.name)) {
      setSpecData({
        ...specData,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setSpecData({
        ...specData,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(specData)
  }

  function handleCarData(e) {
    if ("listed_price".includes(e.target.name)) {
      setCarData({
        ...carData,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setCarData({
        ...carData,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(carData)
  }

  function updateSellerID(id) {
    setSpecData({
      ...specData,
      car_id: parseInt(id),
    });
  }

  // PICTURE UPLOAD
  // async function uploadFile(file) {
  //   if (!file) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post("http://127.0.0.1:5555/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log("File uploaded successfully");
  //       // Handle successful upload
  //     } else {
  //       console.error("Error uploading file");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // }
  function handleFormSubmit(e) {
    e.preventDefault();

    async function fetchAndSetUserId() {
      try {
        const response = await fetch("http://127.0.0.1:5555/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          if (user) {
            console.log(user.id);
            // setUserId(user.id);
            carData.seller_id = user.id;
            console.log(carData);
          } else {
            console.error("No user data found");
          }
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // Code that continues after fetching and updating state
      console.log("Fetch and state update complete.");
    }
    // uploadFile(selectedFile);
    // Call the function to initiate fetching and state update
    fetchAndSetUserId();
    // carData.pictures = "asdasd";
    carData.description = "akjsdhf";
    console.log(carData);
    fetch("http://127.0.0.1:5555/cars", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((res) => res.json())
      .then((car) => {
        console.log(car);
        console.log("________________________");
        // updateSellerID(car.id)
        specData.car_id = car.id;
        console.log(specData);
        fetch("http://127.0.0.1:5555/specs", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(specData),
        })
          .then((res) => res.json())
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    alert(`You have successfully added a car to the marketplace!`);
    e.target.reset();
    // router.push("/");
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleFormSubmit} className="w-full max-w-xl p-10">
        <div className="carSpecs">
          <label
            htmlFor="car_make"
            className="block text-sm font-large leading-6 text-gray-900"
          >
            Car
          </label>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div>
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Make
                  </label>
                  <div className="mt-2">
                    <input
                      id="car_make"
                      name="car_make"
                      type="text"
                      autoComplete="make"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleCarData}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Model
                  </label>
                  <div className="mt-2">
                    <input
                      id="car_model"
                      name="car_model"
                      type="text"
                      autoComplete="model"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleCarData}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="listed_price"
                      type="text"
                      autoComplete="price"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleCarData}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Car Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>{" "} */}
            {/* <label
            htmlFor="specs"
            className="block text-sm font-large leading-6 text-gray-900"
        >
            Specs
        </label> */}

            <div className="specsDiv">
              <div>
                <label
                  htmlFor="engine"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo URL
                </label>
                <div className="mt-2">
                  <input
                    id="pictures"
                    name="pictures"
                    type="text"
                    autoComplete="pictures"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleCarData}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="engine"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Engine
                </label>
                <div className="mt-2">
                  <input
                    id="engine"
                    name="engine"
                    type="text"
                    autoComplete="engine"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="milage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Milage
                </label>
                <div className="mt-2">
                  <input
                    id="milage"
                    name="milage"
                    type="text"
                    autoComplete="milage"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Horsepower
                </label>
                <div className="mt-2">
                  <input
                    id="hp"
                    name="hp"
                    type="text"
                    autoComplete="hp"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="doors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Doors
                </label>
                <div className="mt-2">
                  <select
                    id="doors"
                    name="doors"
                    autoComplete="doors"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  >
                    <option>Select</option>
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="transmission"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Transmission
                </label>
                <div className="mt-2">
                  <select
                    id="transmission"
                    name="transmission"
                    autoComplete="transmission"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  >
                    <option>Select</option>
                    <option>Manual</option>
                    <option>Automatic</option>
                    <option>Continuously Variable</option>
                    <option>Dual-Clutch</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="seats"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Seats
                </label>
                <div className="mt-2">
                  <select
                    id="seats"
                    name="seats"
                    autoComplete="seats"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  >
                    <option>Select</option>
                    <option>2</option>
                    <option>5</option>
                    <option>7</option>
                    <option>8</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="vin_num"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vin #
                </label>
                <div className="mt-2">
                  <input
                    id="vin_num"
                    name="vin_num"
                    type="text"
                    autoComplete="vin"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="history"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  History
                </label>
                <div className="mt-2">
                  <input
                    id="history"
                    name="history"
                    type="text"
                    autoComplete="history"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mpg"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  MPG
                </label>
                <div className="mt-2">
                  <input
                    id="mpg"
                    name="mpg"
                    type="text"
                    autoComplete="mpg"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="energy"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    id="energy"
                    name="energy"
                    autoComplete="type"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleSpecData}
                  >
                    <option>Select</option>
                    <option>Electric</option>
                    <option>Gas</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
