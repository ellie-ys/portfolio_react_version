import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Award, Certificate, Education, Profile, Project } from "./Contents";
import Footer from "./Footer.jsx";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../env";

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 40%;
  margin: 0 auto;
`;

const Main = () => {
  const access_token = useSelector((state) => state.user.access_token);
  // const isLogin = useSelector((state) => state.auth);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const [profileData, setProfileData] = useState([]);
  const [eduData, setEduData] = useState([]);
  const [awardData, setAwardData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(async () => {
    const response = await axios.get(BACKEND_URL + "/posts", header);

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
            <Profile profileData={profileData} />
            <Education eduData={eduData} setEduData={setEduData} />
            <Award awardData={awardData} />
            <Project projectData={projectData} />
            <Certificate certificateData={certificateData} />
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
