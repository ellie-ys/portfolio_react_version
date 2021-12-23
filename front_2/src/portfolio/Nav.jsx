import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/action";
import { NavStyle, NavBrand, NavItem } from "./NavStyle";

const Navi = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogined);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <NavStyle>
      <NavBrand>
        <span> RACERIN </span>
      </NavBrand>
      <NavItem>
        {isLogin ? (
          <>
            <Link to="/login" className="nav-link" onClick={logoutHandler}>
              Logout
            </Link>
            <Link to="/network" className="nav-link">
              Network
            </Link>
            <Link to="/main" className="nav-link">
              Main
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </NavItem>
    </NavStyle>
  );
};

export default Navi;
