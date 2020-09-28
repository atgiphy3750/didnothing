import React, { useState, useEffect, CSSProperties } from "react";
import imgBg from "./resources/img/bg.jpg";
import imgHour from "./resources/img/handHour.png";
import imgMinute from "./resources/img/handMinute.png";
import imgSecond from "./resources/img/handSecond.png";
import imgCircle from "./resources/img/circle.png";
import "./styles.css";

const App: React.FC = () => {
  const [currTime, setCurrTime] = useState<Date>(new Date());

  const getCurrTime = () => {
    setCurrTime(new Date());
  };

  useEffect(() => {
    const setTimeInterval = setInterval(() => {
      document.title = `벌써 ${currTime.getHours()}시 ${currTime.getMinutes()}분이야...`;
      getCurrTime();
    }, 1000);

    return () => clearInterval(setTimeInterval);
  });

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={imgBg}
        style={{ pointerEvents: "none", position: "fixed", zIndex: -1 }}
        alt=""
      />
      <ClockHand currTime={currTime} HHMMSS="hours" />
      <ClockHand currTime={currTime} HHMMSS="minutes" />
      <ClockHand currTime={currTime} HHMMSS="seconds" />
      <img
        style={{
          display: "flex",
          position: "fixed",
          transform: "translateX(-190px) translateY(266px)",
        }}
        src={imgCircle}
        alt=""
      />
      <TimeText currTime={currTime} />
    </div>
  );
};

type TimeTextProps = {
  currTime: Date;
};

const TimeText: React.FC<TimeTextProps> = (props) => {
  const HoursText: string[] = [
    "열두", //0
    "한",
    "두",
    "세",
    "네",
    "다섯",
    "여섯",
    "일곱",
    "여덟",
    "아홉",
    "열",
    "열한", //11
  ];

  const styleText: CSSProperties = {
    display: "flex",
    width: "220px",
    textAlign: "center",
    fontFamily: "sans serif",
    fontWeight: "bold",
    fontSize: "26px",
    position: "fixed",
    transform: "translateX(-260px) translateY(500px)",
    whiteSpace: "pre-line",
    userSelect: "none",
  };

  const getHourText = () => {
    let hours = props.currTime.getHours() % 12;
    let minutes = props.currTime.getMinutes();
    if (minutes < 20) {
      return HoursText[hours] + "시";
    } else if (minutes < 40) {
      return HoursText[hours] + "시 반이";
    } else {
      if (hours === 11) {
        return HoursText[0] + "시";
      } else {
        return HoursText[hours + 1] + "시";
      }
    }
  };

  const hourText = getHourText();

  return (
    <>
      <div style={styleText}>
        아무것도{"\n"}안 했는데{"\n"}
        벌써 {hourText}야...{" "}
      </div>
    </>
  );
};

type HandProps = {
  currTime: Date;
  HHMMSS: string;
};

const ClockHand: React.FC<HandProps> = (props) => {
  const variables = {
    translateX: "",
    translateY: "",
    transformOrigin: "",
    degreesMultiplier: 0,
    time: 0,
    degrees: 0,
    img: "",
  };

  if (props.HHMMSS === "seconds") {
    variables.transformOrigin = "5px 3px";
    variables.degreesMultiplier = 6;
    variables.time = props.currTime.getSeconds();
    variables.degrees = variables.time * variables.degreesMultiplier;
    variables.img = imgSecond;
  } else if (props.HHMMSS === "minutes") {
    variables.transformOrigin = "5px 6px";
    variables.degreesMultiplier = 6;
    variables.time = props.currTime.getMinutes();
    variables.degrees = variables.time * variables.degreesMultiplier;
    variables.img = imgMinute;
  } else if (props.HHMMSS === "hours") {
    variables.transformOrigin = "5px 6px";
    variables.degreesMultiplier = 30;
    variables.time = props.currTime.getHours();
    variables.degrees =
      variables.time * variables.degreesMultiplier +
      props.currTime.getMinutes() / 2;
    variables.img = imgHour;
  }

  return (
    <div>
      <img
        style={{
          display: "flex",
          position: "fixed",
          transformOrigin: "25px 107px",
          transform: `
              translateX(-214px)
              translateY(170px)
              rotate(${variables.degrees - 10}deg )`,
        }}
        src={variables.img}
        alt=""
      />
    </div>
  );
};

export default App;
