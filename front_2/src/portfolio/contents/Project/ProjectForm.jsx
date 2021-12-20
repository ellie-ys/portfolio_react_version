import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  ContentsFormStyle,
  ContentsFormInputStyle,
  DatePickerStyle,
} from "portfolio/contents/ContentsStyle";
import { BsTrash } from "react-icons/bs";

const ProjectForm = (props) => {
  const [project, setProject] = useState(props.formName);
  const [description, setDescription] = useState(props.formDescription);
  const [startdate, setStartdate] = useState(props.formStartdate);
  const [enddate, setEnddate] = useState(props.formEnddate);
  const [url, setUrl] = useState(props.formUrl);

  const changeUrlHandler = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    const newProjectData = props.projectData.map((item) =>
      item.id === props.formId
        ? {
            id: props.formId,
            name: project,
            description: description,
            startdate: startdate,
            enddate: enddate,
            url: url,
            user_id: props.formUserId,
          }
        : item
    );

    props.setProjectData(newProjectData);
  }, [project, description, startdate, enddate, url]);

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newProjectData = props.projectData.filter(
      (item) => item.id !== props.formId
    );
    props.setDeleteList(newDeleteList);
    props.setProjectData(newProjectData);
  };
  const formattedDate = (sdate) => {
    if (typeof sdate === "string") {
      const dateArr = sdate.split("-");
      return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    } else return sdate;
  };

  return (
    <ContentsFormStyle>
      <ContentsFormInputStyle>
        <input
          type="text"
          placeholder="프로젝트명"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
        <input
          type="text"
          placeholder="프로젝트 내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <DatePickerStyle>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={formattedDate(startdate)}
              onChange={(date) =>
                setStartdate(moment(date).format("YYYY-MM-DD"))
              }
            />
          </DatePickerStyle>{" "}
          ~
          <DatePickerStyle>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={formattedDate(enddate)}
              onChange={(date) => setEnddate(moment(date).format("YYYY-MM-DD"))}
            />
          </DatePickerStyle>
        </div>
        <input
          type="text"
          placeholder="프로젝트 주소"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </ContentsFormInputStyle>
      <BsTrash size="30" onClick={deleteHandler}>
        {" "}
        삭제{" "}
      </BsTrash>
    </ContentsFormStyle>
  );
};

export default ProjectForm;
