import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const EduStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  & > button {
    width: 30%;
    margin: 0 auto;
  }
`;

const Education = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <EduStyle>
      <h2> Education </h2>
      <p> school </p>
      <p> major </p>
      <button> Edit </button>
    </EduStyle>
  );
};

export default Education;
