import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const Portfolio = () => {
  async function getUserInfo(e) {
    e.preventDefault();
    const response = await axios.get(`http://127.0.0.1:5000/elicer/${userId}`);
    if (response.data.result === "success") userId = response.data.data;
    return userId;
  }

  return (
    <div data-id={userId.id}>
      <div>
        <span>{userId.name}</span>
        <p>{userId.description ? userId.description : "한 줄 소개"}</p>
      </div>
    </div>
  );
};

export default Portfolio;
