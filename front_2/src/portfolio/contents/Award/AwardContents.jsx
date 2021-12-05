import React from "react";
import styled from "styled-components";

const AwardContentsStyle = styled.div`
  border: solid 2px purple;

  + div {
    margin-top: 10px;
  }
`;

const AwardContents = (props) => {
  return (
    <AwardContentsStyle key={props.awardId}>
      <p> {props.awardName} </p>
      <p> {props.awardDescription} </p>
    </AwardContentsStyle>
  );
};

export default AwardContents;
