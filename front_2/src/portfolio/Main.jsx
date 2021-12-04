import React from "react";
import { useSelector } from "react-redux";
import { Award, Certificate, Education, Profile, Project } from "./Contents";
import Footer from "./Footer.jsx";
import styled from "styled-components";

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 40%;
  margin: 0 auto;
`;

const Main = () => {
  const isLogin = useSelector((state) => state.auth);
  console.log(isLogin);

  return (
    <>
      <MainStyle>
        <Profile />
        <Education />
        <Award />
        <Project />
        <Certificate />
      </MainStyle>
      <Footer />
    </>
  );
};

export default Main;
