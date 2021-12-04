import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProjectStyle = styled.div`
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

const Project = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <ProjectStyle>
      <h2> Project </h2>
      <p> name </p>
      <p> description </p>
      <p> date </p>
      <p> project url</p>
      <button> Edit </button>
    </ProjectStyle>
  );
};

export default Project;
