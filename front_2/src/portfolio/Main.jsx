import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const isLogin = useSelector((state) => state.auth);
  console.log(isLogin);
  return <h1> Main </h1>;
};

export default Main;
