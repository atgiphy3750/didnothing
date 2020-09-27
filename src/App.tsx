import React, { useState, useEffect } from "react";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Clock />
    </div>
  );
};

const Clock: React.FC = () => {
  return (
    <div className="Clock">
      <ClockHand />
    </div>
  );
};

const ClockHand: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(new Date().getSeconds());
  const [degree, setDegree] = useState<number>(seconds * 6);

  const getTime = () => {
    setSeconds(new Date().getSeconds());
  };

  const getDegree = () => {
    setDegree(seconds * 6); // 1s rotates second hand by 6 degrees
  };

  const styleHand = {
    width: "200px",
    height: "10px",
    background: "black",
    position: "absolute",
    "transform-origin": "100%"
  };

  useEffect(() => {
    const setTimeInterval = setInterval(() => {
      getTime();
      getDegree();
    }, 1000);

    return () => clearInterval(setTimeInterval);
  });

  return (
    <div>
      <span>
        {seconds}, {degree}
      </span>

      <div
        style={{ ...styleHand, transform: `rotate(${degree + 90}deg)` }}
      ></div>

      <button
        onClick={() => {
          getTime();
          getDegree();
        }}
      >
        current Time
      </button>
    </div>
  );
};

export default App;
