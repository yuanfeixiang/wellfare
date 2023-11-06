import React, { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

// hooks
import useLocation from "../../hooks/useLocation";

// image
import findImage from "../../../src/image/util/find_gray.png";
import close from "../../../src/image/util/close.png";

const { kakao } = window;

function KMap() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [clocation, setClocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  var coord = null;

  //
  useEffect(() => {
    if (location) {
      coord = new kakao.maps.LatLng(location.latitude, location.longitude);
      const geocoder = new kakao.maps.services.Geocoder();

      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setClocation(result[0].address_name);
        }
      };
      geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), callback);
    }
  }, [location]);

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // 검색어 엔터 처리 핸들러
  const handleSearchSubmit = () => {
    if (map && searchQuery) {
      const ps = new kakao.maps.services.Places([map]);

      ps.keywordSearch(
        searchQuery + "근처 복지시설",
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            let newMarkers = [];

            for (var i = 0; i < data.length; i++) {
              newMarkers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x,
                },
                content: data[i].place_name,
                address: data[i].road_address_name,
                phone: data[i].phone,
                link: data[i].place_url,
              });
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            setMarkers(newMarkers);
            map.setBounds(bounds);
          }
        }
      );
    }
  };

  //
  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      clocation + "근처 복지시설",
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
              address: data[i].road_address_name,
              phone: data[i].phone,
              link: data[i].place_url,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      }
    );
  }, [clocation]);

  return (
    <div className="searchMapContainer">
      <div className="searchBoxContainer">
        <div className="searchBox">
          <div className="searchIconBox" onClick={() => handleSearchSubmit()}>
            <img className="image100" src={findImage} alt="" />
          </div>
          <input
            className="searchInput"
            autocomplete="off"
            name="searchInput"
            value={searchQuery}
            placeholder="(지역명,동,역명) 입력"
            onChange={handleSearchChange}
            onKeyUp={() => {
              if (window.event.keyCode === 13) {
                handleSearchSubmit();
              }
            }}
          />
        </div>
      </div>
      {location ? (
        <Map
          className="showMapContainer"
          center={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <>
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => {
                  setInfo(marker);
                  setIsOpen(marker.content);
                }}
              />
              {info &&
                info.content === marker.content &&
                isOpen === marker.content && (
                  <CustomOverlayMap position={marker.position}>
                    <div className="showMapWrap">
                      <div className="showMapInfo">
                        <div className="showMapTitleBox">
                          <span className="showMapTitle">{marker.content}</span>
                          <div className="showMapCloseBox">
                            <img
                              className="image100"
                              src={close}
                              onClick={() => setIsOpen(null)}
                              alt="닫기"
                            />
                          </div>
                        </div>
                        <div className="showMapBody">
                          <div className="showMapDesc">
                            <div className="showMapAddress">
                              address: {marker.address}
                            </div>
                            <div className="showMapPhone">
                              call: {marker.phone}
                            </div>
                            <a
                              href={marker.link}
                              target="_blank"
                              className="showMapLink"
                              rel="noreferrer"
                            >
                              {marker.link}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomOverlayMap>
                )}
            </>
          ))}
        </Map>
      ) : (
        <div className="showMapLoadingContainer">
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
}
export default KMap;
