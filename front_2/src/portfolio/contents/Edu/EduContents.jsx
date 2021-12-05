import React from "react";
import styled from "styled-components";

const EduContentsStyle = styled.div`
  border: solid 2px purple;
  
  + div{
    margin-top: 10px;
  }
`;

const EduContents = (props) => {

  return(
    <EduContentsStyle key={props.eduId}>
      <p> {props.eduName} </p>
      <p> {props.eduMajor} </p>
      <p> {props.eduType} </p>
    </EduContentsStyle>
  );
};

export default EduContents;
