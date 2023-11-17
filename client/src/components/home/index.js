import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";

// image
import phone from "../../image/util/phone.png";

// store

// splited page
import HomeBanner from "./home_banner";

function Home() {
  return (
    <>
      <Helmet>
        <title>Wellfare :: 최고의 복지</title>
      </Helmet>
      <HomeBanner />
      <div className="homeIntroContainer">
        <span className="homeIntro">
          몰라서 받지 못했던 지원금을 한눈에 조회하고 관리하세요.
          <br />
          세상에서 제일 쉽고 간단한 복지 서비스,
          <br />
          Wellfare와 함께하세요.
        </span>
      </div>
      <div className="homeServiceIntroContainer">
        <div className="homeServiceIntroBox">
          <div className="homeServiceIntroTitleBox">
            <span className="homeServiceIntroTitle">복지서비스 검색</span>
          </div>
          <div className="homeServiceIntroLeftPhoneBox">
            <img
              src={phone}
              className="homeServiceIntroLeftPhone"
              alt="왼쪽 핸드폰"
            />
          </div>
          <div className="homeServiceIntroRightPhoneBox">
            <img
              src={phone}
              className="homeServiceIntroRightPhone"
              alt="오른쪽 핸드폰"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
