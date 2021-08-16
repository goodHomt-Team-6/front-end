import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import logger from '../shared/Logger';

const ProgressBarCont = ({ currentSetIdx, setIdx, minutes, seconds }) => {
  const [progressTime, setProgressTime] = useState(0);
  const timerId = useRef(null);

  const handleProgressBar = (breakTime) => {
    let i = 0;
    timerId.current = setInterval(() => {
      if (i < breakTime) {
        // state가 변하면서 progressTime은 계속 디폴트 값인 0으로 회귀하게 됨.
        // 그래서 prev 값을 이용하여 이전 값을 계속 살리면서 더해줌.
        setProgressTime((prev) => prev + 100 / breakTime);
        i++;
      } else {
        clearInterval(timerId.current);
      }
    }, 1000);
  };

  useEffect(() => {
    handleProgressBar(minutes * 60 + seconds);
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100vw',
        zIndex: '-1',
        left: '0',
        top: '0',
      }}
    >
      {/* 휴식 시간에 따른 게이지 채워주기 */}
      <ProgressBar
        completed={progressTime}
        bgColor={'#ECECF3'}
        baseBgColor={'#fff'}
        height={'100px'}
        padding={'0'}
        borderRadius={'0'}
        labelSize={'0'}
        transitionTimingFunction={'linear'}
      ></ProgressBar>
    </div>
  );
};

export default ProgressBarCont;
