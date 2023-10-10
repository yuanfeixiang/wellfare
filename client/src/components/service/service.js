import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

// image

// store
import { getService } from "../../store/modules/service";

function Service() {
  const dispatch = useDispatch();

  const { serviceArray } = useSelector((state) => state.service);

  return (
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
                {a.servNm}
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
      </div>
    </div>
  );
}

export default Service;
