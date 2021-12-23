import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Award, Certificate, Education, Profile, Project } from "./Contents";
import Footer from "./Footer.jsx";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { header } from "utils/header";
import { useHistory } from "react-router-dom";
import { logout, refresh } from "redux/action";
import {
  MainStyle,
  MainContents,
  PortfolioStyle,
  ProfileStyle,
} from "./MainStyle";

const Main = () => {
  const access_token = useSelector((state) => state.user.access_token);

  const user_id = useSelector((state) => state.user.user_id);
  const isLogined = useSelector((state) => state.user.isLogined);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isFetched, setIsFetched] = useState(false);
  const [portfolios, setPortfolios] = useState({
    userId: null,
    profileData: [],
    eduData: [],
    awardData: [],
    projectData: [],
    certificateData: [],
  });

  useEffect(async () => {
    if (!isLogined) {
      history.push("/login");
    } else {
      try {
        const response = await axios.get(
          BACKEND_URL + `/posts?user=${user_id}`,
          header(access_token)
        );
        const {
          user_id: userId,
          profile,
          edus,
          awards,
          projects,
          certificates,
        } = response.data;
        setPortfolios({
          userId: userId,
          profileData: profile,
          eduData: edus,
          awardData: awards,
          projectData: projects,
          certificateData: certificates,
        });
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
              BACKEND_URL + `/posts?user=${user_id}`,
              header(new_token)
            );
            const {
              user_id: userId,
              profile,
              edus,
              awards,
              projects,
              certificates,
            } = response.data;
            setPortfolios({
              userId: userId,
              profileData: profile,
              eduData: edus,
              awardData: awards,
              projectData: projects,
              certificateData: certificates,
            });
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

  return (
    <>
      <MainStyle>
        {isFetched ? (
          <MainContents>
            <ProfileStyle>
              <Profile
                profileData={portfolios.profileData}
                userId={portfolios.userId}
              />
            </ProfileStyle>
            <PortfolioStyle>
              <Education
                eduData={portfolios.eduData}
                userId={portfolios.userId}
              />
              <Award
                awardData={portfolios.awardData}
                userId={portfolios.userId}
              />
              <Project
                projectData={portfolios.projectData}
                userId={portfolios.userId}
              />
              <Certificate
                certificateData={portfolios.certificateData}
                userId={portfolios.userId}
              />
            </PortfolioStyle>
          </MainContents>
        ) : (
          <div style={{ textAlign: "center" }}> Loading... </div>
        )}
      </MainStyle>
      <Footer />
    </>
  );
};

export default Main;
