import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/env";
import { useSelector, useDispatch } from "react-redux";
import { header } from "utils/header";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router-dom";
import {
  NetworkStyle,
  NetworkContentStyle,
  NetworkContentWrapper,
  SearchButtonStyle,
} from "portfolio/NetworkStyle";

const Network = () => {
  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const isLogined = useSelector((state) => state.user.isLogined);

  const [portfolios, setPortfolios] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
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
        if (error.response !== undefined && error.response.status === 401) {
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
            if (error.response !== undefined && error.response.status === 401) {
              // 토큰 재발급 실패시
              alert("로그인 세션이 만료 되었습니다.");
            } else {
              // 그 외 오류
              alert("예기치 못한 오류가 발생했습니다. 자동 로그아웃 됩니다.");
            }

            dispatch(logout());
            history.push("/login");
          }
        } else {
          // 토큰 만료가 아닌 다른 오류
          alert("예기치 못한 오류가 발생했습니다. 자동 로그아웃 됩니다.");
          dispatch(logout());
          history.push("/login");
        }
      }
    }
  }, []);

  const searchSubmitHandler = () => {
    if (searchBar.length < 2) {
      alert("검색어는 최소 2글자 이상 입력해야 합니다.");
    } else {
      setSearchResult(
        portfolios.filter((element) => element.name.indexOf(searchBar) >= 0)
      );
      setSearchBar("");
      setIsSearched(true);
    }
  };

  const searchAllHandler = () => {
    setSearchResult(portfolios);
    setIsSearched(false);
  };

  const contentClickHandler = (id) => {
    history.push(`/posts/${id}`);
  };
  useEffect(() => {
    if (searchResult.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [searchResult]);

  return (
    <div>
      {isFetched ? (
        <NetworkStyle>
          <div>
            <input
              type="text"
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
              placeholder="이름"
            />
            <SearchButtonStyle onClick={searchSubmitHandler}>
              {" "}
              검색{" "}
            </SearchButtonStyle>
            {isSearched && (
              <SearchButtonStyle onClick={searchAllHandler}>
                {" "}
                전체보기{" "}
              </SearchButtonStyle>
            )}
          </div>
          <NetworkContentWrapper>
            {noResult ? (
              <p> 검색 결과가 없습니다. </p>
            ) : (
              searchResult.map((element) => {
                return (
                  <NetworkContentStyle key={element.id}>
                    {element.image === null ? (
                      <img src="###.png" width="100px" />
                    ) : (
                      <img src={element.image} />
                    )}
                    <div style={{ fontSize: "1.4rem" }}>{element.name}</div>

                    <div>{element.description}</div>
                    <button onClick={() => contentClickHandler(element.id)}>
                      {" "}
                      정보 보기{" "}
                    </button>
                  </NetworkContentStyle>
                );
              })
            )}
          </NetworkContentWrapper>
        </NetworkStyle>
      ) : (
        <div style={{ textAlign: "center" }}> Loading... </div>
      )}
    </div>
  );
};

export default Network;
