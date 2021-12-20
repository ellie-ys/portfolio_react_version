import React from "react";
import { ContentsInnerStyle } from "portfolio/contents/ContentsStyle";

const AwardContents = (props) => {
  return (
    <ContentsInnerStyle key={props.awardId}>
      <p> {props.awardName} </p>
      <p> {props.awardDescription} </p>
    </ContentsInnerStyle>
  );
};

export default AwardContents;
