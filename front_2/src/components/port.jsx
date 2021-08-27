import React from "react";
import axios from "axios";

const Portfolio = () => {
  async function getUserInfo(e) {
    e.preventDefault();
    const response = await axios.get(`http://127.0.0.1:5000/elicer/${user}`);
    if (response.data.result === "success") user = response.data.data;
    return user;
  }
  return (
    <div data-id={user.id}>
      <div>
        <span>{user.name}</span>
        <p>{user.description ? user.description : "한 줄 소개"}</p>
      </div>
    </div>
  );
};

export default Portfolio;
