import React, { useState } from "react";
import { useHistory } from "react-router";
import produce from "immer";

import * as educationApi from "apis/educationApi";
import * as PortfolioCard from "components/portfolio/PortfolioCard";
import * as PortfolioEdit from "components/portfolio/PortfolioEdit";

const EditEducationForm = ({ education, index, onSave, onDelete }) => {
    const [school, setSchool] = useState(education.school || "");
    const [major, setMajor] = useState(education.major || "");
    const [degree, setDegree] = useState(education.degree || "");

    const handleEducationSubmit = e => {
        e.preventDefault();
        if (school && major && degree) {
            onSave(education.id, index, school, major, degree);
        }
        else {
            alert("모든 정보를 입력해주세요.")
        }
    }

    const deleteItem = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(education.id, index);
        }
    }

    return (
        <PortfolioEdit.PortfolioEditForm onSubmit={handleEducationSubmit}>
            <input type="text" name="school" value={school} onChange={e => setSchool(e.target.value)} placeholder="학교이름" />
            <input type="text" name="major" value={major} onChange={e => setMajor(e.target.value)} placeholder="전공" />
            <PortfolioEdit.InputContainer>
                <input type="radio" name="degree" value="재학중" checked={degree === "재학중"} onChange={e => setDegree(e.target.value)} /><span>재학중</span>
                <input type="radio" name="degree" value="학사졸업" checked={degree === "학사졸업"} onChange={e => setDegree(e.target.value)} /><span>학사졸업</span>
                <input type="radio" name="degree" value="석사졸업" checked={degree === "석사졸업"} onChange={e => setDegree(e.target.value)} /><span>석사졸업</span>
                <input type="radio" name="degree" value="박사졸업" checked={degree === "박사졸업"} onChange={e => setDegree(e.target.value)} /><span>박사졸업</span>
            </PortfolioEdit.InputContainer>
            <PortfolioEdit.PortfolioEditButtonWrapper>
                <PortfolioCard.Button type="submit">저장</PortfolioCard.Button>
                <PortfolioCard.Button type="button" onClick={deleteItem}>삭제</PortfolioCard.Button>
            </PortfolioEdit.PortfolioEditButtonWrapper>
        </PortfolioEdit.PortfolioEditForm>
    )
}

const EducationCard = ({ educations, loginId, setLoginId, isEditAble, setPortfolio }) => {
    const [edit, setEdit] = useState(false);
    const history = useHistory;

    const editEducationComplete = async () => {
        try {
            const data = await educationApi.getEducationsRequest(loginId);
            setPortfolio(produce(draft => {
                draft.educations = data;
            }))
            setEdit(false);
        } catch (e) {
            if (e.response.status === "401") {
                alert("세션이 만료되었습니다.");
                window.sessionStorage.clear();
                setLoginId(null);
                history.push("/login");
            }
        }
    }


    const addEducationForm = () => {
        setPortfolio(produce(draft => {
            draft.educations.push({
                id: null,
                school: "",
                major: "",
                degree: "재학중",
            });
        }));
    }

    const saveEducation = async (itemId, index, school, major, degree) => {
        try {
            if (itemId) {
                await educationApi.updateEducationRequest(itemId, school, major, degree);
            }
            else {
                const newItemId = await educationApi.addEducationRequest(loginId, school, major, degree);
                setPortfolio(produce(draft => {
                    draft.educations[index] = {
                        id: newItemId,
                        school,
                        major,
                        degree,
                    };
                }))
            }
            alert("저장되었습니다.");
        } catch (e) {
            if (e.response.status === 401) {
                window.sessionStorage.clear();
                setLoginId(null);
                history.push("/login");
            }
        }
    }

    const deleteEducation = async (itemId, index) => {
        try {
            itemId && await educationApi.deleteEducationRequest(itemId);
            setPortfolio(produce(draft => {
                draft.educations = draft.educations.filter((val, idx) => index !== idx);
            }))
            alert("삭제되었습니다.");
        } catch (e) {
            if (e.response.status === 401) {
                window.sessionStorage.clear();
                setLoginId(null);
                history.push("/login");
            }
        }
    }

    return (
        <PortfolioCard.PortfolioCardWrapper>
            <h2>학력</h2>
            {
                edit
                    ? educations.map((education, idx) => {
                        const key = education.id ? education.id : `null-${idx}`;
                        return <EditEducationForm
                            key={`education-form-list-${key}`}
                            education={education}
                            index={idx}
                            onSave={saveEducation}
                            onDelete={deleteEducation}
                        />
                    })
                    : educations.map(education => {
                        return (
                            <PortfolioCard.PortfolioElement key={`education-list-${education.id}`}>
                                <p>{education.school}</p>
                                <p>{education.major}</p>
                                <p>{education.degree}</p>
                            </PortfolioCard.PortfolioElement>
                        )
                    })
            }
            {
                isEditAble && (
                    <PortfolioCard.ButtonWrapper>
                        {edit
                            ? (
                                <>
                                    <PortfolioCard.Button onClick={() => addEducationForm()}>추가</PortfolioCard.Button>
                                    <PortfolioCard.Button onClick={() => editEducationComplete()}>수정완료</PortfolioCard.Button>
                                </>
                            )
                            : <PortfolioCard.Button onClick={() => setEdit(true)}>수정</PortfolioCard.Button>}
                    </PortfolioCard.ButtonWrapper>
                )
            }
        </PortfolioCard.PortfolioCardWrapper>
    )
}

export default EducationCard;