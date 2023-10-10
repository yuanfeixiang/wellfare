// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import classnames from "classnames";

// import styled from "styled-components";

// // slide
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // image

// // store
// import { getFavorite } from "../../store/modules/favorite";

// // splited page

// function Favorite() {
//   const dispatch = useDispatch();

//   const StyledSlider = styled(Slider)`
//     .slick-slide > div {
//       margin: 0 10px;
//     }
//     .slick-list {
//       margin: 0 -10px;
//     }

//     .slick-dots {
//       bottom: -35px;
//     }
//   `;

//   const { favoriteArray } = useSelector((state) => state.favorite);

//   const settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   return (
//     <>
//       <div className="favoriteBannerTitle">즐겨찾기 목록</div>
//       <StyledSlider {...settings}>
//         {favoriteArray.map(function (a, index) {
//           return (
//             <div className="favoritePreview" key={index}>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewServNm`
//                 )}
//               >
//                 이름 : {a.servNm}
//               </div>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewDeptNm`
//                 )}
//               >
//                 담당부서 : {a.deptNm}
//               </div>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewLifeArray`
//                 )}
//               >
//                 생애주기 : {a.lifeArray}
//               </div>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewTrgContent`
//                 )}
//               >
//                 지원 대상 내용 : {a.trgContent}
//               </div>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewSelContent`
//                 )}
//               >
//                 선정 기준 내용 : {a.selContent}
//               </div>
//               <div
//                 className={classnames(
//                   `favoritePreviewContent`,
//                   `favoritePreviewSalContent`
//                 )}
//               >
//                 급여 서비스 내용 : {a.salContent}
//               </div>
//             </div>
//           );
//         })}
//       </StyledSlider>
//     </>
//   );
// }

// export default Favorite;
