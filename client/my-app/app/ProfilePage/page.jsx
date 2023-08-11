"use client";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function ProfilePage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...loggedInUser });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    setEditedUser(loggedInUser);
  }, [loggedInUser]);

  const handleSaveClick = () => {
    fetch(`http://127.0.0.1:5555/users/${editedUser.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
          setLoggedInUser(editedUser);
        }
      })
      .catch((error) => console.log(error));

    setIsEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

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
                  {isEditMode ? (
                    <input
                      type="text"
                      name="fullname"
                      value={editedUser.fullname}
                      onChange={handleInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    editedUser.fullname
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    editedUser.email
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    editedUser.phone
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleInputChange}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    editedUser.address
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-6 text-right">
            {isEditMode ? (
              <button
                className="text-gray-600 hover:text-gray-800 mr-3"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="text-gray-600 hover:text-gray-800 mr-3"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// "use client";
// import { PaperClipIcon } from "@heroicons/react/20/solid";
// import { useState, useEffect, useContext } from "react";
// import { UserContext } from "../UserContext";

// export default function ProfilePage() {
//   const { loggedInUser } = useContext(UserContext);
//   const user = loggedInUser;

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {loggedInUser !== {} ? (
//         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//           <div className="px-4 sm:px-0 text-center">
//             <h3 className="text-base font-semibold leading-7 text-gray-900">
//               Profile Information
//             </h3>
//           </div>
//           <div className="mt-6 border-t border-gray-100">
//             <dl className="divide-y divide-gray-100">
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Full name
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {user.fullname}
//                 </dd>
//               </div>
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Email address
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {user.email}
//                 </dd>
//               </div>
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Phone
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {user.phone}
//                 </dd>
//               </div>
// <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//   <dt className="text-sm font-medium leading-6 text-gray-900">
//     Address
//   </dt>
//   <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//     {user.address}
//   </dd>
// </div>
//             </dl>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }
