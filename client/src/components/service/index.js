import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import classnames from "classnames";

// image
import star_white from "../../image/util/star_white.png";

// store
import { getService } from "../../store/modules/service";

// splited page
import SearchFilter from "./searchFilter";

function Service() {
  const dispatch = useDispatch();

  const {
    page,
    sunder,
    searchWord,
    lifeArray,
    gaguArray,
    intrsArray,
    centralEndNum,
    localEndNum,
    totalEndNum,
    serviceArray,
    age,
    sido,
    gungu,
  } = useSelector((state) => state.service);

  const handlePageChange = (newPage) => {
    if (page === newPage) return;
    changePage(newPage);
  };

  async function changePage(newNum) {
    dispatch(
      getService({
        page: newNum,
        sunder: sunder,
        searchWord: searchWord,
        lifeArray: lifeArray,
        gaguArray: gaguArray,
        intrsArray: intrsArray,
        age: age,
        sido: sido,
        gungu: gungu,
      })
    );
  }

  async function changeServiceArrayWithSunder(data) {
    dispatch(
      getService({
        page: 1,
        sunder: data,
        searchWord: searchWord,
        lifeArray: lifeArray,
        gaguArray: gaguArray,
        intrsArray: intrsArray,
        age: age,
        sido: sido,
        gungu: gungu,
      })
    );
  }

  return (
    <>
      <SearchFilter />
      <div className="serviceTabContainer">
        <div className="serviceTabTitleBox">
          <span className="serviceTabTitle">
            총 &nbsp; <b id="greenM">{totalEndNum}</b> &nbsp; 건의 서비스가
            있습니다.{" "}
          </span>
        </div>
        <div className="serviceTabTextBoxContainer">
          <div
            className={
              sunder === 0 ? "selectedServiceTabTextBox" : "serviceTabTextBox"
            }
            onClick={() => changeServiceArrayWithSunder(0)}
          >
            <span className="serviceTabText">
              중앙부처 <b id="greenM2">{centralEndNum}</b>
            </span>
          </div>
          <div
            className={
              sunder === 1 ? "selectedServiceTabTextBox" : "serviceTabTextBox"
            }
            onClick={() => changeServiceArrayWithSunder(1)}
          >
            <span className="serviceTabText">
              지자체 <b id="greenM2">{localEndNum}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="servicePreviewContainer">
        <div className="servicePreviewBox">
          {serviceArray.map(function (a, index) {
            return (
              <div className="servicePreviewContentContainer">
                <div className="servicePreviewContentBox">
                  <div className="servicePreviewStatusContainter">
                    <div className="servicePreviewStatusBox">
                      {a.lifeArray != null
                        ? a.lifeArray
                            .split(",")
                            .map((data, index) => (
                              <div className="servicePreviewStatus">{data}</div>
                            ))
                        : ""}
                      {a.gaguArray
                        ? a.gaguArray
                            .split(",")
                            .map((data, index) => (
                              <div className="servicePreviewStatus">{data}</div>
                            ))
                        : ""}
                      {a.intrsArray
                        ? a.intrsArray
                            .split(",")
                            .map((data, index) => (
                              <div className="servicePreviewStatus">{data}</div>
                            ))
                        : ""}
                    </div>
                    <div className="servicePreviewFavoriteBox">
                      <div className="servicePreviewFacvoriteBtnBox">
                        <img
                          src={star_white}
                          className="image100"
                          alt="즐겨찾기 버튼"
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
                  <button className="servicePreviewContentBtn">
                    자세히 보기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={sunder === 0 ? centralEndNum : localEndNum}
          pageRangeDisplayed={5}
          firstPageText={"<<"}
          lastPageText={">>"}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Service;
