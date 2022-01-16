import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./analogClock.css";
import ClockFace from './clockFace';

type ClockProps = {
  secondsHandVisible: boolean,
}

const Clock = ({ secondsHandVisible }: ClockProps) => {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsHandVisible]);

  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function updateSize() {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight
        });
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function tick() {
    setCurrentDate(new Date());
  }

  // https://en.wikipedia.org/wiki/Clock_angle_problem
  // at 5:24
  // hours hand degree = (60x5+24) x 0.5 = 162 degree
  // minutes hand degree = (6 x 24) = 144 degree
  const hoursHandRotation =
    (60 * currentDate.getHours() + currentDate.getMinutes()) * 0.5;

  const minutesHandRotation = currentDate.getMinutes() * 6;

  const secondsHandRotation = currentDate.getSeconds() * 6;

  const hoursHandCss = {
    transform: "rotateZ(" + hoursHandRotation + "deg)",
  };

  const minutesHandCss = {
    transform: "rotateZ(" + minutesHandRotation + "deg)",
  };

  const secondsHandCss = {
    transform: "rotateZ(" + secondsHandRotation + "deg)",
  };

  //getHours return between 0-23
  // 8:00 AM when the day time starts, 17:00 when night time starts
  const isNightTime = currentDate.getHours() < 8 || currentDate.getHours() >= 17;

  return (
    <div>
      <div
        className={
          "clock-body frame " + (isNightTime ? "dark-bg" : "light-bg")
        }
        ref={targetRef}
      >
        <div id="clock" className="clock-face">
          {/* {getClockFace(isNightTime)} */}
          <ClockFace width={dimensions.width} height={dimensions.height} colorHex={isNightTime ? "fff" : "000"} />
          <div
            id="hoursHand"
            className={
              "hands hours " +
              (currentDate.getHours() === 0 ? "" : "transition-effect ") +
              (isNightTime ? "light-bg" : "dark-bg")
            }
            style={hoursHandCss}
          ></div>
          <div
            id="minutesHand"
            className={
              "hands minutes " +
              (currentDate.getMinutes() === 0
                ? ""
                : "transition-effect ") +
              (isNightTime ? "light-bg" : "dark-bg")
            }
            style={minutesHandCss}
          ></div>
          <div
            id="secondsHand"
            className={
              "hands seconds " +
              (currentDate.getSeconds() === 0
                ? ""
                : "transition-effect ") +
              (secondsHandVisible === true ? "" : "indicator-invisible")
            }
            style={secondsHandCss}
          ></div>
          <div
            className={
              "hands-center " + (isNightTime ? "light-bg" : "dark-bg")
            }
          ></div>
        </div>
      </div>
    </div>
  );

};

Clock.defaultProps = {
  secondsHandVisible: true,
};

export default Clock;
