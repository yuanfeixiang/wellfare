import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// image
import mainLogo from "../../../src/image/logo/main_logo.png";

function Header() {
  // state
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <>
      <div
        className={scrollPosition < 100 ? "original_header" : "change_header"}
      >
        <div className="nav">
          <div className="logoBox">
            <div
              className="logo"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
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
                  <Link
                    to="/service"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    복지 서비스
                  </Link>
                </li>
                <li className="navi_li">
                  <Link
                    to="/map"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    복지 지도
                  </Link>
                </li>
                <li className="navi_li">
                  <Link
                    to="/favorite"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    즐겨찾기
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
