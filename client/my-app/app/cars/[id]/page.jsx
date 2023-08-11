"use client";
import { useEffect, useState } from "react";

export default function CarDetail({ params: { id } }) {
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
        <p className="text-gray-600 mb-2">Marketplace ID: {car.id}</p>
        <p className="text-gray-600 mb-2">Status: {car.status}</p>
        <p className="text-gray-600 mb-2">Listed Price: ${car.listed_price}</p>
        <p className="text-gray-600 mb-4">Description: {car.description}</p>

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
      </div>
    </div>
  );
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
// */
// import { StarIcon } from '@heroicons/react/20/solid'
// import { RadioGroup } from '@headlessui/react'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function CarDetail({ params: { id } }) {
//   const [car, setCar] = useState(null);

//   useEffect(() => {
//     async function fetchCarDetails() {
//       try {
//         const response = await fetch(`http://127.0.0.1:5555/cars/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setCar(data);
//           console.log(data);
//         } else {
//           console.error("Error fetching car details");
//         }
//       } catch (error) {
//         console.error("Error fetching car details:", error);
//       }
//     }

//     if (id) {
//       fetchCarDetails();
//     }
//   }, [id]);

//   if (!car) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <div className="bg-white">
//       <div className="pt-6">

//         {/* Image gallery */}
//         <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//           <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//             <img
//               src={"https://images.unsplash.com/flagged/photo-1579840947450-eb22b16fa71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym13JTIwaTh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
//               alt={`${car.car_make} ${car.car_model}`}
//               className="h-full w-full object-cover object-center"
//             />
//           </div>
//         </div>

//         {/* Product info */}
//         <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//           <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{`${car.car_make} ${car.car_model}`}</h1>
//           </div>

//           {/* Options */}
//           <div className="mt-4 lg:row-span-3 lg:mt-0">
//             {/* Specs */}
//             <div className="mt-6">
//               <h3 className="sr-only">Reviews</h3>
//               <div className="flex items-center">
//               <ul className="mt-6 space-y-2">
//                 <li>Doors: {car.spec[0].doors}</li>
//                 <li>Energy: {car.spec[0].energy}</li>
//                 <li>Engine: {car.spec[0].engine}</li>
//                 <li>History: {car.spec[0].history}</li>
//                 <li>HP: {car.spec[0].hp}</li>
//                 <li>Mileage: {car.spec[0].milage}</li>
//                 <li>MPG: {car.spec[0].mpg}</li>
//                 <li>Seats: {car.spec[0].seats}</li>
//                 <li>Transmission: {car.spec[0].transmission}</li>
//                 <li>VIN Number: {car.spec[0].vin_num}</li>
//               </ul>
//               </div>
//             </div>
//           </div>

//           <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
//             {/* Description and details */}
//             <div>
//               <h3 className="sr-only">Description</h3>

//               <div className="space-y-6">
//                 <p className="text-base text-gray-900">{car.description}</p>
//               </div>
//             </div>

//             <div className="mt-10">
//               <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

//               <div className="mt-4">
//                 <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
//                 <h2 className="text-xl font-semibold mb-2">Specifications</h2>
//                   {/* <p>Doors: {car.spec[0].doors}</p>
//                   <p>Energy: {car.spec[0].energy}</p>
//                   <p>Engine: {car.spec[0].engine}</p>
//                   <p>History: {car.spec[0].history}</p>
//                   <p>HP: {car.spec[0].hp}</p>
//                   <p>Mileage: {car.spec[0].milage}</p>
//                   <p>MPG: {car.spec[0].mpg}</p>
//                   <p>Seats: {car.spec[0].seats}</p>
//                   <p>Transmission: {car.spec[0].transmission}</p>
//                   <p>VIN Number: {car.spec[0].vin_num}</p> */}
//                 </ul>
//               </div>
//             </div>

//             <div className="mt-10">
//               <h2 className="text-sm font-medium text-gray-900">Details</h2>

//               <div className="mt-4 space-y-6">
//                 <p className="text-sm text-gray-600">This Works!</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





