import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
Award,
Certificate,
Edu,
Profile,
Project,
} from "portfolio/contents/all-contents";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { header } from "utils/header";
import { useHistory } from "react-router-dom";
import { logout, refresh } from "redux/action";

const PostsStyle = styled.div`
display: flex;
flex-direction: column;
text-align: center;
width: 40%;
margin: 0 auto;
`;

const Posts = () => {
const access_token = useSelector((state) => state.user.access_token);
const user_id = useSelector((state) => state.user.user_id);
const isLogined = useSelector((state) => state.user.isLogined);
const history = useHistory();
const dispatch = useDispatch();

const postId = window.location.pathname.split("/").pop();
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
        BACKEND_URL + `/posts?user=${postId}`,
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
            BACKEND_URL + `/posts?user=${postId}`,
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
            alert("로그인 세션이 만료 되었습니다.");
            dispatch(logout());
            history.push("/login");
        }
        }
    }
    }
}, []);

return (
    <PostsStyle>
    {isFetched ? (
        <div>
        <Profile
            profileData={portfolios.profileData}
            userId={portfolios.userId}
        />
        <Edu eduData={portfolios.eduData} userId={portfolios.userId} />
        <Award awardData={portfolios.awardData} userId={portfolios.userId} />
        <Project
            projectData={portfolios.projectData}
            userId={portfolios.userId}
        />
        <Certificate
            certificateData={portfolios.certificateData}
            userId={portfolios.userId}
        />
        </div>
    ) : (
        <div> Loading... </div>
    )}
    </PostsStyle>
);
};

export default Posts;
