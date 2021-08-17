import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import StopWatchCont from '../components/StopWatchCont';

const WorkOut = (props) => {
  const dispatch = useDispatch();
  const [timeStop, setTimeStop] = useState(true);
  const routine = useSelector((state) => state.exercise.myTodayRoutine[0]);
  const currentExerciseIdx = useSelector(
    (state) => state.exercise.currentExerciseIdx,
  );
  const challengeId = useSelector(
    (state) => state.challenge.challengeDetail.challenge.id,
  );
  const currentSetIdx = useSelector((state) => state.exercise.currentSetIdx);
  const [exerciseResultModal, showExerciseResultModal] = useState(false);
  const [resultTime, setResultTime] = useState(0);

  const completeSet = (length) => {
    // 세트 체크를 모두 완료하면 다음 종목으로 넘어가야함.
    if (currentSetIdx === length - 1) {
      dispatch(exerciseActions.countCurrentSetIdx(0));
      dispatch(exerciseActions.countCurrentExerciseIdx(currentExerciseIdx + 1));
    } else {
      dispatch(exerciseActions.countCurrentSetIdx(currentSetIdx + 1));
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
          dispatch(exerciseActions.countCurrentExerciseIdx(0));
          dispatch(exerciseActions.countCurrentSetIdx(0));
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
                <StopWatchCont
                  timeStop={timeStop}
                  setResultTime={setResultTime}
                />
                <PlayIconCont>
                  <Image
                    src={TimeStart}
                    width="40px"
                    height="40px"
                    _onClick={() => {
                      setTimeStop(false);
                    }}
                  ></Image>
                </PlayIconCont>
              </>
            ) : (
              <>
                <StopWatchCont
                  timeStop={timeStop}
                  setResultTime={setResultTime}
                />
                <PlayIconCont>
                  <Image
                    src={TimeStop}
                    width="40px"
                    height="40px"
                    _onClick={() => {
                      setTimeStop(true);
                    }}
                  ></Image>
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
                            <ListCheckBlack>
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
            time={resultTime}
            routineName={routine.routineName}
            id={routine.id}
            challengeId={challengeId}
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
  height: calc(40vh - 77px);
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
