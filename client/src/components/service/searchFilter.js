import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import useInput from "../../hooks/useInput";

// image
import findImage from "../../../src/image/util/find_gray.png";
import ageImage from "../../../src/image/util/age.png";
import disabledImage from "../../../src/image/util/disabled.png";
// store
import { getService } from "../../store/modules/service";

// splited data
import lifeArrayList from "../../data/lifeArray";
import intrsArrayList from "../../data/intrsArray";
import gaguArrayList from "../../data/gaguArray";

function SearchFilter() {
  const dispatch = useDispatch();

  const { page, sunder, searchWord, lifeArray, gaguArray, intrsArray } =
    useSelector((state) => state.service);

  useEffect(() => {
    getServiceListFirst();
  }, []);

  const [_filterSearchWord, onChangeFilterSearchWord] = useInput(searchWord);
  const [_filterLifeArray, setFilterLifeArray] = useState(lifeArray);
  const [_filterGaguArray, setFilterGaguArray] = useState(gaguArray);
  const [_filterIntrsArray, setFilterIntrsArray] = useState(intrsArray);

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
          <div className="searchIcon" onClick={() => getServiceList()}>
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
              <span className="arrayFilterTitle">
                나이대
              <img className="ageIcon" src={ageImage} alt="나이대 아이콘" 
              />
                </span>
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
              <span className="arrayFilterTitle">가구상황
              <img className="disabledIcon" src={disabledImage} alt="가구상황 아이콘" 
              /></span>
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
      </div>
    </div>
  );
}

export default SearchFilter;
