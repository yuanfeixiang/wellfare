import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";

import styled from "styled-components";

// slide
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// image

// store
import { getService } from "../../store/modules/service";

// splited page
import Service from "../service/service";
import SearchFilter from "../service/searchFilter";

function Home() {
  const dispatch = useDispatch();

  const StyledSlider = styled(Slider)`
    .slick-slide > div {
      margin: 0 10px;
    }
    .slick-list {
      margin: 0 -10px;
    }

    .slick-dots {
      bottom: -35px;
    }
  `;

  const { serviceArray } = useSelector((state) => state.service);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <>
      <Helmet>
        <title>Wellfare :: 최고의 복지</title>
      </Helmet>
      <SearchFilter />
      <div className="homeBannerContainer">
        <div className="homeBannerBox">
          <div className="homeBannerTitle">서비스 목록</div>
          <Service />
          <div className="homeBannerTitle">즐겨찾기 목록</div>
          <StyledSlider {...settings}>
            {serviceArray.map(function (a, index) {
              return (
                <div className="servicePreview" key={index}>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewServNm`
                    )}
                  >
                    이름 : {a.servNm}
                  </div>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewDeptNm`
                    )}
                  >
                    담당부서 : {a.deptNm}
                  </div>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewLifeArray`
                    )}
                  >
                    생애주기 : {a.lifeArray}
                  </div>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewTrgContent`
                    )}
                  >
                    지원 대상 내용 : {a.trgContent}
                  </div>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewSelContent`
                    )}
                  >
                    선정 기준 내용 : {a.selContent}
                  </div>
                  <div
                    className={classnames(
                      `servicePreviewContent`,
                      `servicePreviewSalContent`
                    )}
                  >
                    급여 서비스 내용 : {a.salContent}
                  </div>
                </div>
              );
            })}
          </StyledSlider>
        </div>
      </div>
    </>
  );
}

export default Home;
