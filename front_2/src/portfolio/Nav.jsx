import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/action";

const Navi = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand> Elice Racer </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              메인
            </Link>
            <Link to="/network" className="nav-link">
              네트워크
            </Link>
            <Link className="nav-link" onClick={logoutHandler}>
              로그아웃
            </Link>
            <Link to="/login" className="nav-link">
              로그인
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
