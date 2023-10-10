import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// image
import mainLogo from "../../../src/image/logo/main_logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="nav">
        <div className="logoBox">
          <div className="logo">
            <Link to="/">
              <img
                className={classnames(`header_logo`, `image100`)}
                src={mainLogo}
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="link_logo_nav">
          <nav>
            <ul className="navi_ul">
              <li className="navi_li">
                <Link to="/service">복지 서비스</Link>
              </li>
              <li className="navi_li">
                <Link to="/service">복지 지도</Link>
              </li>
              <li className="navi_li">
                <Link to="/service">즐겨찾기</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
