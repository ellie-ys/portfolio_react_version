import React from "react";
import axios from "axios";

const ElicePortfolio = ({ data }) => {
  const { user, awards, educations, licenses, projects } = data;


  const response = axios.get(`http://127.0.0.1:5000/elicer`)
 
  return (
    <>
      <div>
        <span>{user.name}</span>
        <p>{user.description ? user.description : "한 줄 소개"}</p>
      </div>
      <div>
        <h2>수상경력</h2>
        {awards.map((award) => {
          return (
            <div key={`award-${award.id}`}>
              <p>{award.name}</p>
              <p>{award.description}</p>
            </div>
          );
        })}
        <div>
          <h2>학력</h2>
          {educations.map((education) => {
            return (
              <div key={`education-${education.id}`}>
                <p>{education.school}</p>
                <p>{education.major}</p>
                <p>{education.degree}</p>
              </div>
            );
          })}
        </div>
        <h2>자격증</h2>
        {licenses.map((license) => {
          return (
            <div key={`license-${license.id}`}>
              <p>{license.name}</p>
              <p>{license.agency}</p>
              <p>{license.date}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2>프로젝트</h2>
        {projects.map((project) => {
          return (
            <div key={`project-${project.id}`}>
              <p>{project.name}</p>
              <p>{project.description}</p>
              <p>
                {project.startdate} ~ {project.enddate}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ElicePortfolio;
