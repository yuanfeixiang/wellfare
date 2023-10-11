import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

// image
import findImage from "../../../src/image/util/find_gray.png";
import ageImage from "../../../src/image/util/age.png";
import familyImage from "../../../src/image/util/family.png";
import instImage from "../../../src/image/util/inst.png";

// store
import { getService } from "../../store/modules/service";

// splited data
import lifeArrayList from "../../data/lifeArray";
import intrsArrayList from "../../data/intrsArray";
import gaguArrayList from "../../data/gaguArray";
import sidoArrayList from "../../data/sidoArray";

function SearchFilter() {
  const dispatch = useDispatch();

  const {
    page,
    sunder,
    searchWord,
    lifeArray,
    gaguArray,
    intrsArray,
    sidoArray,
    gunguArray,
  } = useSelector((state) => state.service);

  useEffect(() => {
    getServiceListFirst();
  }, []);

  let [age, setAge] = useState(0);
  let [sido, setSido] = useState("전체");
  const [_filterSearchWord, onChangeFilterSearchWord] = useInput(searchWord);
  const [_filterLifeArray, setFilterLifeArray] = useState(lifeArray);
  const [_filterGaguArray, setFilterGaguArray] = useState(gaguArray);
  const [_filterIntrsArray, setFilterIntrsArray] = useState(intrsArray);

  const [currentValue, setCurrentValue] = useState("전체");
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute("value"));
  };

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
              <span className="arrayFilterTitle">나이대</span>
              <div className="arrayFilterTitleIconBox">
                <img className="image100" src={ageImage} alt="" />
              </div>
            </div>
            <div className="arrayFilterElementBox">
              {lifeArrayList.map((a, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"lifeArray_" + a.replace(/(\s*)/g, "")}
                      checked={_filterLifeArray.includes(a)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterLifeArray.includes(a)
                          ? setFilterLifeArray(
                              _filterLifeArray.filter(
                                (element) => element !== a
                              )
                            )
                          : setFilterLifeArray([..._filterLifeArray, a])
                      }
                    />
                    <span className="filterElement">
                      {a.replace(/(\s*)/g, "")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arrayFilterBox">
            <div className="arrayFilterTitleBox">
              <span className="arrayFilterTitle">가구상황</span>
              <div className="arrayFilterTitleIconBox">
                <img className="image100" src={familyImage} alt="" />
              </div>
            </div>
            <div className="arrayFilterElementBox">
              {gaguArrayList.map((a, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"gaguArray_" + a}
                      cchecked={_filterGaguArray.includes(a)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterGaguArray.includes(a)
                          ? setFilterGaguArray(
                              _filterGaguArray.filter(
                                (element) => element !== a
                              )
                            )
                          : setFilterGaguArray([..._filterGaguArray, a])
                      }
                    />
                    <span className="filterElement">{a}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="arrayFilterBox">
            <div className="arrayFilterTitleBox">
              <span className="arrayFilterTitle">관심주제</span>
              <div className="arrayFilterTitleIconBox">
                <img className="image100" src={instImage} alt="" />
              </div>
            </div>
            <div className="intrsArrayFilterElementBox">
              {intrsArrayList.map((a, index) => {
                return (
                  <div className="arrayFilterElement" key={index}>
                    <input
                      type="checkbox"
                      name={"intrsArray_" + a}
                      checked={_filterIntrsArray.includes(a)}
                      className="filterCheckBox"
                      onChange={(e) =>
                        _filterIntrsArray.includes(a)
                          ? setFilterIntrsArray(
                              _filterIntrsArray.filter(
                                (element) => element !== a
                              )
                            )
                          : setFilterIntrsArray([..._filterIntrsArray, a])
                      }
                    />
                    <span className="filterElement">{a}</span>
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
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <label className="sidoSelectLabel">{currentValue}</label>
                    <ul
                      className={
                        showOptions ? "sidoSelectUlActive" : "sidoSelectUl"
                      }
                      show={showOptions}
                    >
                      {sidoArrayList.map((data, index) => (
                        <li
                          className={
                            currentValue === data
                              ? "sidoSelectLiSelected"
                              : "sidoSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={handleOnChangeSelectValue}
                        >
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="sidoSelectBox"
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <label className="sidoSelectLabel">{currentValue}</label>
                    <ul
                      className={
                        showOptions ? "sidoSelectUlActive" : "sidoSelectUl"
                      }
                      show={showOptions}
                    >
                      {sidoArrayList.map((data, index) => (
                        <li
                          className={
                            currentValue === data
                              ? "sidoSelectLiSelected"
                              : "sidoSelectLi"
                          }
                          key={index}
                          value={data}
                          onClick={handleOnChangeSelectValue}
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
              <button className="subFilterResetBtn">초기화</button>
              <button className="subFilterSearchBtn">검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
