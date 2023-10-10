// image
import banner from "../../../src/image/banner/banner.png";
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
              window.scrollTo({
                top: window.innerHeight - 110,
                behavior: "smooth",
              });
            }}
          >
            <img className="homeBannerBtn" src={arrow} alt="아래 화살표" />
          </button>
        </div>
        <div className="homeBannerImageBox">
          <img className="homeBannerImage" src={banner} alt="메인 배너" />
        </div>
      </div>
    </div>
  );
}

export default Home_banner;
