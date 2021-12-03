import React from "react";
import { useSelector } from "react-redux";

const Edu = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> 학력 </h2>
      <p> 대학교 </p>
      <p> 전공 </p>
      <button> 수정 </button>
    </div>
  );
};

export default Edu;
