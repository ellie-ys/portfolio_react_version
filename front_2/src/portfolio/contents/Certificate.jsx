import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CertificateStyle = styled.div`
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

const Certificate = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <CertificateStyle>
      <h2> Certificate </h2>
      <p> name </p>
      <p> agency </p>
      <p> date </p>
      <button> Edit </button>
    </CertificateStyle>
  );
};

export default Certificate;
