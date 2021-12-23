import React from "react";
import { ContentsInnerStyle } from "portfolio/contents/ContentsStyle";

const CertificateContents = (props) => {
  return (
    <ContentsInnerStyle key={props.certificateId}>
      <p> {props.certificateName} </p>
      <p> {props.certificateAgency} </p>
      <p className="date-content"> {props.certificateDate} 취득 </p>
    </ContentsInnerStyle>
  );
};

export default CertificateContents;
