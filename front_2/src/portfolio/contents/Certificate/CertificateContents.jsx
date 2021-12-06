import React from "react";
import styled from "styled-components";

const CertificateContentsStyle = styled.div`
  border: solid 2px purple;
  
  + div{
    margin-top: 10px;
  }
`;

const CertificateContents = (props) => {

  return(
    <CertificateContentsStyle key={props.certificateId}>
      <p> {props.certificateName} </p>
      <p> {props.certificateAgency} </p>
      <p> {props.certificateDate} </p>      
    </CertificateContentsStyle>
  );
};

export default CertificateContents;
