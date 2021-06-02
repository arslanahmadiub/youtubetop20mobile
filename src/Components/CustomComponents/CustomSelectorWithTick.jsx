import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
const CustomSelectorWithTick = ({
  filterData,
  colorSelector,
  regionData,
  ...props
}) => {
  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("Global");
  const [filterRegionData, setFilterRegionData] = useState([]);
  const [oldMenuText, setOldMenuText] = useState("");
  const [checkedData, setCheckedData] = useState([]);

  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText(oldMenuText);
    }
    props.getListRegions(checkedData);
  };

  let handelRegionChange = (e) => {
    const p = Array.from(e.target.value.toLowerCase()).reduce(
      (a, v, i) => `${a}[^${e.target.value.toLowerCase().substr(i)}]*?${v}`,
      ""
    );
    const re = RegExp(p);

    let filterData = regionData.filter((v) => v.toLowerCase().match(re));

    setFilterRegionData(filterData);
    setshowMenuBar(true);
    setMenuText(e.target.value);
  };
  let handelMenuFocus = () => {
    if (filterRegionData.length < 1) {
      setFilterRegionData(regionData);
    }
    setMenuText("");
    setshowMenuBar(true);
  };
  let handelSelector = () => {
    if (filterRegionData.length > 0) {
      setshowMenuBar(!showMenuBar);
    } else {
      setFilterRegionData(regionData);
      setshowMenuBar(true);
    }
  };

  let handelMenuClick = (e) => {
    setMenuText(e.target.textContent);
    setshowMenuBar(false);
    setOldMenuText(e.target.textContent);
    // props.updateData(e.target.textContent);
  };

  let getCheckedData = (e) => {
    let sup = checkedData.filter((item) => item === e);

    if (sup.length > 0) {
      setCheckedData(checkedData.filter((item) => item !== sup[0]));
    } else {
      setCheckedData([...checkedData, e]);
    }
  };

  let getFilterData = (e) => {
    let sup = checkedData.filter((item) => item === e);
    if (sup.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayFromSearchRegion}>
      <div id="searchinputmain">
        <input
          className={colorSelector ? "searchInputDark" : "searchInput"}
          value={menuText}
          onChange={handelRegionChange}
          onFocus={handelMenuFocus}
        />
        {showMenuBar && (
          <div className="selectorMenu" style={{ zIndex: "8000" }}>
            {filterRegionData.length > 0 &&
              filterRegionData.map((item, index) => {
                return (
                  <div
                    style={{ display: "flex", border: "1px solid #c4c4c4" }}
                    key={index}
                  >
                    <Checkbox
                      style={{ color: "#3F51B5" }}
                      onChange={() => getCheckedData(item)}
                      checked={getFilterData(item)}
                    />
                    <p onClick={handelMenuClick}>{item}</p>
                  </div>
                );
              })}
          </div>
        )}

        <ExpandMoreIcon
          id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
          onClick={handelSelector}
        />
      </div>
    </ClickAwayListener>
  );
};

export default CustomSelectorWithTick;
