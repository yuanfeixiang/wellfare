import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import Swal from "sweetalert2";

// image
import findImage from "../../../src/image/util/find_gray.png";

// store
import {
  getService,
  getGunguArrayList,
  resetFilter,
} from "../../store/modules/service";

// splited data

function SearchFilter() {
  const SidoRef = useRef();
  const GunguRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", clickCustomSelectBoxOutside);

    return () => {
      document.removeEventListener("mousedown", clickCustomSelectBoxOutside);
    };
  });

  const clickCustomSelectBoxOutside = (event) => {
    if (!SidoRef.current.contains(event.target)) {
      setSidoShowOptions(false);
    }
    if (!GunguRef.current.contains(event.target)) {
      setGunguShowOptions(false);
    }
  };

  const dispatch = useDispatch();

  const {
    page,
    sunder,
    searchWord,
    lifeArrayList,
    gaguArrayList,
    intrsArrayList,
    sidoArrayList,
    gunguArrayList,
    lifeArray,
    gaguArray,
    intrsArray,
    age,
    sido,
    gungu,
  } = useSelector((state) => state.service);

  const [_filterSearchWord, onChangeFilterSearchWord] = useInput(searchWord);
  const [_filterLifeArray, setFilterLifeArray] = useState(lifeArray);
  const [_filterGaguArray, setFilterGaguArray] = useState(gaguArray);
  const [_filterIntrsArray, setFilterIntrsArray] = useState(intrsArray);
  const [_filterAge, onChangeFilterAge] = useInput(age);

  const [_filterSido, setFilterSido] = useState(sido);
  const [_filterGungu, setFilterGungu] = useState(gungu);
  const [sidoShowOptions, setSidoShowOptions] = useState(false);
  const [gunguShowOptions, setGunguShowOptions] = useState(false);

  async function getServiceList() {
    dispatch(
      getService({
        page: 1,
        sunder: sunder,
        searchWord: _filterSearchWord,
        lifeArray: _filterLifeArray,
        gaguArray: _filterGaguArray,
        intrsArray: _filterIntrsArray,
        age: _filterAge,
        sido: _filterSido,
        gungu: _filterGungu,
      })
    );
  }

  async function getServiceListFirst() {
    dispatch(
      getService({
        page: page,
        sunder: sunder,
        searchWord: _filterSearchWord,
        lifeArray: _filterLifeArray,
        gaguArray: _filterGaguArray,
        intrsArray: _filterIntrsArray,
        age: _filterAge,
        sido: _filterSido,
        gungu: _filterGungu,
      })
    );
  }

  useEffect(() => {
    getServiceListFirst();
  }, []);

  useEffect(() => {
    dispatch(
      getGunguArrayList({
        sido: _filterSido,
      })
    );
  }, [dispatch, _filterSido]);

  async function filterReset() {
    let trash = { target: { value: "" } };
    let trash1 = { target: { value: 0 } };
    onChangeFilterSearchWord(trash);
    setFilterLifeArray([]);
    setFilterGaguArray([]);
    setFilterIntrsArray([]);
    onChangeFilterAge(trash1);
    setFilterSido("전체");
    setFilterGungu("전체");
    dispatch(resetFilter());
  }

  return (
    <div className="searchFilterBoxContainer">
      <div className="searchBoxContainer">
        <div className="searchBox">
          <div className="searchIconBox" onClick={() => getServiceList()}>
            <img className="image100" src={findImage} alt="" />
          </div>
          <input
            className="searchInput"
            autocomplete="off"
            name="searchInput"
            value={_filterSearchWord}
            placeholder="검색어 입력"
            onChange={onChangeFilterSearchWord}
            onKeyUp={() => {
              if (window.event.keyCode === 13) {
                getServiceList();
              }
            }}
          ></input>
        </div>
      </div>
      <div className="filterBoxContainer">
        <div className="filterBox">
          <div className="arrayFilterBox">
            <div className="arrayFilterTitleBox">
              <span className="arrayFilterTitle">생애주기</span>
            </div>
            <div className="arrayFilterElementBox">
              {lifeArrayList.map((data, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"lifeArray_" + data.replace(/(\s*)/g, "")}
                      checked={_filterLifeArray.includes(data)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterLifeArray.includes(data)
                          ? setFilterLifeArray(
                            _filterLifeArray.filter(
                              (element) => element !== data
                            )
                          )
                          : setFilterLifeArray([..._filterLifeArray, data])
                      }
                    />
                    <span className="filterElement">
                      {data.replace(/(\s*)/g, "")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arrayFilterBox">
            <div className="arrayFilterTitleBox">
              <span className="arrayFilterTitle">가구상황</span>
            </div>
            <div className="arrayFilterElementBox">
              {gaguArrayList.map((data, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"gaguArray_" + data}
                      checked={_filterGaguArray.includes(data)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterGaguArray.includes(data)
                          ? setFilterGaguArray(
                            _filterGaguArray.filter(
                              (element) => element !== data
                            )
                          )
                          : setFilterGaguArray([..._filterGaguArray, data])
                      }
                    />
                    <span className="filterElement">{data}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arrayFilterBox">
            <div className="arrayFilterTitleBox">
              <span className="arrayFilterTitle">관심주제</span>
            </div>
            <div className="intrsArrayFilterElementBox">
              {intrsArrayList.map((data, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"intrsArray_" + data}
                      checked={_filterIntrsArray.includes(data)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterIntrsArray.includes(data)
                          ? setFilterIntrsArray(
                            _filterIntrsArray.filter(
                              (element) => element !== data
                            )
                          )
                          : setFilterIntrsArray([..._filterIntrsArray, data])
                      }
                    />
                    <span className="filterElement">{data}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="subFilterBoxContainer">
          <div className="subFilterBox">
            <div className="subFilterElementBox">
              <div className="subFilterAgeContainer">
                <span className="subFilterAgeTitle">나이</span>
                <div className="subFilterAgeInputBox">
                  <span className="subFilterAgeInputText">만</span>
                  <input
                    className="subFilterAgeInput"
                    autocomplete="off"
                    name="subFilterAgeInput"
                    placeholder="0"
                    value={_filterAge}
                    onChange={onChangeFilterAge}
                  ></input>
                  <span className="subFilterAgeInputText">세</span>
                </div>
              </div>
              <div className="subFilterAreaContainer">
                <div className="subFilterAreaBox">
                  <span className="subFilterAreaTitle">지역</span>
                  <div
                    className="customSelectBox"
                    ref={SidoRef}
                    onClick={() => {
                      setSidoShowOptions((prev) => !prev);
                    }}
                  >
                    <span className="customSelectSpan">{_filterSido}</span>
                    <ul
                      className={
                        sidoShowOptions
                          ? "customSelectUlActive"
                          : "customSelectUl"
                      }
                      show={sidoShowOptions}
                    >
                      {sidoArrayList.map((data, index) => (
                        <li
                          className={
                            _filterSido === data
                              ? "customSelectLiSelected"
                              : "customSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={() => {
                            setFilterSido(data);
                            setFilterGungu("전체");
                          }}
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="customSelectBox"
                    ref={GunguRef}
                    onClick={() => {
                      if (gunguArrayList.length > 1) {
                        setGunguShowOptions((prev) => !prev);
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: "warning",
                          title: "시, 도를 먼저 선택해주세요",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    }}
                  >
                    <span className="customSelectSpan">{_filterGungu}</span>
                    <ul
                      className={
                        gunguShowOptions
                          ? "customSelectUlActive"
                          : "customSelectUl"
                      }
                      show={gunguShowOptions}
                    >
                      {gunguArrayList.map((data, index) => (
                        <li
                          className={
                            _filterGungu === data
                              ? "customSelectLiSelected"
                              : "customSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={() => {
                            setFilterGungu(data);
                          }}
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="subFilterBtnContainer">
              <button
                className="subFilterResetBtn"
                onClick={() => {
                  filterReset();
                }}
              >
                초기화
              </button>
              <button
                className="subFilterSearchBtn"
                onClick={() => {
                  getServiceList();
                }}
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
