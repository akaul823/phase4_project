// import React from "react";

// function Search({search, setSearch}) {
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search"
//         onChange={(e) => {
//           setSearch(e.target.value)}
//         }
//         value={search}
//       />
//     </div>
//   );
// }

// export default Search;
import React from "react";
import { useState } from "react";

function Search({ search, setSearch }) {
  return (
    <div className="flex items-center bg-white rounded-full shadow-sm">
      <div className="pl-4">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.5 17.5l-2 2"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 w-64 text-gray-700 outline-none rounded-r-full"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
}

export default Search;
