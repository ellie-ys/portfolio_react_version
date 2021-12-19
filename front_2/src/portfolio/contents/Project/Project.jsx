import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ProjectContents from "portfolio/contents/Project/ProjectContents";
import ProjectForm from "portfolio/contents/Project/ProjectForm";
import { BACKEND_URL } from "utils/env";
import moment from "moment";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { projectDataValidation } from "utils/validation";

const ProjectStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  button {
    width: 30%;
    margin: 0 auto;
  }
`;

const ProjectButtonWrapper = styled.div`
  margin-top: 20px;
`;

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
          } catch (err) {
            alert("로그인 세션이 만료 되었습니다.");
            dispatch(logout());
            history.push("/login");
          }
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
    <ProjectStyle>
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

          <ProjectButtonWrapper>
            <button onClick={editCompleteHandler}> 완료 </button>
            <button onClick={editCancelHandler}> 취소 </button>
            <button onClick={addProjectDataHandler}> 추가 </button>
          </ProjectButtonWrapper>
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
          <ProjectButtonWrapper>
            {user_id === props.userId && (
              <button onClick={editTriggerHandler}> Edit </button>
            )}
          </ProjectButtonWrapper>
        </div>
      )}
    </ProjectStyle>
  );
};

export default Project;
