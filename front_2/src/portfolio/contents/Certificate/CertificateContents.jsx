import React from "react";
import { ContentsInnerStyle } from "portfolio/contents/ContentsStyle";

const CertificateContents = (props) => {
  return (
    <ContentsInnerStyle key={props.certificateId}>
      <p> {props.certificateName} </p>
      <p> {props.certificateAgency} </p>
      <p> {props.certificateDate} </p>
    </ContentsInnerStyle>
  );
};

export default CertificateContents;
