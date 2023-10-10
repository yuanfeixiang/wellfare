import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";

// image

// store

// splited page
import Home_banner from "./home_banner";
import Service from "../service/service";

function Home() {
  return (
    <>
      <Helmet>
        <title>Wellfare :: 최고의 복지</title>
      </Helmet>
      <Home_banner />
      <div className="homeIntroContainer">
        <span className="homeIntro">
          몰라서 받지 못했던 지원금을 한눈에 조회하고 관리하세요.
          <br />
          세상에서 제일 쉽고 간단한 복지 서비스,
          <br />
          Wellfare와 함께하세요.
        </span>
      </div>
      <div className="homeServiceIntroContainer"></div>
      {/* <div className="homeMainContainer">
        <div className="homeMainBox">
          <div className="homeMainTitle">서비스 목록</div>
          <Service />
        </div>
      </div> */}
    </>
  );
}

export default Home;
