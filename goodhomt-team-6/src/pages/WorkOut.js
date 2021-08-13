import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button, Input, Text, Image, FooterButton } from '../shared/Styles';
import { history } from '../redux/configureStore';
import StopWatch from '../img/stopwatch.svg';
import TimeStop from '../img/time_stop.svg';
import TimeStart from '../img/time_start.svg';
import { useDispatch, useSelector } from 'react-redux';
import CompletedCheck from '../img/completed_check.svg';
import Check from '../img/check.svg';
import logger from '../shared/Logger';
import ProgressBarCont from '../components/ProgressBarCont';
import ExerciseResultModal from '../components/ExerciseResultModal';
import Header from '../components/Header';

const WorkOut = (props) => {
  const [timeStop, setTimeStop] = useState(true);
  const [time, setTime] = useState(0);
  const routine = useSelector((state) => state.exercise.routine[0]);
  const [currentExerciseIdx, setcurrentExerciseIdx] = useState(0);
  const [currentSetIdx, setcurrentSetIdx] = useState(0);
  const [exerciseResultModal, showExerciseResultModal] = useState(false);

  // 스톱워치
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
    return () => {
      clearInterval(interval);
    };
  }, [timeStop]);

  const completeSet = (length) => {
    setcurrentSetIdx((prev) => prev + 1);
    // 세트 체크를 모두 완료하면 다음 종목으로 넘어가야함.
    if (currentSetIdx == length - 1) {
      setcurrentExerciseIdx((prev) => prev + 1);
      setcurrentSetIdx(0);
    }
  };

  // 휴식 시간 재기
  // 휴식이 시작되고 휴식 시간이 끝나면 자동으로 다음 세트로 넘어감
  const handleBreakTime = (setLength, breakTime) => {
    setTimeout(() => {
      completeSet(setLength);
    }, (breakTime + 1) * 1000);
  };

  return (
    <React.Fragment>
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <Text type="title" margin="0px 5px 0px 0px;" fontSize="18px;">
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
          {currentExerciseIdx < routine.myExercise.length ? (
            timeStop ? (
              <>
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
                <PlayIconCont>
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
                </PlayIconCont>
              </>
            ) : (
              <>
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
                <PlayIconCont>
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
                </PlayIconCont>
              </>
            )
          ) : (
            <CompleteButton
              onClick={() => {
                showExerciseResultModal(true);
                setTimeStop(true);
              }}
            >
              <CompleteButtonInner>운동 완료</CompleteButtonInner>
            </CompleteButton>
          )}
        </TimeCont>
        <ListCont>
          {routine.myExercise.map((list, listIdx) => (
            <React.Fragment key={listIdx}>
              {listIdx === currentExerciseIdx ? (
                <List>
                  <ListHead>{listIdx + 1}</ListHead>
                  <ListBody>{list.exerciseName}</ListBody>
                </List>
              ) : listIdx < currentExerciseIdx ? (
                <List bgColor="#ECECF3">
                  <ListHead>{listIdx + 1}</ListHead>
                  <ListBody>
                    {list.exerciseName}
                    <ListCheck>
                      <Image src={CompletedCheck} width="24px" height="24px" />
                    </ListCheck>
                  </ListBody>
                </List>
              ) : (
                <List bgColor="#ECECF3">
                  <ListHead>{listIdx + 1}</ListHead>
                  <ListBody>{list.exerciseName}</ListBody>
                </List>
              )}
              {listIdx === currentExerciseIdx &&
                list.set.map((set, setIdx) =>
                  set.type === 'exercise' ? (
                    <ExerciseList key={setIdx}>
                      <ListHead>SET{set.setCount}</ListHead>
                      <ExerciseListBody>
                        {set.weight}kg - {set.count}회
                        {currentSetIdx === setIdx ? (
                          <ListCheckBlack
                            onClick={() => {
                              completeSet(list.set.length);
                            }}
                          >
                            <Image src={Check} width="24px" height="24px" />
                          </ListCheckBlack>
                        ) : (
                          currentSetIdx > setIdx && (
                            <ListCheck>
                              <Image
                                src={CompletedCheck}
                                width="24px"
                                height="24px"
                              />
                            </ListCheck>
                          )
                        )}
                      </ExerciseListBody>
                    </ExerciseList>
                  ) : (
                    <ExerciseList key={setIdx} style={{ position: 'relative' }}>
                      <ListHead>휴식</ListHead>
                      <ExerciseListBody>
                        {set.seconds < 10
                          ? `0${set.minutes}:0${set.seconds}`
                          : `0${set.minutes}:${set.seconds}`}
                        {currentSetIdx === setIdx &&
                          handleBreakTime(
                            list.set.length,
                            set.minutes * 60 + set.seconds,
                          )}
                        {currentSetIdx === setIdx ? (
                          <>
                            <ListCheckBlack
                            // 일단은 휴식에서 체크 버튼 클릭을 통해 휴식을 끝내는 동작은 뺴놓자.
                            // onClick={() => {
                            //   completeSet(list.set.length);
                            // }}
                            >
                              <Image src={Check} width="24px" height="24px" />
                            </ListCheckBlack>
                            <ProgressBarCont
                              currentSetIdx={currentSetIdx}
                              setIdx={setIdx}
                              minutes={set.minutes}
                              seconds={set.seconds}
                            />
                          </>
                        ) : (
                          currentSetIdx > setIdx && (
                            <>
                              <ListCheck>
                                <Image
                                  src={CompletedCheck}
                                  width="24px"
                                  height="24px"
                                />
                              </ListCheck>
                            </>
                          )
                        )}
                      </ExerciseListBody>
                    </ExerciseList>
                  ),
                )}
            </React.Fragment>
          ))}
        </ListCont>
        {exerciseResultModal && (
          <ExerciseResultModal
            exerciseLength={routine.myExercise.length}
            time={time}
            routineName={routine.routineName}
            id={routine.id}
          ></ExerciseResultModal>
        )}
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
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayIconCont = styled.div`
  display: flex;
  align-self: flex-end;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ListCont = styled.div`
  height: 60vh;
  overflow-y: scroll;
`;

const List = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 80px;
  border-bottom: 1px solid #9e9ea0;
  ${(props) => (props.bgColor ? `background-color: ${props.bgColor};` : '')}
`;

const ListHead = styled.div`
  padding: 0 20px;
  font-weight: 600;
  width: 54px;
`;

const ListBody = styled.div`
  padding-left: 35px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ListCheck = styled.div`
  margin-right: 40px;
  display: flex;
  align-self: center;
`;

const ListCheckBlack = styled.div`
  margin-right: 15px;
  display: flex;
  align-self: center;
  background-color: #000;
  width: 83px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
`;

const ExerciseList = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 100px;
  border-bottom: 1px solid #9e9ea0;
  align-items: baseline;
`;

const ExerciseListBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 35px;
  width: 100%;
`;

const CompleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 266px;
  height: 80px;
  border: 1px solid #4a40ff;
  border-radius: 40px;
  margin-bottom: 20px;
`;

const CompleteButtonInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 56px;
  border: 1px solid #4a40ff;
  border-radius: 40px;
  background-color: #4a40ff;
  color: white;
`;
