import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/action";

const Navi = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const user_id = useSelector((state) => state.user.user_id);

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
            <Link to={`/main?user=${user_id}`} className="nav-link">
              Main
            </Link>
            <Link to="/network" className="nav-link">
              Network
            </Link>
            {isLogin ? (
              <Link to="/" className="nav-link" onClick={logoutHandler}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
