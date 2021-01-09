import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!props.gameover) {
      setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
  }, [props.gameover]);

  const formatTime = (time) => {
    const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
    //work downwards to the biggest unit
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <h4>
      <strong>{formatTime(timer)}</strong>
    </h4>
  );
};

export default Timer;
