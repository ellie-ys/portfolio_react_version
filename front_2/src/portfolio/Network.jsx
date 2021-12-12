import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { BACKEND_URL } from "../utils/env";
import { useSelector, useDispatch } from "react-redux";
import { header } from "utils/header";
import { logout, refresh } from "redux/action";

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
  const user_id = useSelector((state) => state.user.user_id);
  const isLogined = useSelector((state) => state.user.isLogined);

  const [portfolios, setPortfolios] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!isLogined) {
      history.push("/login");
    } else {
      try {
        const response = await axios.get(
          BACKEND_URL + "/network",
          header(access_token)
        );
        setPortfolios(response.data);
        setSearchResult(response.data);
        setIsFetched(true);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("refreshing!");
          try {
            const refresh_response = await axios.post(
              BACKEND_URL + `/refresh/token`,
              { user_id: user_id }
            );
            const new_token = refresh_response.data.access_token;
            dispatch(refresh(new_token));
            const response = await axios.get(
              BACKEND_URL + "/network",
              header(new_token)
            );
            setPortfolios(response.data);
            setSearchResult(response.data);
            setIsFetched(true);
          } catch (err) {
            alert("로그인 세션이 만료 되었습니다.");
            dispatch(logout());
            history.push("/login");
          }
        }
      }
    }
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
    history.push(`/posts/${id}`);
  };

  return (
    <div>
      {isFetched ? (
        <NetworkStyle>
          <div>
            <input type="text" value={searchBar} onChange={searchBarHandler} />
            <button onClick={searchSubmitHandler}> 검색 </button>
            <button onClick={searchAllHandler}> 전체보기 </button>
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
