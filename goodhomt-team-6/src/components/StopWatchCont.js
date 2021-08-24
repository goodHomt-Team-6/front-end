import React, { useState, useRef, useEffect } from 'react';
import { Text } from '../shared/Styles';

const StopWatchCont = ({ timeStop, setResultTime }) => {
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);
  const timerId = useRef(null);
  // 스톱워치
  useEffect(() => {
    timerId.current = setInterval(() => {
      if (!timeStop) {
        timeRef.current += 1;
        setTime(timeRef.current);
      } else {
        clearInterval(timerId.current);
        setResultTime(timeRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId.current);
      setResultTime(timeRef.current);
    };
  }, [time.current, timeStop]);

  return timeStop ? (
    <Text
      type="contents"
      color="#9e9ea0"
      fontSize="40px"
      fontWeight="bold"
      margin="0"
      lineHeight="40px"
    >
      {parseInt(time / 60) < 10
        ? `0${parseInt(time / 60)}`
        : parseInt(time / 60)}
      :{time % 60 < 10 ? `0${time % 60}` : time % 60}
    </Text>
  ) : (
    <Text
      type="contents"
      color="#B4AFFF"
      fontSize="40px"
      fontWeight="bold"
      margin="0"
      lineHeight="40px"
    >
      {parseInt(time / 60) < 10
        ? `0${parseInt(time / 60)}`
        : parseInt(time / 60)}
      :{time % 60 < 10 ? `0${time % 60}` : time % 60}
    </Text>
  );
};

export default StopWatchCont;
