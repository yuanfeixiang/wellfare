import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import useInput from "../../hooks/useInput";

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

  const { page, sunder, searchWord, lifeArray, gaguArray, intrsArray } =
    useSelector((state) => state.service);

  useEffect(() => {
    getServiceListFirst();
  }, []);

  let [age, setAge] = useState(0);
  let [sido, setSido] = useState("전체");
  const [_filterSearchWord, onChangeFilterSearchWord] = useInput(searchWord);
  const [_filterLifeArray, setFilterLifeArray] = useState(lifeArray);
  const [_filterGaguArray, setFilterGaguArray] = useState(gaguArray);
  const [_filterIntrsArray, setFilterIntrsArray] = useState(intrsArray);
  const [_filterSido, onChangeFilterSido] = useInput(sido);

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

  const selectBoxElements = document.querySelectorAll(".select");

  function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
  }

  function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    selectedElement.textContent = optionElement.textContent;
  }

  selectBoxElements.forEach((selectBoxElement) => {
    selectBoxElement.addEventListener("click", function (e) {
      const targetElement = e.target;
      const isOptionElement = targetElement.classList.contains("option");

      if (isOptionElement) {
        selectOption(targetElement);
      }

      toggleSelectBox(selectBoxElement);
    });
  });

  document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect =
      targetElement.classList.contains("select") ||
      targetElement.closest(".select");

    if (isSelect) {
      return;
    }

    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach((boxElement) => {
      boxElement.classList.remove("active");
    });
  });

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
                  <div class="select">
                    <div class="selected">
                      <div class="selected-value">{sido}</div>
                      <div class="arrow"></div>
                    </div>
                    <ul>
                      {sidoArrayList.map((a, index) => (
                        <li className="option" key={index}>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <select
                    className="subFilterAreaSelect"
                    onChange={(e) => setSido(e.target.value)}
                    value={sido}
                  >
                    {sidoArrayList.map((a, index) => (
                      <option
                        className="subFilterAreaOption"
                        value={a}
                        key={index}
                      >
                        {a}
                      </option>
                    ))}
                  </select>
                  <select
                    className="subFilterAreaSelect"
                    onChange={(e) => setSido(e.target.value)}
                    value={sido}
                  >
                    {sidoArrayList.map((a, index) => (
                      <option value={a} key={index}>
                        {a}
                      </option>
                    ))}
                  </select> */}
                </div>
              </div>
            </div>
            <div className="subFilterBtnContainter">
              <button>초기화</button>
              <button>검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
