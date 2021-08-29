import React, { useState } from "react";
import { useHistory } from "react-router";
import produce from "immer";

import * as awardApi from "apis/awardApi";
import * as PortfolioCard from "components/portfolio/PortfolioCard";
import * as PortfolioEdit from "components/portfolio/PortfolioEdit";

const EditAwardForm = ({ award, index, onSave, onDelete }) => {
  const [title, setTitle] = useState(award.title || "");
  const [detail, setDetail] = useState(award.detail || "");

  const handleAwardSubmit = (e) => {
    e.preventDefault();
    if (title && detail) {
      onSave(award.id, index, title, detail);
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const deleteItem = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(award.id, index);
    }
  };

  return (
    <PortfolioEdit.PortfolioEditForm onSubmit={handleAwardSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="수상내역"
      />
      <input
        type="text"
        name="detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="상세내역"
      />
      <PortfolioEdit.PortfolioEditButtonWrapper>
        <PortfolioCard.Button type="submit">저장</PortfolioCard.Button>
        <PortfolioCard.Button type="button" onClick={deleteItem}>
          삭제
        </PortfolioCard.Button>
      </PortfolioEdit.PortfolioEditButtonWrapper>
    </PortfolioEdit.PortfolioEditForm>
  );
};

const AwardCard = ({
  awards,
  loginId,
  setLoginId,
  isEditAble,
  setPortfolio,
}) => {
  const [edit, setEdit] = useState(false);
  const history = useHistory;

  const editAwardComplete = async () => {
    try {
      const data = await awardApi.getAwardsRequest(loginId);
      setPortfolio(
        produce((draft) => {
          draft.awards = data;
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

  const addAwardForm = () => {
    setPortfolio(
      produce((draft) => {
        draft.awards.push({
          id: null,
          title: "",
          detail: "",
        });
      })
    );
  };

  const saveAward = async (itemId, index, title, detail) => {
    try {
      if (itemId) {
        await awardApi.updateAwardRequest(itemId, title, detail);
      } else {
        const newItemId = await awardApi.addAwardRequest(
          loginId,
          title,
          detail
        );
        setPortfolio(
          produce((draft) => {
            draft.awards[index] = {
              id: newItemId,
              title,
              detail,
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

  const deleteAward = async (itemId, index) => {
    try {
      itemId && (await awardApi.deleteAwardRequest(itemId));
      setPortfolio(
        produce((draft) => {
          draft.awards = draft.awards.filter((val, idx) => index !== idx);
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
      <h2>수상이력</h2>
      {edit
        ? awards.map((award, idx) => {
            const key = award.id ? award.id : `null-${idx}`;
            return (
              <EditAwardForm
                key={`award-form-list-${key}`}
                award={award}
                index={idx}
                onSave={saveAward}
                onDelete={deleteAward}
              />
            );
          })
        : awards.map((award) => {
            return (
              <PortfolioCard.PortfolioElement key={`award-list-${award.id}`}>
                <p>{award.title}</p>
                <p>{award.detail}</p>
              </PortfolioCard.PortfolioElement>
            );
          })}
      {isEditAble && (
        <PortfolioCard.ButtonWrapper>
          {edit ? (
            <>
              <PortfolioCard.Button onClick={() => addAwardForm()}>
                추가
              </PortfolioCard.Button>
              <PortfolioCard.Button onClick={() => editAwardComplete()}>
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

export default AwardCard;
