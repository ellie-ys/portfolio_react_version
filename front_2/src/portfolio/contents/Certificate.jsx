import React from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> Certificate </h2>
      <p> name </p>
      <p> agency </p>
      <p> date </p>
      <button> Edit </button>
    </div>
  );
};

export default Certificate;
