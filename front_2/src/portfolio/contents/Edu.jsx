import React from "react";
import { useSelector } from "react-redux";

const Edu = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> Education </h2>
      <p> university </p>
      <p> major </p>
      <button> Edit </button>
    </div>
  );
};

export default Edu;
