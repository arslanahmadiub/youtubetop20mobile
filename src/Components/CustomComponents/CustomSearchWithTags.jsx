import React, { useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchIcon from "@material-ui/icons/Search";
import { getUniqueTags } from "../../Services/GlobalServices";

const CustomSearchWithTags = ({ colorSelector, ...props }) => {
  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("");
  const [filterTagsData, setFilterTagsData] = useState([]);
  const [oldMenuText, setOldMenuText] = useState("");
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    props.updateMenuText(menuText);
  }, [menuText]);

  let getTags = async () => {
    try {
      let { data } = await getUniqueTags();

      setTagsData(data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

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
      setFilterTagsData([]);
      setshowMenuBar(false);
      setMenuText(e.target.value);
    } else {
      let filterData = tagsData.filter((v) =>
        v.toLowerCase().startsWith(e.target.value.toLowerCase())
      );

      setFilterTagsData(filterData);
      setshowMenuBar(true);
      setMenuText(e.target.value);
    }
  };
  let handelMenuFocus = () => {
    setMenuText("");
    setshowMenuBar(false);
  };
  let handelSelector = () => {
    if (filterTagsData.length > 0) {
      setshowMenuBar(!showMenuBar);
    } else {
      setFilterTagsData(tagsData);
      setshowMenuBar(false);
    }
  };

  let handelMenuClick = (e) => {
    setMenuText(e.target.textContent);
    setshowMenuBar(false);
    setOldMenuText(e.target.textContent);
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
          overflow-x: hidden;

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
        .mobileInfoVideo{
          padding-bottom: 20px;
           position: relative;
           z-index: ${showMenuBar ? "-1" : "0"}; 
        }
        .mobileSearchButton{
         
           z-index: ${showMenuBar ? "-1" : "0"}; 
        }
        
        `}</style>
        <input
          className={colorSelector ? "searchInputDark" : "searchInput"}
          value={menuText}
          onChange={handelRegionChange}
          onFocus={handelMenuFocus}
          placeholder="Search Custom Tags"
        />
        {showMenuBar && (
          <div className="selectorMenu" style={{ zIndex: "8000" }}>
            {filterTagsData.length > 0 &&
              filterTagsData.map((item, index) => {
                return (
                  <p onClick={handelMenuClick} key={index}>
                    {item}
                  </p>
                );
              })}
          </div>
        )}

        <SearchIcon
          id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
          onClick={handelSelector}
        />
        <div id={colorSelector ? "helloDark" : "hello"}></div>
      </div>
    </ClickAwayListener>
  );
};

export default CustomSearchWithTags;
