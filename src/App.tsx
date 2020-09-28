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
      let currHour = currTime.getHours() % 12;
      let hour = currHour === 0 ? 12 : currHour;
      document.title = `벌써 ${hour}시 ${currTime.getMinutes()}분이야...`;
      getCurrTime();
    }, 1000);

    return () => clearInterval(setTimeInterval);
  });

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={imgBg}
        style={{
          pointerEvents: "none",
          position: "fixed",
          zIndex: -1,
          width: "60vh",
        }}
        alt=""
      />
      <ClockHand currTime={currTime} HHMMSS="hours" />
      <ClockHand currTime={currTime} HHMMSS="minutes" />
      <ClockHand currTime={currTime} HHMMSS="seconds" />
      <img
        style={{
          width: "2vh",
          display: "flex",
          position: "fixed",
          transform: "translateX(-14vh) translateY(20vh)",
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
    width: "50vh",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "2.5vh",
    position: "fixed",
    transform: "translateX(-2vh) translateY(36vh)",
    whiteSpace: "pre-line",
    userSelect: "none",
    fontFamily: `nanum gothic, sans-serif`
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
    degreesMultiplier: 0,
    time: 0,
    degrees: 0,
    img: "",
  };

  if (props.HHMMSS === "seconds") {
    variables.degreesMultiplier = 6;
    variables.time = props.currTime.getSeconds();
    variables.degrees = variables.time * variables.degreesMultiplier;
    variables.img = imgSecond;
  } else if (props.HHMMSS === "minutes") {
    variables.degreesMultiplier = 6;
    variables.time = props.currTime.getMinutes();
    variables.degrees = variables.time * variables.degreesMultiplier;
    variables.img = imgMinute;
  } else if (props.HHMMSS === "hours") {
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
          width: "3.9vh",
          display: "flex",
          position: "fixed",
          transformOrigin: "1.95vh 8.5vh",
          transform: `
              translateX(-16vh)
              translateY(13vh)
              rotate(${variables.degrees - 10}deg )`,
        }}
        src={variables.img}
        alt=""
      />
    </div>
  );
};

export default App;
