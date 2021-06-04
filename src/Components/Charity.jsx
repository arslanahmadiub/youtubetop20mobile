import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setHistory } from "../action/GlobalAction";

const Charity = () => {
  const colorSelector = useSelector((state) => state.globalData.colorState);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(setHistory(history.location.pathname));
  }, []);
  return (
    <div id={colorSelector ? "charitydark" : "charity"}>
      <p>
        As a charitable organization, we have pledged to donate 50% of our
        revenue to charity. That means half of every ad dollar our company
        receives is donated towards charities, specifically ones that focus of
        mental health and helping sufferers of mental illnesses.
      </p>
      <br />
      <p>
        The following are two of the charities we have selected to donate to:
      </p>
      <br />

      <ol>
        <li> Brain & Behavior Research Foundation </li>
        <ol>
          <li>https://www.bbrfoundation.org/</li>
        </ol>
        <li>NAMI - National Alliance on Mental Illness</li>
        <ol>
          <li>https://www.nami.org/Home</li>
        </ol>
      </ol>
    </div>
  );
};

export default Charity;
