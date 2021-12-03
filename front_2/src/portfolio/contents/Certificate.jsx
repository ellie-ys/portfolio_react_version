import React from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> 자격증 </h2>
      <p> 자격증 이름 </p>
      <p> 발급기관 </p>
      <p> 날짜 </p>
      <button> 수정 </button>
    </div>
  );
};

export default Certificate;
