import React from "react";
import styled from "styled-components";

const ProjectContentsStyle = styled.div`
  border: solid 2px purple;
  
  + div{
    margin-top: 10px;
  }
`;

const ProjectContents = (props) => {

  return(
    <ProjectContentsStyle key={props.projectId}>
      <p> {props.projectName} </p>
      <p> {props.projectDescription} </p>
      <p> {props.projectStartdate} ~ {props.projectEnddate}</p>
      <p> {props.projectUrl}</p>
    </ProjectContentsStyle>
  );
};

export default ProjectContents;
