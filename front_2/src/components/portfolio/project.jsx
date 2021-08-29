import React, { useState } from "react";
import { useHistory } from "react-router";
import produce from "immer";

import * as projectApi from "apis/projectApi";
import {
  currentDateValidation,
  startToEndDateValidation,
} from "utils/validation";
import { dateToString } from "utils/format";
import * as PortfolioCard from "components/portfolio/PortfolioCard";
import * as PortfolioEdit from "components/portfolio/PortfolioEdit";

const EditProjectForm = ({ project, index, onSave, onDelete }) => {
  const [title, setTitle] = useState(project.title || "");
  const [detail, setDetail] = useState(project.detail || "");
  const [startDate, setStartDate] = useState(project.start_date || "");
  const [endDate, setEndDate] = useState(project.end_date || "");

  const handleProjectSubmit = (e) => {
    e.preventDefault();

    if (title && detail && startDate && endDate) {
      if (!startToEndDateValidation(startDate, endDate)) {
        alert("종료 날짜는 시작 날짜 다음이어야 합니다.");
        return;
      }
      if (
        !currentDateValidation(startDate) ||
        !currentDateValidation(endDate)
      ) {
        alert("현재 날짜보다 앞선 날짜를 선택해주세요.");
        return;
      }
      onSave(project.id, index, title, detail, startDate, endDate);
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const deleteItem = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(project.id, index);
    }
  };

  return (
    <PortfolioEdit.PortfolioEditForm onSubmit={handleProjectSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <PortfolioEdit.DatePickerWrapper>
        <input
          type="date"
          name="start_date"
          value={startDate}
          max={
            new Date(endDate) < new Date() ? endDate : dateToString(new Date())
          }
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>~</span>
        <input
          type="date"
          name="end_date"
          value={endDate}
          min={startDate}
          max={dateToString(new Date())}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </PortfolioEdit.DatePickerWrapper>
      <PortfolioEdit.PortfolioEditButtonWrapper>
        <PortfolioCard.Button type="submit">저장</PortfolioCard.Button>
        <PortfolioCard.Button type="button" onClick={deleteItem}>
          삭제
        </PortfolioCard.Button>
      </PortfolioEdit.PortfolioEditButtonWrapper>
    </PortfolioEdit.PortfolioEditForm>
  );
};

const ProjectCard = ({
  projects,
  loginId,
  setLoginId,
  isEditAble,
  setPortfolio,
}) => {
  const [edit, setEdit] = useState(false);
  const history = useHistory;

  const editProjectComplete = async () => {
    try {
      const data = await projectApi.getProjectsRequest(loginId);
      setPortfolio(
        produce((draft) => {
          draft.projects = data;
        })
      );
      setEdit(false);
    } catch (e) {
      if (e.response.status === "401") {
        alert("세션이 만료되었습니다.");
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  const addProjectForm = () => {
    setPortfolio(
      produce((draft) => {
        draft.projects.push({
          id: null,
          title: "",
          detail: "",
          start_date: "",
          end_date: "",
        });
      })
    );
  };

  const saveProject = async (
    itemId,
    index,
    title,
    detail,
    startDate,
    endDate
  ) => {
    try {
      if (itemId) {
        await projectApi.updateProjectRequest(
          itemId,
          title,
          detail,
          startDate,
          endDate
        );
      } else {
        const newItemId = await projectApi.addProjectRequest(
          loginId,
          title,
          detail,
          startDate,
          endDate
        );
        setPortfolio(
          produce((draft) => {
            draft.projects[index] = {
              id: newItemId,
              title,
              detail,
              start_date: startDate,
              end_date: endDate,
            };
          })
        );
      }
      alert("저장되었습니다.");
    } catch (e) {
      if (e.response.status === 401) {
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  const deleteProject = async (itemId, index) => {
    try {
      itemId && (await projectApi.deleteProjectRequest(itemId));
      setPortfolio(
        produce((draft) => {
          draft.projects = draft.projects.filter((val, idx) => index !== idx);
        })
      );
      alert("삭제되었습니다.");
    } catch (e) {
      if (e.response.status === 401) {
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  return (
    <PortfolioCard.PortfolioCardWrapper>
      <h2>프로젝트</h2>
      {edit
        ? projects.map((project, idx) => {
            const key = project.id ? project.id : `null-${idx}`;
            return (
              <EditProjectForm
                key={`project-form-list-${key}`}
                project={project}
                index={idx}
                onSave={saveProject}
                onDelete={deleteProject}
              />
            );
          })
        : projects.map((project) => {
            return (
              <PortfolioCard.PortfolioElement
                key={`project-list-${project.id}`}
              >
                <p>{project.title}</p>
                <p>{project.detail}</p>
                <p>
                  {project.start_date} ~ {project.end_date}
                </p>
              </PortfolioCard.PortfolioElement>
            );
          })}
      {isEditAble && (
        <PortfolioCard.ButtonWrapper>
          {edit ? (
            <>
              <PortfolioCard.Button onClick={() => addProjectForm()}>
                추가
              </PortfolioCard.Button>
              <PortfolioCard.Button onClick={() => editProjectComplete()}>
                수정완료
              </PortfolioCard.Button>
            </>
          ) : (
            <PortfolioCard.Button onClick={() => setEdit(true)}>
              수정
            </PortfolioCard.Button>
          )}
        </PortfolioCard.ButtonWrapper>
      )}
    </PortfolioCard.PortfolioCardWrapper>
  );
};

export default ProjectCard;
