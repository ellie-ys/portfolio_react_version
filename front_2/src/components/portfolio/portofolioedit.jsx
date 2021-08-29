import styled from "styled-components"

export const PortfolioEditForm = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-top: 2px solid #EEEEEE;
    padding: 30px 10px;
    * + * {
        margin-top: 10px;
    }
    input {
        padding: 10px;
        font-size: 14px;
        width: 60%;
        box-sizing: border-box;
        background-color: #EEEEEE;
        border: none;
    }
`

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

    input {
        width: fit-content;
        margin: 0;
    }
    span {
        margin: 0;
    }

    * + input {
        margin-left: 10px;
    }
`

export const PortfolioEditButtonWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    right: 0;
    * + * {
        margin-left: 8px;
    }
`

export const DatePickerWrapper = styled.div`
    display: flex;
    width: 60%;
    justify-content: space-between;
    align-items: center;

    input {
        width: 45%;
        margin: 0;
    }
    span {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
    }
`