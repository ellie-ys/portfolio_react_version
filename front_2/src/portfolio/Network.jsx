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
  const [imageHash, setImageHash] = useState(Date.now());
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
        setImageHash(Date.now());
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
              // ?????? ????????? ?????????
              alert("????????? ????????? ?????? ???????????????.");
            } else {
              // ??? ??? ??????
              alert("????????? ?????? ????????? ??????????????????. ?????? ???????????? ?????????.");
            }

            dispatch(logout());
            history.push("/login");
          }
        } else {
          // ?????? ????????? ?????? ?????? ??????
          alert("????????? ?????? ????????? ??????????????????. ?????? ???????????? ?????????.");
          dispatch(logout());
          history.push("/login");
        }
      }
    }
  }, []);

  const searchSubmitHandler = () => {
    if (searchBar.length < 2) {
      alert("???????????? ?????? 2?????? ?????? ???????????? ?????????.");
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
              placeholder="??????"
            />
            <SearchButtonStyle onClick={searchSubmitHandler}>
              {" "}
              ??????{" "}
            </SearchButtonStyle>
            {isSearched && (
              <SearchButtonStyle onClick={searchAllHandler}>
                {" "}
                ????????????{" "}
              </SearchButtonStyle>
            )}
          </div>
          <NetworkContentWrapper>
            {noResult ? (
              <p> ?????? ????????? ????????????. </p>
            ) : (
              searchResult.map((element) => {
                return (
                  <NetworkContentStyle key={element.id}>
                    <img src={`${element.image}?${imageHash}`} />
                    <div style={{ fontSize: "1.4rem" }}>{element.name}</div>

                    <div>{element.description}</div>
                    <button onClick={() => contentClickHandler(element.id)}>
                      {" "}
                      ?????? ??????{" "}
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
