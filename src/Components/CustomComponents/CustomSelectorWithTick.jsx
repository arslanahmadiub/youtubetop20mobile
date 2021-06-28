import React, { useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
const CustomSelectorWithTick = ({
  filterData,
  colorSelector,
  regionData,
  locationMenuText,
  ...props
}) => {
  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("Global");
  const [filterRegionData, setFilterRegionData] = useState([]);
  const [oldMenuText, setOldMenuText] = useState("");
  const [checkedData, setCheckedData] = useState(["Global"]);

  // useEffect(() => {
  //   if (locationMenuText !== "" && regionData.length > 0) {
  //     let result = regionData.filter((item) => {
  //       return item === locationMenuText;
  //     });
  //     if (result.length > 0) {
  //       setCheckedData([...checkedData, locationMenuText]);
  //       setOldMenuText(menuText);
  //       setMenuText(locationMenuText);
  //     } else {
  //       setMenuText("Global");
  //       setCheckedData([...checkedData, "Global"]);

  //       setOldMenuText(menuText);
  //     }
  //   }
  // }, [locationMenuText]);

  useEffect(() => {
    if (checkedData.length < 1) {
      setMenuText("Global");
    } else {
      var newArray = checkedData.join("-");
      setMenuText(newArray);
    }
  }, [checkedData]);

  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText(oldMenuText);
    }
  };

  useEffect(() => {
    props.updateCountries(menuText);
  }, [menuText]);

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
  };

  let getCheckedData = (e) => {
    let global = ["Global"];

    if (e === "Global") {
      let sup1 = checkedData.filter((item) => item === e);
      if (sup1.length > 0) {
        setCheckedData([]);
      } else {
        setCheckedData(global);
      }
    } else {
      let sup = checkedData.filter((item) => item === e);

      if (sup.length > 0) {
        setCheckedData(checkedData.filter((item) => item !== sup[0]));
      } else {
        let data = [...checkedData];
        const index = data.indexOf("Global");
        if (index > -1) {
          data.splice(index, 1);
        }

        setCheckedData([...data, e]);
      }
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
                      style={{ color: colorSelector ? "black" : "#3F51B5" }}
                      onChange={() => getCheckedData(item)}
                      checked={getFilterData(item)}
                    />
                    <p
                    // onClick={handelMenuClick}
                    >
                      {item}
                    </p>
                  </div>
                );
              })}
          </div>
        )}

        <ExpandMoreIcon
          id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
          onClick={handelSelector}
        />
        <div id={colorSelector ? "helloDark" : "hello"}></div>
      </div>
    </ClickAwayListener>
  );
};

export default CustomSelectorWithTick;
