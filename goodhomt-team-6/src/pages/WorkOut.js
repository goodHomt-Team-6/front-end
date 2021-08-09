import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button, Input, Text, Image, FooterButton } from '../shared/Styles';
import { history } from '../redux/configureStore';
import StopWatch from '../img/stopwatch.svg';
import TimeStop from '../img/time_stop.svg';
import TimeStart from '../img/time_start.svg';
import { useDispatch, useSelector } from 'react-redux';

const WorkOut = (props) => {
  const [timeStop, setTimeStop] = useState(true);
  const [time, setTime] = useState(0);
  const routine = useSelector((state) => state.exercise.routine[0]);

  useEffect(() => {
    // if 문 안에 있는 interval 들을 밖에서 호출해서 연결시켜줌.
    let interval = null;

    if (!timeStop) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeStop]);

  return (
    <React.Fragment>
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <Text type="title" margin="0px 5px 0px 0px;" fontSize="24px;">
          Workout
        </Text>
      </GoBackButton>
      <Container>
        <TimeCont>
          <Image src={StopWatch} width="18px" height="20px"></Image>
          {routine.routineName && (
            <Text type="contents" color="#fff">
              {routine.routineName}
            </Text>
          )}
          {timeStop ? (
            <Text
              type="contents"
              color="#9e9ea0"
              fontSize="60px"
              fontWeight="bold"
              margin="0"
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
              fontSize="60px"
              fontWeight="bold"
              margin="0"
            >
              {parseInt(time / 60) < 10
                ? `0${parseInt(time / 60)}`
                : parseInt(time / 60)}
              :{time % 60 < 10 ? `0${time % 60}` : time % 60}
            </Text>
          )}
          <IconCont>
            {timeStop ? (
              <Image
                src={TimeStart}
                width="40px"
                height="40px"
                _onClick={() => {
                  setTimeStop(false);
                }}
              ></Image>
            ) : (
              <Image
                src={TimeStop}
                width="40px"
                height="40px"
                _onClick={() => {
                  setTimeStop(true);
                }}
              ></Image>
            )}
          </IconCont>
        </TimeCont>
        <ListCont></ListCont>
      </Container>
    </React.Fragment>
  );
};

export default WorkOut;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBackButton = styled.div`
  display: flex;
  padding: 25px;
  /* width: 100%; */
  box-sizing: border-box;
  align-items: baseline;
  background-color: #000;
  color: #fff;
`;

const TimeCont = styled.div`
  height: calc(40vh - 78px);
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListCont = styled.div`
  height: 60vh;
`;

const IconCont = styled.div`
  display: flex;
  align-self: flex-end;
  margin-right: 10px;
`;
