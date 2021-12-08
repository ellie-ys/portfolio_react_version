import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Award, Certificate, Education, Profile, Project } from "./Contents";
import Footer from "./Footer.jsx";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../utils/env";

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 40%;
  margin: 0 auto;
`;

const Main = () => {
  // const isLogin = useSelector((state) => state.auth);
  // console.log(isLogin);
  const access_token = useSelector((state) => state.user.access_token);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const [userId, setUserId] = useState();
  const [profileData, setProfileData] = useState({});
  const [eduData, setEduData] = useState([]);
  const [awardData, setAwardData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(async () => {
    const response = await axios.get(BACKEND_URL + "/posts", header);
    setUserId(response.data.user_id);
    setProfileData(response.data.profile);
    setEduData(response.data.edus);
    setAwardData(response.data.awards);
    setProjectData(response.data.projects);
    setCertificateData(response.data.certificates);
    setIsFetched(true);
    console.log("Main Called !");
  }, []);

  return (
    <>
      <MainStyle>
        {isFetched ? (
          <div>
            <Profile
              profileData={profileData}
              setProfileData={setProfileData}
              userId={userId}
            />
            <Education
              eduData={eduData}
              setEduData={setEduData}
              userId={userId}
            />
            <Award
              awardData={awardData}
              setAwardData={setAwardData}
              userId={userId}
            />
            <Project
              projectData={projectData}
              setProjectData={setProjectData}
              userId={userId}
            />
            <Certificate
              certificateData={certificateData}
              setCertificateData={setCertificateData}
              userId={userId}
            />
          </div>
        ) : (
          <div> Loading... </div>
        )}
      </MainStyle>
      <Footer />
    </>
  );
};

export default Main;
