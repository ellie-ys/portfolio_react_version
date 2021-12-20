import styled from "styled-components";

export const RegisterStyle = styled.div`
  width: 100%;
  min-height: 448px;
  background-color: white;
  border: solid 1px rgb(255, 226, 228);
  border-radius: 8px;
  width: 40vw;
  margin: 0 auto;
`;

export const RegisterFormStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  line-height: 2.875rem;

  div {
    width: 100%;
  }

  input {
    text-align: center;
    font-size: 1.2rem;
    width: 100%;
  }
`;

export const RegisterTitle = styled.p`
  font-size: 1.5rem;
  color: #222;
  font-weight: 700;
`;

export const RegisterButtonStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  button {
    background-color: #524fa1;
    border: 1px solid #524fa1;
    color: #fff;
    font-size: 1.2rem;
    padding: 1 1.5rem;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export const FlashMessage = styled.p`
  color: #524fa1;
  margin: 0;
`;
