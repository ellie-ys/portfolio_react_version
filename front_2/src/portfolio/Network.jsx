import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { BACKEND_URL } from "../utils/env";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

const NetworkStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NetworkContentStyle = styled.div`
  border: solid 2px black;
  text-align: center;
  width: 200px;
  margin-top: 50px;
`;

const NetworkContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 50px;
  row-gap: 30px;
`;

const Network = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  const [portfolios, setPortfolios] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(BACKEND_URL + "/network", header);
    setPortfolios(response.data);
    setSearchResult(response.data);
    setIsFetched(true);
  }, []);

  const searchBarHandler = (e) => {
    setSearchBar(e.target.value);
  };

  const searchSubmitHandler = () => {
    setSearchResult(
      portfolios.filter((element) => element.name.indexOf(searchBar) >= 0)
    );
  };

  const contentClickHandler = (id) => {
    history.push(`/main?user=${id}`);
  };

  return (
    <div>
      {isFetched ? (
        <NetworkStyle>
          <div>
            <input type="text" value={searchBar} onChange={searchBarHandler} />
            <button onClick={searchSubmitHandler}> 검색 </button>
          </div>
          <NetworkContentWrapper>
            {searchResult.map((element) => {
              return (
                <NetworkContentStyle
                  key={element.id}
                  onClick={() => contentClickHandler(element.id)}
                >
                  <div>{element.name}</div>
                  <div>{element.description}</div>
                </NetworkContentStyle>
              );
            })}
          </NetworkContentWrapper>
        </NetworkStyle>
      ) : (
        <div> Loading... </div>
      )}
    </div>
  );
};

export default Network;
