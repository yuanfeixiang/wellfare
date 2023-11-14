import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import styled from "styled-components";

// slide
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// image
import star_yellow from "../../image/util/star_yellow.png";
import empty_file from "../../image/util/empty_file.png";

// store
import { updateFavorite } from "../../store/modules/favorite";

// splited page

function Favorite() {
  const dispatch = useDispatch();

  const StyledSlider = styled(Slider)`
    .slick-slide > div {
      margin: 50px 40px;
    }

    .slick-list {
      margin: -50px -40px;
    }
  `;

  const { centralFavoriteArray, localFavoriteArray } = useSelector(
    (state) => state.favorite
  );

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dotsClass: "dots_custom",
  };

  return (
    <>
      <div className="favoritePreviewContainer">
        <div className="favoritePreviewBox">
          <div className="favoriteTitleBox">
            <span className="favoriteTitle">
              중앙부처 <b className="favoriteTitleOrangeM"> 즐겨찾기 </b> 목록
            </span>
          </div>
          <div className="darkGray1600UnderBar"></div>
          {centralFavoriteArray.length === 0 ? (
            <div className="noFavoriteItemContainer">
              <div className="noFavoriteItemIconBox">
                <img className="image100" src={empty_file} alt="빈상자" />
              </div>
              <div className="noFavoriteItemTitleBox">
                <span className="noFavoriteItemTitle">
                  등록된 즐겨찾기가 없습니다.
                </span>
              </div>
              <div className="noFavoriteItemBtnBox">
                <button className="noFavoriteItemBtn">
                  <Link
                    to="/service"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    추가하러 가기
                  </Link>
                </button>
              </div>
            </div>
          ) : centralFavoriteArray.length < 4 ? (
            <div className="favoritePreviewContentContainer">
              {centralFavoriteArray.map(function (a, index) {
                return (
                  <div className="servicePreviewContentContainer">
                    <div className="servicePreviewContentBox">
                      <div className="servicePreviewStatusContainter">
                        <div className="servicePreviewStatusBox">
                          {a.lifeArray != null
                            ? a.lifeArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data.replace(/(\s*)/g, "")}
                                  </div>
                                ))
                            : ""}
                          {a.gaguArray
                            ? a.gaguArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                          {a.intrsArray
                            ? a.intrsArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                        </div>
                        <div className="servicePreviewFavoriteBox">
                          <div className="servicePreviewFavoriteBtnBox">
                            <img
                              src={star_yellow}
                              className="image100"
                              alt="즐겨찾기 버튼"
                              onClick={() => dispatch(updateFavorite(a))}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewServNm`
                        )}
                      >
                        {a.servNm}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewTrgContent`
                        )}
                      >
                        {a.trgContent}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewDeptNm`
                        )}
                      >
                        · 담당부서 : {a.deptNm}
                      </div>
                    </div>
                    <div className="servicePreviewContentBtnBox">
                      <Link
                        to={"/eachService/" + a.servId}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <button className="servicePreviewContentBtn">
                          자세히 보기
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <StyledSlider {...settings}>
              {centralFavoriteArray.map(function (a, index) {
                return (
                  <div className="servicePreviewContentContainer">
                    <div className="servicePreviewContentBox">
                      <div className="servicePreviewStatusContainter">
                        <div className="servicePreviewStatusBox">
                          {a.lifeArray != null
                            ? a.lifeArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data.replace(/(\s*)/g, "")}
                                  </div>
                                ))
                            : ""}
                          {a.gaguArray
                            ? a.gaguArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                          {a.intrsArray
                            ? a.intrsArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                        </div>
                        <div className="servicePreviewFavoriteBox">
                          <div className="servicePreviewFavoriteBtnBox">
                            <img
                              src={star_yellow}
                              className="image100"
                              alt="즐겨찾기 버튼"
                              onClick={() => dispatch(updateFavorite(a))}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewServNm`
                        )}
                      >
                        {a.servNm}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewTrgContent`
                        )}
                      >
                        {a.trgContent}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewDeptNm`
                        )}
                      >
                        · 담당부서 : {a.deptNm}
                      </div>
                    </div>
                    <div className="servicePreviewContentBtnBox">
                      <Link
                        to={"/eachService/" + a.servId}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <button className="servicePreviewContentBtn">
                          자세히 보기
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </StyledSlider>
          )}
        </div>
      </div>
      <div className="favoritePreviewContainer2">
        <div className="favoritePreviewBox">
          <div className="favoriteTitleBox">
            <span className="favoriteTitle">
              지자체 <b className="favoriteTitleOrangeM"> 즐겨찾기 </b> 목록
            </span>
          </div>
          <div className="darkGray1600UnderBar"></div>
          {localFavoriteArray.length === 0 ? (
            <div className="noFavoriteItemContainer">
              <div className="noFavoriteItemIconBox">
                <img className="image100" src={empty_file} alt="빈상자" />
              </div>
              <div className="noFavoriteItemTitleBox">
                <span className="noFavoriteItemTitle">
                  등록된 즐겨찾기가 없습니다.
                </span>
              </div>
              <div className="noFavoriteItemBtnBox">
                <button className="noFavoriteItemBtn">
                  <Link
                    to="/service"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    추가하러 가기
                  </Link>
                </button>
              </div>
            </div>
          ) : localFavoriteArray.length < 4 ? (
            <div className="favoritePreviewContentContainer">
              {localFavoriteArray.map(function (a, index) {
                return (
                  <div className="servicePreviewContentContainer">
                    <div className="servicePreviewContentBox">
                      <div className="servicePreviewStatusContainter">
                        <div className="servicePreviewStatusBox">
                          {a.lifeArray != null
                            ? a.lifeArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data.replace(/(\s*)/g, "")}
                                  </div>
                                ))
                            : ""}
                          {a.gaguArray
                            ? a.gaguArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                          {a.intrsArray
                            ? a.intrsArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                        </div>
                        <div className="servicePreviewFavoriteBox">
                          <div className="servicePreviewFavoriteBtnBox">
                            <img
                              src={star_yellow}
                              className="image100"
                              alt="즐겨찾기 버튼"
                              onClick={() => dispatch(updateFavorite(a))}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewServNm`
                        )}
                      >
                        {a.servNm}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewTrgContent`
                        )}
                      >
                        {a.trgContent}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewDeptNm`
                        )}
                      >
                        · 담당부서 : {a.deptNm}
                      </div>
                    </div>
                    <div className="servicePreviewContentBtnBox">
                      <Link
                        to={"/eachService/" + a.servId}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <button className="servicePreviewContentBtn">
                          자세히 보기
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <StyledSlider {...settings}>
              {localFavoriteArray.map(function (a, index) {
                return (
                  <div className="servicePreviewContentContainer">
                    <div className="servicePreviewContentBox">
                      <div className="servicePreviewStatusContainter">
                        <div className="servicePreviewStatusBox">
                          {a.lifeArray != null
                            ? a.lifeArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data.replace(/(\s*)/g, "")}
                                  </div>
                                ))
                            : ""}
                          {a.gaguArray
                            ? a.gaguArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                          {a.intrsArray
                            ? a.intrsArray
                                .split(",")
                                .map((data, index) => (
                                  <div className="servicePreviewStatus">
                                    {data}
                                  </div>
                                ))
                            : ""}
                        </div>
                        <div className="servicePreviewFavoriteBox">
                          <div className="servicePreviewFavoriteBtnBox">
                            <img
                              src={star_yellow}
                              className="image100"
                              alt="즐겨찾기 버튼"
                              onClick={() => dispatch(updateFavorite(a))}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewServNm`
                        )}
                      >
                        {a.servNm}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewTrgContent`
                        )}
                      >
                        {a.trgContent}
                      </div>
                      <div
                        className={classnames(
                          `servicePreviewContent`,
                          `servicePreviewDeptNm`
                        )}
                      >
                        · 담당부서 : {a.deptNm}
                      </div>
                    </div>
                    <div className="servicePreviewContentBtnBox">
                      <Link
                        to={"/eachService/" + a.servId}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <button className="servicePreviewContentBtn">
                          자세히 보기
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </StyledSlider>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;
