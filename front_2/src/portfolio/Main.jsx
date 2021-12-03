import React from "react";
import { useSelector } from "react-redux";
import { Award, Certificate, Edu, Profile, Project } from "./Contents";
import Footer from "./Footer.jsx";

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
        <Certificate />
      </div>
      <Footer />
    </>
  );
};

export default Main;
