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
  return (
    <div id={colorSelector ? "aboutusdark" : "aboutus"}>
      <h1>How does it work?</h1>
      <p>
        We have developed a unique algorithm which by default takes a snapshot
        of data once a day and calculates the Top 20 (YouTube) videos viewed
        globally over the last 24 hours, and the Hottest Top 20 (YouTube) videos
        that have just been released, globally.
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

      <h2>Charity:</h2>
      <br />
      <p>
        At GlobalTop20 we hope to make a difference in the quality of life
        around the world by donating 50% of our revenue to Mental Health
        Charities. Mental Health is an ever increasing issue, especially during
        the Covid-19 Pandemic, and is something that can affect anyone anywhere.
      </p>
    </div>
  );
};

export default AboutUs;
