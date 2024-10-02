import React from "react";
import TeamList from "./TeamList";

const Home = () => {
  return (
    <div className="d-flex justify-content-center flex-column text-center min-vh-100">
      <h1>Utah Oval Hockey D5 2022 standings</h1>
      <TeamList />
    </div>
  );
};

export default Home;
