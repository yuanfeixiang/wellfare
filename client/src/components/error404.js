import React from "react";
import { Link } from "react-router-dom";

//image
import exclamation from "../image/util/exclamation.png";

function Error404() {
  return (
    <div className="errorContainer">
      <div className="errorBox">
        <div className="errorTitleBox">
          <span className="errorTitle">404 NOT Found</span>
          <div className="errorImgBox">
            <img src={exclamation} className="image100" alt="주의아이콘" />
          </div>
        </div>
        <span className="errorDesc">
          요청하신 페이지를 찾을 수 없습니다. <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </span>
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <button className="errorBtn">홈으로 가기</button>
        </Link>
      </div>
    </div>
  );
}

export default Error404;
