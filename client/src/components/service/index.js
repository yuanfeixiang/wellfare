import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import classnames from "classnames";

// image

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

  const [_filterSunder, setFilterSunder] = useState(sunder);

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

  useEffect(() => {
    dispatch(
      getService({
        page: 1,
        sunder: _filterSunder,
        searchWord: searchWord,
        lifeArray: lifeArray,
        gaguArray: gaguArray,
        intrsArray: intrsArray,
        age: age,
        sido: sido,
        gungu: gungu,
      })
    );
  }, [_filterSunder]);

  return (
    <>
      <SearchFilter />
      <div className="serviceTabContainer">
        <div className="serviceTabTitleBox">
          <span className="serviceTabTitle">
            총 <b id="greenM">{totalEndNum}</b> 건의 서비스가 있습니다.{" "}
          </span>
        </div>
        <div className="serviceTabTextBoxContainer">
          <div
            className={
              _filterSunder === 0
                ? "selectedServiceTabTextBox"
                : "serviceTabTextBox"
            }
            onClick={() => setFilterSunder(0)}
          >
            <span className="serviceTabText">
              중앙부처 <b id="greenM2">{centralEndNum}</b>
            </span>
          </div>
          <div
            className={
              _filterSunder === 1
                ? "selectedServiceTabTextBox"
                : "serviceTabTextBox"
            }
            onClick={() => setFilterSunder(1)}
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
          totalItemsCount={_filterSunder === 0 ? centralEndNum : localEndNum}
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
