import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

// image
import findImage from "../../../src/image/util/find_gray.png";

// store
import { getService, getGunguArrayList } from "../../store/modules/service";

// splited data

function SearchFilter() {
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
    sidoArray,
    gunguArray,
  } = useSelector((state) => state.service);

  useEffect(() => {
    getServiceListFirst();
  }, []);

  const [age, setAge] = useState(0);
  const [_filterSearchWord, onChangeFilterSearchWord] = useInput(searchWord);
  const [_filterLifeArray, setFilterLifeArray] = useState(lifeArray);
  const [_filterGaguArray, setFilterGaguArray] = useState(gaguArray);
  const [_filterIntrsArray, setFilterIntrsArray] = useState(intrsArray);

  const [sidoValue, setSidoValue] = useState("전체");
  const [gunguValue, setGunguValue] = useState("전체");
  const [sidoShowOptions, setSidoShowOptions] = useState(false);
  const [gunguShowOptions, setGunguShowOptions] = useState(false);

  useEffect(() => {
    if (sidoValue === "전체") return;
    dispatch(
      getGunguArrayList({
        sidoValue: sidoValue,
      })
    );
  }, [sidoValue]);

  async function getServiceList() {
    dispatch(
      getService({
        page: 1,
        sunder: sunder,
        searchWord: _filterSearchWord,
        lifeArray: _filterLifeArray,
        gaguArray: _filterGaguArray,
        intrsArray: _filterIntrsArray,
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
      })
    );
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
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  ></input>
                  <span className="subFilterAgeInputText">세</span>
                </div>
              </div>
              <div className="subFilterAreaContainer">
                <div className="subFilterAreaBox">
                  <span className="subFilterAreaTitle">지역</span>
                  <div
                    className="sidoSelectBox"
                    onClick={() => setSidoShowOptions((prev) => !prev)}
                  >
                    <label className="sidoSelectLabel">{sidoValue}</label>
                    <ul
                      className={
                        sidoShowOptions ? "sidoSelectUlActive" : "sidoSelectUl"
                      }
                      show={sidoShowOptions}
                    >
                      {sidoArrayList.map((data, index) => (
                        <li
                          className={
                            sidoValue === data
                              ? "sidoSelectLiSelected"
                              : "sidoSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={() => {
                            setSidoValue(data);
                            setGunguValue("전체");
                          }}
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="sidoSelectBox"
                    onClick={() =>
                      gunguArrayList.length > 0
                        ? setGunguShowOptions((prev) => !prev)
                        : null
                    }
                  >
                    <label className="sidoSelectLabel">{gunguValue}</label>
                    <ul
                      className={
                        gunguShowOptions ? "sidoSelectUlActive" : "sidoSelectUl"
                      }
                      show={gunguShowOptions}
                    >
                      {gunguArrayList.map((data, index) => (
                        <li
                          className={
                            gunguValue === data
                              ? "sidoSelectLiSelected"
                              : "sidoSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={() => {
                            setGunguValue(data);
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
                  setFilterLifeArray([]);
                  setFilterGaguArray([]);
                  setFilterIntrsArray([]);
                  setAge(0);
                  setSidoValue("전체");
                  setGunguValue("전체");
                }}
              >
                초기화
              </button>
              <button className="subFilterSearchBtn">검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
