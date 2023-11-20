import { useState, useEffect } from "react";

// image
import banner from "../../../src/image/banner/banner.jpg";
import banner2 from "../../../src/image/banner/banner2.svg";
import banner3 from "../../../src/image/banner/banner3.jpg";

function Home_banner() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <div className="homeBannerContainer">
      <div className="homeBannerBox">
        <div className="homeBannerTextContainer">
          <div className="homeBannerTextBox">
            <h1 className="homeBannerText">
              <b id="blackL">쉽고 빠른 안성맞춤 </b>의 <br /> 복지서비스를{" "}
              <br />
              지금 바로
              <b id="pistachioL"> 웰페어 </b>에서 <br />
              만나보세요.
            </h1>
          </div>
        </div>
        <div className="homeBannerImageBox">
          {innerWidth > 767 && innerWidth < 1440 ? (
            <img className="homeBannerImage" src={banner2} alt="메인 배너" />
          ) : innerWidth > 300 && innerWidth < 768 ? (
            <img className="homeBannerImage" src={banner3} alt="메인 배너" />
          ) : (
            <img className="homeBannerImage" src={banner} alt="메인 배너" />
          )}
          <a
            className="homeBannerCopyright"
            href={
              innerWidth > 300 && innerWidth < 1440
                ? "https://kr.freepik.com/free-vector/stylized-volunteers-help-charity-and-sharing-hope-isolated-cartoon-abstract-social-team-or-group-with-humanitarian-support-donation-and-aid-community-concept_10581283.htm#query=%EC%82%AC%ED%9A%8C%20%EB%B3%B5%EC%A7%80&position=2&from_view=keyword&track=ais&uuid=78074486-9f79-4db3-b49c-4e4880060d1c"
                : "https://kr.freepik.com/free-vector/stylized-volunteers-help-charity-and-sharing-hope-isolated-flat-vector-illustration-cartoon-abstract-social-team-or-group-with-humanitarian-support-donation-and-aid-community-concept_10174107.htm#query=%EB%B3%B5%EC%A7%80%EC%84%BC%ED%84%B0&position=22&from_view=search&track=ais&uuid=b8020228-a412-4362-8311-8831b39e53d8"
            }
            target="_blank"
            rel="noreferrer"
          >
            Designed by pch.vector / Freepik
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home_banner;
