import styled from "styled-components";

export const LoginStyle = styled.div`
  min-height: 448px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background-color: white;
  border: solid 1px rgb(255, 226, 228);
  border-radius: 8px;
  width: 40vw;
  margin: 0 auto;
`;

export const LoginButtonStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  width: 90%;
  button {
    background-color: #524fa1;
    border: 1px solid #524fa1;
    color: #fff;
    font-size: 1.2rem;
    padding: 0 1.5rem;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export const LoginFormStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 3rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  line-height: 2.875rem;
`;

export const LoginTitle = styled.p`
  font-size: 1.5rem;
  color: #222;
  font-weight: 700;
`;

export const InputStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  width: 100%;

  input {
    text-align: center;
    font-size: 1.2rem;
    width: 90%;
    border: 1px solid black;
    border-radius: 5px;
  }

  margin-bottom: 3rem;
`;

export const FlashMessage = styled.p`
  color: #524fa1;
`;

export const GoogleLoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-height: 500px;
  margin: 0 auto;

  div {
    width: 40%;
    border-right: 1px solid rgb(255, 255, 255);
    height: 40%;
    align-items: center;
  }

  button {
    display: grid;
    grid-template-columns: 1fr;
    height: 10em;
    span {
      font-size: 1.5rem;
      align-items: center;
      color: #524fa1;
    }
  }
`;
