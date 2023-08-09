"use client";
import Nav from "../components/Nav";
import Search from "../components/Search";
import Cars from "./Cars/page";
import { useState, useNavigate } from "react";

const Home = () => {
  const [search, setSearch] = useState("")
  return (
    <div>
      <Search setSearch={setSearch} search={search} />
      <Cars search={search} />
    </div>
  );
};

export default Home;
