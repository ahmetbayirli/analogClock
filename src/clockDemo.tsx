import React, { useState } from "react";
import ReactDOM from "react-dom";
import Clock from "./analogClock";

function ClockDemo() {
  const [showSeconds, setShowSeconds] = useState(true);

  function alterSecondVisibility() {
    setShowSeconds(!showSeconds);
  }

  return (
    <div>
      <div style={{ backgroundColor: "lightGrey" }}>
        <Clock secondsHandVisible={showSeconds} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <label htmlFor="secondsVisibilityCheckbox">
            Seconds Indicator Visible
          </label>
          <input
            id="secondsVisibilityCheckbox"
            type="checkbox"
            defaultChecked={showSeconds}
            onChange={alterSecondVisibility}
          />
        </div>
      </div>
    </div>
  );
}

const clockDiv = document.getElementById("analogClock");

clockDiv && ReactDOM.render(<ClockDemo />, clockDiv);

export default ClockDemo;
