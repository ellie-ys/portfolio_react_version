import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ProjectContents from "./ProjectContents";
import ProjectForm from "./ProjectForm";
import { BACKEND_URL } from "../../../env";
import moment from "moment";

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
  useEffect(() => {
    console.log(props.projectData);
  }, []);

  const [edit, setEdit] = useState(false);
  const [copyProjectData, setCopyProjectData] = useState(props.projectData);
  const [newIndex, setNewIndex] = useState(0);
  const [deleteList, setDeleteList] = useState([]);

  const access_token = useSelector((state) => state.user.access_token);

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

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
    const deleteResponse = await axios.post(
      BACKEND_URL + "/projects/delete",
      deleteList.filter((item) => item > 0),
      header
    );
    const response = await axios.put(
      BACKEND_URL + "/projects",
      props.projectData,
      header
    );
    console.log(response.data);
    props.setProjectData(response.data);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
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
            <button onClick={editTriggerHandler}> 수정 </button>
          </ProjectButtonWrapper>
        </div>
      )}
    </ProjectStyle>
  );
};

export default Project;
