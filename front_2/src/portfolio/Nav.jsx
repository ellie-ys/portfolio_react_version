import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action";

const Navi = (props) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth);

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
                Main
            </Link>
            <Link to="/network" className="nav-link">
                Network
            </Link>
            <Link className="nav-link" onClick={logoutHandler}>
            Logout
            </Link>
            {isLogin ?
            (<Link className="nav-link" onClick={logoutHandler}>Logout</Link>) :
            (<Link to="/login" className="nav-link">Login</Link>)}

            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default Navi;
