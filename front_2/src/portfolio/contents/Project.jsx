import React from "react";
import { useSelector } from "react-redux";

const Project = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2> 프로젝트 </h2>
      <p> 프로젝트명 </p>
      <p> 한줄 소개 </p>
      <p> 날짜 </p>
      <p> 프로젝트 url</p>
      <button> 수정 </button>
    </div>
  );
};

export default Project;
