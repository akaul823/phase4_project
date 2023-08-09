"use client";
import Nav from "../components/Nav";
import Cars from "../components/Cars";
import Search from "../components/Search";
import { useState } from "react";
import Cars from "./Cars/page";
import { useState, useNavigate } from "react";

const Home = () => {
  const [search, setSearch] = useState("")
  return (
    <div>
      <Search setSearch={setSearch} search={search} />
      <Cars />
    </div>
  );
};

export default Home;
