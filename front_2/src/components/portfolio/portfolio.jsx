import styled from "styled-components"

export const PortfolioCardWrapper = styled.div`
    position: relative;
    background-color: #222831;
    padding: 40px;
    padding-bottom: 80px;

    > h2 {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;
    }
    & + & {
        margin-top: 20px;
    }
`

export const PortfolioElement = styled.div`
    padding: 30px 10px;
    border-top: 2px solid #EEEEEE;
    * + * {
        margin-top: 10px;
    }
`

export const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 40px;
    right: 40px;
    * + * {
        margin-left: 8px;
    }
`

export const Button = styled.button`
    border: none;
    box-sizing: border-box;
    background-color: #00ADB5;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 8px;
    color: white;

    :hover {
        transform: scale(1.1);
    }

`