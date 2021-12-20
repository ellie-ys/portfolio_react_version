import styled from "styled-components";

export const MainStyle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 80%;
    margin: 0 auto;
`;

export const MainContents = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: repeat(4, 1fr);
    column-gap: 5rem;
`;

export const ProfileStyle = styled.div`
    border: 2px solid rgba(100, 0, 100, 0.3);
    background-color: white;
    height: 25%;
`;

export const PortfolioStyle = styled.div`
    width: 100%;

    & > div {
        border: 2px solid rgba(100, 0, 100, 0.3);
        background-color: white;
    }
`;
