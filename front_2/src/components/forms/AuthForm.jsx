import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding-top: 20vh;
`;

export const WarningMessage = styled.p`
  color: tomato;
  font-size: 10px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px 30px 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 1px purple;
  width: 300px;
  margin: 0 auto;

  div + * {
    margin-top: 20px;
  }
  button + button {
    margin-top: 20px;
  }
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 5px;
    margin: 5px 0px;
  }
  *:focus {
    outline: none;
  }
`;
