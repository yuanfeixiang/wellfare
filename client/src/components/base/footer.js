import React from "react";
import { Link } from "react-router-dom";

//image
// import twitterLogo from "../../image/utils/snsLogo/twitter.svg";
// import kakaotalkLogo from "../../image/utils/snsLogo/kakaotalk.svg";
// import mediumLogo from "../../image/utils/snsLogo/medium.svg";
import githubLogo from "../../image/util/github.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="serviceArrangeBox">
        <span className="serviceArrange">
          <Link
            to="/service"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            복지서비스
          </Link>
        </span>
        <span className="serviceArrange">
          <Link
            to="/map"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            복지지도
          </Link>
        </span>
        <span className="serviceArrange">
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
        </span>
        <a
          className="footerLogoIcon"
          href="https://github.com/yuanfeixiang/wellfare"
          target="_blank"
        >
          <img className="footerLogoImage" src={githubLogo} />
        </a>
      </div>
      <div className="copyright">
        Copyright 2023. Wellfare Team. all rights reserved.
      </div>
      {/* <div className="footerLogo">
        <a
          className="footerLogoIcon"
          href="https://github.com/klaychicken"
          target="_blank"
        >
          <img className="footerLogoImage" src={githubLogo} />
        </a>
      </div> */}
    </div>
  );
}

export default Footer;
