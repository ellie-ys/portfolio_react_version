import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { fetchPortfolio } from "../apis/portfolio";

// import { ProfileCard } from "./components/ProfileCard";

const Portfolio = ({ loginId, setLoginId }) => {
  const [portfolio, setPortfolio] = useState(null);
  const { id: currentUser } = useParams();
  const history = useHistory();

  useEffect(() => {
    const userId = currentUser ? currentUser : loginId;
    if (loginId === null) return;
    (async () => {
      try {
        const data = await fetchPortfolio(userId);
        setPortfolio(data);
      } catch (e) {
        if (e.response.status === 401) {
          window.sessionStorage.clear();
          setLoginId(null);
          history.push("login");
        }
        if (e.response.status === 404) {
          history.push("/page404");
        }
      }
    })();
  }, [currentUser, loginId, history, setLoginId]);

  return (
    <main>
      {loginId === null && <Redirect to="/login" />}
      {portfolio === null ? (
        <h2>로딩 중</h2>
      ) : (
        <>
          <h1>페이지 수정중입니다!</h1>
          {/* <ProfileCard
            user={portfolio.user}
            setLoginId={setLoginId}
            isEditAble={
              currentUser === undefined ||
              Number(currentUser) === Number(loginId)
            }
            setPortfolio={setPortfolio}
          /> */}
        </>
      )}
    </main>
  );
};

export default Portfolio;
