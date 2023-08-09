// export default getUser;

import React from "react";

const getUser = () => {
  async function user() {
    try {
      const response = await fetch("http://127.0.0.1:5555/session", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log(getUser());
  return <div>getUser</div>;
};

export default getUser;
