import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import classnames from "classnames";

// image

// store
import { getService } from "../../store/modules/service";

// splited page
import SearchFilter from "../service/searchFilter";

function Service() {
  const dispatch = useDispatch();

  const {
    page,
    sunder,
    searchWord,
    lifeArray,
    gaguArray,
    intrsArray,
    endNum,
    serviceArray,
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
      })
    );
  }

  return (
    <>
      <SearchFilter />
      <div className="servicePreviewContainer">
        <div className="servicePreviewBox">
          {serviceArray.map(function (a, index) {
            return (
              <div className="servicePreview">
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
                    `servicePreviewTrgContent`
                  )}
                >
                  지원 대상 내용 : {a.trgContent}
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
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={endNum}
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
