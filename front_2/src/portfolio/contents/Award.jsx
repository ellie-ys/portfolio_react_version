import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const AwardStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  & > button{
      width: 30%;
      margin: 0 auto;
    }
`;



const Award = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <AwardStyle>
      <h2> Award </h2>
      <p> name </p>
      <p> description </p>
      <button> Edit </button>
    </AwardStyle>
  );
};

export default Award;
