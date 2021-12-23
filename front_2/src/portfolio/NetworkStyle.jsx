import styled from "styled-components";

export const NetworkStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;

  & > div {
    width: 100%;
  }

  button {
    background-color: #524fa1;
    border: 1px solid #524fa1;
    border-radius: 3px;
    color: #fff;
  }

  input {
    width: 50%;
    margin-right: 1rem;
    line-height: 2rem;
    border: 2px solid rgba(100, 0, 100, 0.3);
    border-radius: 3px;
  }
`;

export const NetworkContentStyle = styled.div`
  float: center;
  border: 2px solid rgba(100, 0, 100, 0.3);
  text-align: center;
  height: 18em;

  & > div {
    margin-top: 1rem;
  }
  div {
    height: 30%;
  }

  button {
    margin-top: 1rem;
    height: 3rem;
    :hover {
      opacity: 0.7;
    }
  }
`;

export const SearchButtonStyle = styled.button`
  height: 2.5rem;
  width: 5%;

  :hover {
    opacity: 0.7;
  }
`;

export const NetworkContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 6rem;
  row-gap: 4rem;
  width: 100%;
  margin-top: 5rem;
  justify-content: center;
`;
