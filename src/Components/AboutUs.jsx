import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setHistory } from "../action/GlobalAction";

const AboutUs = () => {
  const colorSelector = useSelector((state) => state.globalData.colorState);
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHistory(history.location.pathname));
  }, []);

  let handelHome = () => {
    history.push("/");
  };

  let getAds1 = (containerId) => {
    var div = document.getElementById(containerId);
    if (div !== null) {
      var s2 = document.createElement("script");
      s2.type = "text/javascript";
      s2.src =
        "//exposuremixed.com/c4/5d/90/c45d90e4561f8e1adef4567e598cae7d.js";

      div.appendChild(s2);
    }
  };

  let getAddsTop = (containerId) => {
    var div = document.getElementById(containerId);

    if (div !== null) {
      div.innerHTML = "";
      var s1 = document.createElement("script");
      s1.type = "text/javascript";
      s1.innerHTML = `atOptions = {key: "1375dc95c54fe317d1fcfe82f819823b",format: "iframe",height: 250,width: 300,params: {}};`;

      var s2 = document.createElement("script");
      s2.type = "text/javascript";
      s2.src =
        "https://www.variouscreativeformats.com/1375dc95c54fe317d1fcfe82f819823b/invoke.js";
      div.appendChild(s1);
      div.appendChild(s2);
    }
  };
  let getAddsBottom = (containerId) => {
    var div = document.getElementById(containerId);

    if (div !== null) {
      div.innerHTML = "";
      var s1 = document.createElement("script");
      s1.type = "text/javascript";
      s1.innerHTML = `atOptions = {key: "aa2a394b0e13c3764912f7be6807cefe",format: "iframe",height: 250,width: 300,params: {}};`;

      var s2 = document.createElement("script");
      s2.type = "text/javascript";
      s2.src =
        "https://www.variouscreativeformats.com/aa2a394b0e13c3764912f7be6807cefe/invoke.js";
      div.appendChild(s1);
      div.appendChild(s2);
    }
  };

  useEffect(() => {
    // getAds1("socialbanner");

    setTimeout(() => {
      getAddsBottom("bottombanner");
    }, 2500);
    setTimeout(() => {
      getAddsTop("topbanner");
    }, 3400);
  }, []);

  return (
    <div id={colorSelector ? "aboutusdark" : "aboutus"}>
      <div id="socialbanner"></div>
      <div
        id="topbanner"
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      ></div>
      <h1>How does it work?</h1>
      <p>
        At GlobalTop20 we have developed software that takes a snapshot of data
        once a day and calculates the Top 20 (YouTube) videos viewed globally
        over the last 24 hours, and the Hottest Top 20 (YouTube) videos that
        have just been released, globally.
      </p>
      <br />
      <p>
        However, our database can be searched by Date, Region, and Subject
        letting the viewer discover many Top 20 and Hot 20 variations, including
        the Top 20 Music, Sports, News videos and many more. Furthermore,
        GlobalTop20.com lets you search YouTube’s various Regions, Globally or
        Individually. So you can take the time to find out what’s popular in
        different regions of the world. Lastly, you can search by Date, which
        means in the future GlobalTop20.com can be like a time-machine, letting
        you go back and view what was popular on a specific day in history. You
        can easily track what’s going on now, or see what people were watching
        on your birthday, for example.
      </p>
      <br />

      <h2>GlobalTop20.com can be:</h2>
      <br />

      <ol>
        <li>A Global view on the world that crosses all predefined regions.</li>
        <li>
          A bridge across all geographic locations based on objective measures
          (views) that shine credit on the videos that stand out worldwide.
        </li>
        <li>
          Part of your daily routine: see what’s been happening in the world
          tailored to your search interests. [By logging in and setting up your
          own custom searches you will be able to auto-play custom Top 20 lists
          just for you. (Still in development)]
        </li>
        <li>
          A searchable time capsule that will keep a record of the most popular
          videos in history.
        </li>
      </ol>

      <br />
      <div style={{ display: "flex" }}>
        <h3>Go Back to </h3>
        <h3
          style={{
            cursor: "pointer",
            color: colorSelector ? "#87ceeb" : "blue",
            textDecoration: "underline",
            marginLeft: "4px",
          }}
          onClick={handelHome}
        >
          Home
        </h3>
      </div>
      <div
        id="bottombanner"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "30px",
        }}
      ></div>

      {/* <h2>Charity:</h2>
      <br />
      <p>
        At GlobalTop20 we hope to make a difference in the quality of life
        around the world by donating 50% of our revenue to Mental Health
        Charities. Mental Health is an ever increasing issue, especially during
        the Covid-19 Pandemic, and is something that can affect anyone anywhere.
      </p> */}
    </div>
  );
};

export default AboutUs;
