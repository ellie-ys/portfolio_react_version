import React from "react";
import { useSelector } from "react-redux";
import { Award, Certificate, Edu, Profile, Project } from "./contents";

const Main = () => {
  const isLogin = useSelector((state) => state.auth);
  console.log(isLogin);
  return (
    <>
      <h1> Main </h1>
      <div>
        <Profile />
        <Edu />
        <Award />
        <Project />
        <Profile />
        <Certificate />
      </div>
    </>
  );
};

export default Main;
