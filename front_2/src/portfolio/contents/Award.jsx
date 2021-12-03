import React from "react";
import { useSelector } from "react-redux";

const Award = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> Award </h2>
      <p> name </p>
      <p> description </p>
      <button> Edit </button>
    </div>
  );
};

export default Award;
