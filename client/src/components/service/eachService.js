import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// store
import { getEachService } from "../../store/modules/service";
import { updateFavorite } from "../../store/modules/favorite";

// image
import star_white from "../../image/util/star_white.png";
import star_yellow from "../../image/util/star_yellow.png";
import back from "../../image/util/back.png";
import square from "../../image/util/square.png";

function EachService() {
  const dispatch = useDispatch();
  const { servId } = useParams();

  const { selectedServiceArray, detailArrayList } = useSelector(
    (state) => state.service
  );
  const { centralFavoriteArray, localFavoriteArray } = useSelector(
    (state) => state.favorite
  );

  const [tabNum, setTabNum] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    dispatch(getEachService({ servId: servId }));
  }, []);

  useEffect(() => {
    let now = new Date();
    let nowYear = now.getFullYear();
    setYear(nowYear);
  }, []);

  return (
    <>
      <div className="eachServiceMainBackContainer">
        <div className="eachServiceMainBackBox">
          <Link
            to="/service"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="eachServiceMainBackImgBox">
              <img src={back} className="image100" alt="뒤로가기버튼" />
            </div>
          </Link>
          <Link
            to="/service"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="eachServiceMainBackTextBox">
              <span className="eachServiceMainBackText">뒤로가기</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="eachServiceMainContainer">
        <div className="eachServiceMainBox">
          <div className="eachServiceMainStatusContainer">
            <div className="eachServiceMainStatusBox">
              {selectedServiceArray.sunder === 0 ? (
                <div className="eachServiceMainStatus">중앙부처 복지사업</div>
              ) : (
                <div className="eachServiceMainStatus">지자체 복지사업</div>
              )}
              {selectedServiceArray.lifeArray != null
                ? selectedServiceArray.lifeArray
                    .split(",")
                    .map((data, index) => (
                      <div className="eachServiceMainStatus">
                        {data.replace(/(\s*)/g, "")}
                      </div>
                    ))
                : ""}
              {selectedServiceArray.gaguArray
                ? selectedServiceArray.gaguArray
                    .split(",")
                    .map((data, index) => (
                      <div className="eachServiceMainStatus">{data}</div>
                    ))
                : ""}
              {selectedServiceArray.intrsArray
                ? selectedServiceArray.intrsArray
                    .split(",")
                    .map((data, index) => (
                      <div className="eachServiceMainStatus">{data}</div>
                    ))
                : ""}
            </div>
            <div className="eachServiceMainFavoriteBox">
              <div className="eachServiceMainFavoriteBtnBox">
                <img
                  src={
                    centralFavoriteArray.some(
                      (element) => element.servId === servId
                    ) ||
                    localFavoriteArray.some(
                      (element) => element.servId === servId
                    )
                      ? star_yellow
                      : star_white
                  }
                  className="image100"
                  alt="즐겨찾기 버튼"
                  onClick={() => dispatch(updateFavorite(selectedServiceArray))}
                />
              </div>
            </div>
          </div>
          <div className="eachServiceMainTitleBox">
            <span className="eachServiceTitle">
              {selectedServiceArray.servNm}
            </span>
            {selectedServiceArray.sunder === 1 ? (
              <span className="eachServiceDgst">
                {selectedServiceArray.servDgst}
              </span>
            ) : (
              ""
            )}
          </div>
          {selectedServiceArray.sunder === 0 ? (
            <table className="eachServiceMainTable">
              <thead className="eachServiceMainTableThead">
                <tr className="eachServiceMainTableTr">
                  <th className="eachServiceMainTableTheadTd">기준연도</th>
                  <th className="eachServiceMainTableTheadTd">담당부서</th>
                </tr>
              </thead>
              <tbody className="eachServiceMainTableTbody">
                <tr className="eachServiceMainTableTr">
                  <td className="eachServiceMainTableTbodyTd">{year}</td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.deptNm}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="eachServiceMainTable">
              <thead className="eachServiceMainTableThead">
                <tr className="eachServiceMainTableTr">
                  <th className="eachServiceMainTableTheadTd">담당부서</th>
                  <th className="eachServiceMainTableTheadTd">시/도</th>
                  <th className="eachServiceMainTableTheadTd">구/군/시</th>
                  <th className="eachServiceMainTableTheadTd">지원주기</th>
                  <th className="eachServiceMainTableTheadTd">제공유형</th>
                  <th className="eachServiceMainTableTheadTd">신청방법</th>
                </tr>
              </thead>
              <tbody className="eachServiceMainTableTbody">
                <tr className="eachServiceMainTableTr">
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.deptNm ?? "-"}
                  </td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.sido ?? "-"}
                  </td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.gungu ?? "-"}
                  </td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.aplPrd ?? "-"}
                  </td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.proTyp ?? "-"}
                  </td>
                  <td className="eachServiceMainTableTbodyTd">
                    {selectedServiceArray.aplWayNm ?? "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="eachServiceTabContainer">
        <div className="eachServiceTabTextBoxContainer">
          <div
            className={
              tabNum === 0
                ? "selectedEachServiceTabTextBox"
                : "eachServiceTabTextBox"
            }
            onClick={() => setTabNum(0)}
          >
            <span
              className={
                tabNum === 0
                  ? "selectedEachServiceTabText"
                  : "eachServiceTabText"
              }
            >
              지원대상
            </span>
          </div>
          <div
            className={
              tabNum === 1
                ? "selectedEachServiceTabTextBox"
                : "eachServiceTabTextBox"
            }
            onClick={() => setTabNum(1)}
          >
            <span
              className={
                tabNum === 1
                  ? "selectedEachServiceTabText"
                  : "eachServiceTabText"
              }
            >
              선정기준
            </span>
          </div>
          <div
            className={
              tabNum === 2
                ? "selectedEachServiceTabTextBox"
                : "eachServiceTabTextBox"
            }
            onClick={() => setTabNum(2)}
          >
            <span
              className={
                tabNum === 2
                  ? "selectedEachServiceTabText"
                  : "eachServiceTabText"
              }
            >
              서비스내용
            </span>
          </div>
          <div
            className={
              tabNum === 3
                ? "selectedEachServiceTabTextBox"
                : "eachServiceTabTextBox"
            }
            onClick={() => setTabNum(3)}
          >
            <span
              className={
                tabNum === 3
                  ? "selectedEachServiceTabText"
                  : "eachServiceTabText"
              }
            >
              추가내용
            </span>
          </div>
        </div>
        <div className="eachServiceInfoContainer">
          <div className="eachServiceInfoBox">
            {tabNum === 0 ? (
              <>
                <div className="eachServiceInfoTitleBox">
                  <div className="eachServiceInfoTitleImg">
                    <img src={square} className="image100" alt="리스트도형" />
                  </div>
                  <span className="eachServiceInfoTitle">지원대상</span>
                </div>
                <div className="eachServiceInfoDescBox">
                  <span className="eachServiceInfoDesc">
                    {selectedServiceArray.trgContent}
                  </span>
                </div>
              </>
            ) : tabNum === 1 ? (
              <>
                <div className="eachServiceInfoTitleBox">
                  <div className="eachServiceInfoTitleImg">
                    <img src={square} className="image100" alt="리스트도형" />
                  </div>
                  <span className="eachServiceInfoTitle">선정기준</span>
                </div>
                <div className="eachServiceInfoDescBox">
                  <span className="eachServiceInfoDesc">
                    {selectedServiceArray.selContent}
                  </span>
                </div>
              </>
            ) : tabNum === 2 ? (
              <>
                <div className="eachServiceInfoTitleBox">
                  <div className="eachServiceInfoTitleImg">
                    <img src={square} className="image100" alt="리스트도형" />
                  </div>
                  <span className="eachServiceInfoTitle">서비스내용</span>
                </div>
                <div className="eachServiceInfoDescBox">
                  <span className="eachServiceInfoDesc">
                    {selectedServiceArray.salContent}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="eachServiceInfo">
                  <div className="eachServiceInfoTitleBox">
                    <div className="eachServiceInfoTitleImg">
                      <img src={square} className="image100" alt="리스트도형" />
                    </div>
                    <span className="eachServiceInfoTitle">
                      문의처 전화번호
                    </span>
                  </div>
                  <div className="eachServiceInfoDescBox">
                    {detailArrayList.map((data, index) => {
                      return (
                        <>
                          {data.servSeCode === "010" ? (
                            <span className="eachServiceInfoDesc">
                              {data.servSeDetailNm}&nbsp;&nbsp;/&nbsp;&nbsp;
                              <b id="deepGreenSmer">
                                {data.servSeDetailContent}
                              </b>
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="eachServiceInfo">
                  <div className="eachServiceInfoTitleBox">
                    <div className="eachServiceInfoTitleImg">
                      <img src={square} className="image100" alt="리스트도형" />
                    </div>
                    <span className="eachServiceInfoTitle">문의사이트</span>
                  </div>
                  <div className="eachServiceInfoDescBox">
                    {detailArrayList.map((data, index) => {
                      return (
                        <>
                          {data.servSeCode === "020" ? (
                            <span className="eachServiceInfoDesc">
                              {data.servSeDetailNm}&nbsp;&nbsp;/&nbsp;&nbsp;
                              <a
                                className="eachServiceInfoDescWeb"
                                href={"https://" + data.servSeDetailContent}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <b id="deepGreenSmer">
                                  {data.servSeDetailContent}
                                </b>
                              </a>
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                {selectedServiceArray.sunder === 1 ? (
                  <>
                    <div className="eachServiceInfo">
                      <div className="eachServiceInfoTitleBox">
                        <div className="eachServiceInfoTitleImg">
                          <img
                            src={square}
                            className="image100"
                            alt="리스트도형"
                          />
                        </div>
                        <span className="eachServiceInfoTitle">신청방법</span>
                      </div>
                      <div className="eachServiceInfoDescBox">
                        <span className="eachServiceInfoDesc">
                          {selectedServiceArray.aplWayContent}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EachService;
