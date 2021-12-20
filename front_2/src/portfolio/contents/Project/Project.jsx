import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProjectContents from "portfolio/contents/Project/ProjectContents";
import ProjectForm from "portfolio/contents/Project/ProjectForm";
import { BACKEND_URL } from "utils/env";
import moment from "moment";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { projectDataValidation } from "utils/validation";
import {
  ContentsStyle,
  ContentsButtonWrapper,
} from "portfolio/contents/ContentsStyle";

const Project = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyProjectData, setCopyProjectData] = useState(props.projectData);
  const [newIndex, setNewIndex] = useState(0);
  const [deleteList, setDeleteList] = useState([]);

  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const editTriggerHandler = () => {
    setCopyProjectData(props.projectData);
    setEdit(true);
  };

  const editCancelHandler = () => {
    props.setProjectData(copyProjectData);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
  };

  const editCompleteHandler = async () => {
    if (!projectDataValidation(projectData)) {
      alert("모든 항목을 다 채워주세요.");
    } else {
      try {
        const deleteResponse = await axios.post(
          BACKEND_URL + "/projects/delete",
          deleteList.filter((item) => item > 0),
          header(access_token)
        );
        const response = await axios.put(
          BACKEND_URL + "/projects",
          projectData,
          header(access_token)
        );
        setProjectData(response.data);
        setEdit(false);
        setNewIndex(0);
        setDeleteList([]);
      } catch (error) {
        if (error.response !== undefined && error.response.status === 401) {
          // 토큰 만료시
          try {
            const refresh_response = await axios.post(
              BACKEND_URL + `/refresh/token`,
              { user_id: user_id }
            );
            const new_token = refresh_response.data.access_token;
            dispatch(refresh(new_token));
            const deleteResponse = await axios.post(
              BACKEND_URL + "/projects/delete",
              deleteList.filter((item) => item > 0),
              header(new_token)
            );
            const response = await axios.put(
              BACKEND_URL + "/projects",
              projectData,
              header(new_token)
            );
            setProjectData(response.data);
            setEdit(false);
            setNewIndex(0);
            setDeleteList([]);
          } catch (error) {
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
  };

  const addProjectDataHandler = () => {
    const newProjectData = props.projectData.concat({
      id: newIndex,
      name: "",
      description: "",
      startdate: moment(new Date()).format("YYYY-MM-DD"),
      enddate: moment(new Date()).format("YYYY-MM-DD"),
      url: "",
      user_id: props.userId,
    });
    setNewIndex(newIndex - 1);
    props.setProjectData(newProjectData);
  };

  return (
    <ContentsStyle>
      <h2> Project </h2>
      {edit ? (
        <div>
          {props.projectData.map((element) => {
            return (
              <ProjectForm
                key={element.id}
                formId={element.id}
                formName={element.name}
                formDescription={element.description}
                formStartdate={element.startdate}
                formEnddate={element.enddate}
                formUrl={element.url}
                formUserId={element.user_id}
                projectData={props.projectData}
                setProjectData={props.setProjectData}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
              />
            );
          })}

          <ContentsButtonWrapper>
            <button onClick={editCompleteHandler}> 완료 </button>
            <button onClick={editCancelHandler}> 취소 </button>
            <button onClick={addProjectDataHandler}> 추가 </button>
          </ContentsButtonWrapper>
        </div>
      ) : (
        <div>
          {props.projectData.map((element) => {
            return (
              <ProjectContents
                key={element.id}
                projectId={element.id}
                projectName={element.name}
                projectDescription={element.description}
                projectStartdate={element.startdate}
                projectEnddate={element.enddate}
                projectUrl={element.url}
              />
            );
          })}
          <ContentsButtonWrapper>
            {user_id === props.userId && (
              <button onClick={editTriggerHandler}> Edit </button>
            )}
          </ContentsButtonWrapper>
        </div>
      )}
    </ContentsStyle>
  );
};

export default Project;
