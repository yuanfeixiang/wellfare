// image
import banner from "../../../src/image/banner/banner.png";
import background from "../../../src/image/banner/background.png";
import welfare from "../../../src/image/banner/welfare.png";
import test from "../../../src/image/banner/test.png";
import arrow from "../../../src/image/util/down_arrow.png";

function Home_banner() {
  return (
    <div className="homeBannerContainer">
      <div className="homeBannerBox">
        <div className="homeBannerTextContainer">
          <div className="homeBannerTextBox">
            <h1 className="homeBannerText">
              최고의 복지 <br /> Wellfare에서 <br /> 안성맞춤의 서비스를
              만나보세요.
            </h1>
          </div>
          <button
            className="homeBannerBtnBox"
            onClick={() => {
              let clientHeight =
                window.scrollY > 100
                  ? document.querySelector(".change_header").clientHeight
                  : document.querySelector(".original_header").clientHeight;
              window.scrollTo({
                top: window.innerHeight - clientHeight,
                behavior: "smooth",
              });
            }}
          >
            <img className="homeBannerBtn" src={arrow} alt="아래 화살표" />
          </button>
        </div>
        <div className="homeBannerImageBox">
          <img className="homeBannerImage" src={test} alt="메인 배너" />
        </div>
      </div>
    </div>
  );
}

export default Home_banner;
