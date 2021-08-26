import React from "react";
import styled from "styled-components";

const ContainerFooter = styled.div`
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  color: #292b2c;
  box-sizing: border-box;
  justify-content: center;
`;

function Footer() {
  return (
    <ContainerFooter>
      <p className="title">Elice </p>
    </ContainerFooter>
  );
}
export default Footer;
