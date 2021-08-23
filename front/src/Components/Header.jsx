import React from "react";

import { NavLink } from 'reactstrap';


function Header() {
    return (
      <div className="header">
      <h3>RacerIn</h3>

      <header>
        <NavLink className="navi-header" href="/">메인</NavLink>

        <NavLink className="navi-header" href="/elicer">네트워크</NavLink>

        <NavLink className="navi-header" href="/logout">로그아웃</NavLink>

      </header>
      </div>
    )
  } 
export default Header;

