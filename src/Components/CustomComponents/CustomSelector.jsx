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
  const [oldMenuText, setOldMenuText] = useState("Global");

  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText(oldMenuText);
    }
  };

  let handelRegionChange = (e) => {
    if (e.target.value === "") {
      setFilterRegionData([]);
      setshowMenuBar(false);
      setMenuText(e.target.value);
    } else {
      let filterData = regionData.filter((v) =>
        v.toLowerCase().startsWith(e.target.value.toLowerCase())
      );

      setFilterRegionData(filterData);
      setshowMenuBar(true);
      setMenuText(e.target.value);
    }
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
        <style>{`

.selectorMenu {
  font-size: 17px;
 
  background:${colorSelector ? "#424242" : "white"}; 
  position: absolute;
  width: 90%;
  top: 40px;
  left: 10px;
  max-height: 300px;
  overflow: auto;
  z-index: 500;
}
.selectorMenu p {
  padding-bottom: 5px;
  padding-left: 5px;
  padding-top: 7px;
  cursor: pointer;
  color:${colorSelector ? "white" : "black"}; 
}

.selectorMenu p:hover {
 
  background: ${colorSelector ? "black" : "#e7e7e7"}; 
}
.selectorMenu div:hover {
 
  background: ${colorSelector ? "#616161" : "#e7e7e7"}; 
}
.selectorMenu div p:hover {
 
  background: ${colorSelector ? "#616161" : "#e7e7e7"}; 
}



`}</style>
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
