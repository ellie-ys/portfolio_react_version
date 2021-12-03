import React from "react";
import { useSelector } from "react-redux";

const Project = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> Project </h2>
      <p> name </p>
      <p> description </p>
      <p> date </p>
      <p> project url</p>
      <button> Edit </button>
    </div>
  );
};

export default Project;
