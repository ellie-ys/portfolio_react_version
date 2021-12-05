import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const ProjectFormStyle = styled.div`
  border: 1px solid green;
  padding: 3px;
  + div {
    margin-top: 20px;
  }
`;

const DatePickerStyle = styled.div`
  display: inline-block;
`;

const InnerFormStyle = styled.div`
  margin: 5px;
`;

const ProjectForm = (props) => {
  const [project, setProject] = useState(
    props.projectData.filter((item) => item.id === props.formId)[0].name
  );
  const [description, setDescription] = useState(
    props.projectData.filter((item) => item.id === props.formId)[0].description
  );
  const [startdate, setStartdate] = useState(
    props.projectData.filter((item) => item.id === props.formId)[0].startdate
  );
  const [enddate, setEnddate] = useState(
    props.projectData.filter((item) => item.id === props.formId)[0].enddate
  );
  const [url, setUrl] = useState(
    props.projectData.filter((item) => item.id === props.formId)[0].url
  );

  const changeNameHandler = (e) => {
    setProject(e.target.value);
    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId ? { ...item, name: e.target.value } : item
    );
    props.setProjectData(newProjectData);
  };

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId ? { ...item, description: e.target.value } : item
    );
    props.setProjectData(newProjectData);
  };

  const changeStartdateHandler = (date) => {
    setStartdate(moment(date).format("YYYY-MM-DD"));
    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId ? { ...item, startdate: date } : item
    );
    props.setProjectData(newProjectData);
  };

  const changeEnddateHandler = (date) => {
    setEnddate(moment(date).format("YYYY-MM-DD"));
    console.log(enddate);

    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId ? { ...item, enddate: date } : item
    );
    props.setProjectData(newProjectData);
  };

  const changeUrlHandler = (e) => {
    setUrl(e.target.value);
    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId ? { ...item, url: e.target.value } : item
    );
    props.setProjectData(newProjectData);
  };

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newProjectData = props.projectData.filter(
      (item) => item.id !== props.formId
    );
    props.setDeleteList(newDeleteList);
    props.setProjectData(newProjectData);
  };
  const formattedStartDate = (sdate) => {
    if (typeof sdate === "string") {
      const dateArr = sdate.split("-");
      return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    } else return sdate;
  };

  return (
    <ProjectFormStyle>
      <InnerFormStyle>
        <input
          type="text"
          placeholder="프로젝트명"
          value={project}
          onChange={changeNameHandler}
        />
      </InnerFormStyle>
      <InnerFormStyle>
        <input
          type="text"
          placeholder="프로젝트 내용"
          value={description}
          onChange={changeDescriptionHandler}
        />
      </InnerFormStyle>
      <InnerFormStyle>
        <p>프로젝트 기간</p>
        <DatePickerStyle>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={formattedStartDate(startdate)}
            onChange={changeStartdateHandler}
          />
        </DatePickerStyle>{" "}
        ~
        <DatePickerStyle>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={formattedStartDate(enddate)}
            onChange={changeEnddateHandler}
          />
        </DatePickerStyle>
      </InnerFormStyle>
      <InnerFormStyle>
        <input
          type="text"
          placeholder="프로젝트 주소"
          value={url}
          onChange={changeUrlHandler}
        />
      </InnerFormStyle>
      <button onClick={deleteHandler}> 삭제 </button>
    </ProjectFormStyle>
  );
};

export default ProjectForm;
