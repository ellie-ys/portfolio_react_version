import React, { useState } from "react";
import { useHistory } from "react-router";
import produce from "immer";

import * as licenseApi from "apis/licenseApi";
import { currentDateValidation } from "utils/validation";
import { dateToString } from "utils/format";
import * as PortfolioCard from "components/portfolio/PortfolioCard";
import * as PortfolioEdit from "components/portfolio/PortfolioEdit";

const EditLicenseForm = ({ license, index, onSave, onDelete }) => {
    const [title, setTitle] = useState(license.title || "");
    const [organization, setOrganization] = useState(license.organization || "");
    const [acquisition, setAcquisition] = useState(license.acquisition || "");

    const handleLicenseSubmit = e => {
        e.preventDefault();

        if (title && organization && acquisition) {
            if (!currentDateValidation(acquisition)) {
                alert("현재 날짜보다 앞선 날짜를 선택해주세요.");
                return;
            }
            onSave(license.id, index, title, organization, acquisition);
        } else {
            alert("모든 정보를 입력해주세요.");
        }
    }

    const deleteItem = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(license.id, index);
        }
    }

    return (
        <PortfolioEdit.PortfolioEditForm onSubmit={handleLicenseSubmit}>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="자격증이름" />
            <input type="text" name="organization" value={organization} onChange={e => setOrganization(e.target.value)} placeholder="발급기관" />
            <PortfolioEdit.DatePickerWrapper>
                <input type="date" name="acquisition" value={acquisition} max={dateToString(new Date())} onChange={e => setAcquisition(e.target.value)} />
            </PortfolioEdit.DatePickerWrapper>
            <PortfolioEdit.PortfolioEditButtonWrapper>
                <PortfolioCard.Button type="submit">저장</PortfolioCard.Button>
                <PortfolioCard.Button type="button" onClick={deleteItem}>삭제</PortfolioCard.Button>
            </PortfolioEdit.PortfolioEditButtonWrapper>
        </PortfolioEdit.PortfolioEditForm>
    )
}

const LicenseCard = ({ licenses, loginId, setLoginId, isEditAble, setPortfolio }) => {
    const [edit, setEdit] = useState(false);
    const history = useHistory();

    const editLicenseComplete = async () => {
        try {
            const data = await licenseApi.getLicensesRequest(loginId);
            setPortfolio(produce(draft => {
                draft.licenses = data;
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


    const addLicenseForm = () => {
        setPortfolio(produce(draft => {
            draft.licenses.push({
                id: null,
                title: "",
                organization: "",
                acquisition: "",
            });
        }));
    }

    const saveLicense = async (itemId, index, title, organization, acquisition) => {
        try {
            if (itemId) {
                await licenseApi.updateLicenseRequest(itemId, title, organization, acquisition);
            }
            else {
                const newItemId = await licenseApi.addLicenseRequest(loginId, title, organization, acquisition);
                setPortfolio(produce(draft => {
                    draft.licenses[index] = {
                        id: newItemId,
                        title,
                        organization,
                        acquisition,
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

    const deleteLicense = async (itemId, index) => {
        try {
            itemId && await licenseApi.deleteLicenseRequest(itemId);
            setPortfolio(produce(draft => {
                draft.licenses = draft.licenses.filter((val, idx) => index !== idx);
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
            <h2>자격증</h2>
            {
                edit
                    ? licenses.map((license, idx) => {
                        const key = license.id ? license.id : `null-${idx}`;
                        return <EditLicenseForm
                            key={`license-form-list-${key}`}
                            license={license}
                            index={idx}
                            onSave={saveLicense}
                            onDelete={deleteLicense}
                        />
                    })
                    : licenses.map(license => {
                        return (
                            <PortfolioCard.PortfolioElement key={`license-list-${license.id}`}>
                                <p>{license.title}</p>
                                <p>{license.organization}</p>
                                <p>{license.acquisition}</p>
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
                                    <PortfolioCard.Button onClick={() => addLicenseForm()}>추가</PortfolioCard.Button>
                                    <PortfolioCard.Button onClick={() => editLicenseComplete()}>수정완료</PortfolioCard.Button>
                                </>
                            )
                            : <PortfolioCard.Button onClick={() => setEdit(true)}>수정</PortfolioCard.Button>}
                    </PortfolioCard.ButtonWrapper>
                )
            }
        </PortfolioCard.PortfolioCardWrapper>
    )
}

export default LicenseCard;