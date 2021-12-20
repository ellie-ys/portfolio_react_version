import React from "react";
import { ContentsInnerStyle } from "portfolio/contents/ContentsStyle";

const ProjectContents = (props) => {
  return (
    <ContentsInnerStyle key={props.projectId}>
      <p> {props.projectName} </p>
      <p> {props.projectDescription} </p>
      <p>
        {" "}
        {props.projectStartdate} ~ {props.projectEnddate}
      </p>
      <p> {props.projectUrl}</p>
    </ContentsInnerStyle>
  );
};

export default ProjectContents;
