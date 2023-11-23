import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

// image
import phone from '../../image/util/phone.png';
import searchFilter from '../../image/util/searchFilter.png';
import searchResult from '../../image/util/searchResult.png';

// store

// splited page
import HomeBanner from './home_banner';

function Home() {
  const homeServiceIntroPhoneContainer = useRef(null);

  const handleScroll = () => {
    if (window.innerHeight - homeServiceIntroPhoneContainer.current.getBoundingClientRect().bottom <= 0 || homeServiceIntroPhoneContainer.current.getBoundingClientRect().top <= 0) {
      if (window.innerHeight - homeServiceIntroPhoneContainer.current.getBoundingClientRect().bottom <= 0) {
        homeServiceIntroPhoneContainer.current.style.transform = `translate3d(calc(((${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw) * 1) - (${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw)), 0px, 0px)`;

      } else {
        homeServiceIntroPhoneContainer.current.style.transform = `translate3d(calc(((${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw) * 0) - (${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw)), 0px, 0px)`;
      }
      return;
    }

    homeServiceIntroPhoneContainer.current.style.transform = `translate3d(calc(((${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw) * ${(window.innerHeight - (window.innerHeight - homeServiceIntroPhoneContainer.current.getBoundingClientRect().top)) / (homeServiceIntroPhoneContainer.current.getBoundingClientRect().bottom)}) - (${homeServiceIntroPhoneContainer.current.getBoundingClientRect().width}px - 100vw)), 0px, 0px)`;
  };

  useEffect(() => {
    if (homeServiceIntroPhoneContainer.current) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [homeServiceIntroPhoneContainer]);

  return (
    <>
      <Helmet>
        <title>Wellfare :: 최고의 복지</title>s
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
            <span className="homeServiceIntroTitle">복지서비스 조회</span>
          </div>
          <div className="homeSeriveIntroDescBox">
            <span className="homeServiceIntroDesc">
              무관심했던 복지서비스, <br /> 빠짐없이 조회하고 <br /> 관리하세요.
            </span>
          </div>
          <div
            className="homeServiceIntroPhoneContainer"
            ref={homeServiceIntroPhoneContainer}
          >
            <div className="homeServiceIntroLeftPhoneBox">
              <img
                className="homeServiceIntroLeftPhoneImg"
                src={searchFilter}
                alt="검색필터화면"
              />
              <img
                src={phone}
                className="homeServiceIntroLeftPhone"
                alt="왼쪽 핸드폰"
              />
            </div>
            <div className="homeServiceIntroRightPhoneBox">
              <img
                className="homeServiceIntroRightPhoneImg"
                src={searchResult}
                alt="검색필터화면"
              />
              <img
                src={phone}
                className="homeServiceIntroRightPhone"
                alt="오른쪽 핸드폰"
              />
            </div>
          </div>
          <div className="homeSeriveIntroSubDescBox">
            <span className="homeServiceIntroSubDesc">
              원하는 서비스를 저장하세요.
              <br />
              로그인 없이도 나만의 서비스를 <br />
              모아 볼 수 있어요.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
