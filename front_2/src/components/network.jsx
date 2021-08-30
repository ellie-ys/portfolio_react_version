import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";

import { searchUsers } from "../apis/elicer";

import ProfileCard from "./ProfileCard";

import { networkUsers } from "../apis/elicer";

const Network = ({ loginId, setLoginId }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const data = await searchUsers("");
        setUsers(data);
      } catch (e) {
        if (e.response.status === "401") {
          alert("세션이 만료되었습니다.");
          window.sessionStorage.clear();
          setLoginId(null);
          history.push("/api/auth/login");
        }
      }
    })();
  }, [history, setLoginId]);

  const fetchUsersData = async () => {
    try {
      const data = await networkUsers(query);
      setUsers(data);
    } catch (e) {
      if (e.response.status === "401") {
        alert("세션이 만료되었습니다.");
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  const handleCardClick = (userId) => {
    history.push(`/${userId}`);
  };

  const handlebuttonClick = () => {
    if (query.length < 2) {
      return alert("검색어는 최소 2글자 이상 입력해야 합니다.");
    }
    setUsers(null);
    fetchUsersData();
  };

  return (
    <main>
      {loginId === null && <Redirect to="/login" />}
      <div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handlebuttonClick}>검색</button>
      </div>

      {users === null ? (
        <div>
          <h2>검색 중</h2>
        </div>
      ) : users.length === 0 ? (
        <div>
          <h2>검색 결과가 존재하지 않습니다.</h2>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <ProfileCard
              key={`user-search-card${user.id}`}
              onClick={handleCardClick}
              user={user}
              link={true}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Network;
