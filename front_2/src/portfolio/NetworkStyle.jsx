import styled from "styled-components";

export const NetworkStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  margin-bottom: 8rem;
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
    padding-left: 1rem;
  }
`;

export const NetworkContentStyle = styled.div`
  position: relative;
  background-color: white;

  float: center;
  border: 2px solid rgba(100, 0, 100, 0.3);
  text-align: center;
  padding: 2rem 1rem 2rem 1rem;
  /* height: 45vh; */

  & > div {
    margin: 1rem;
    min-height: 3rem;
    max-height: 3rem;
    /* overflow: hidden; */

    @media screen and (max-width: 820px) {
      display: none;
    }
  }
  img {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    border: solid 1px rgba(0, 0, 100, 0.3);
  }

  button {
    margin-top: 1rem;
    width: 50%;
    min-width: 5rem;

    height: 3rem;
    :hover {
      opacity: 0.7;
    }
  }
`;

export const SearchButtonStyle = styled.button`
  height: 2.5rem;
  width: 5%;
  margin-right: 1rem;
  :hover {
    opacity: 0.7;
  }
`;

export const NetworkContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20%);
  column-gap: 3rem;
  row-gap: 3rem;

  width: 100%;
  margin-top: 5rem;
  justify-content: center;
`;
