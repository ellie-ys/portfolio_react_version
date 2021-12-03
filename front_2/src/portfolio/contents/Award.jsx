import React from "react";
import { useSelector } from "react-redux";

const Award = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> 수상이력 </h2>
      <p> 상 이름 </p>
      <p> 한줄 소개 </p>
      <button> 수정 </button>
    </div>
  );
};

export default Award;
