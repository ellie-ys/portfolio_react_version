import React from "react";

const EduContents = (props) => {
  return (
    <ContentsInnerStyle key={props.eduId}>
      <p> {props.eduName} </p>
      <p>
        {" "}
        {props.eduMajor} ({props.eduType})
      </p>
    </ContentsInnerStyle>
  );
};

export default EduContents;
