import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const CustomSelector = ({
  filterData,
  colorSelector,
  regionData,
  ...props
}) => {
  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("Global");
  const [filterRegionData, setFilterRegionData] = useState([]);
  const [oldMenuText, setOldMenuText] = useState("");

  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText(oldMenuText);
    }
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
    props.updateData(e.target.textContent);
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
                  <p onClick={handelMenuClick} key={index}>
                    {item}
                  </p>
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

export default CustomSelector;
