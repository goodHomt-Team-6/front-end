import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Image, Text, Icon } from '../shared/Styles';
import { useSelector } from 'react-redux';
import { history } from '../redux/configureStore';

import playButton from '../img/play_button.svg';
import BadRating from '../img/rating_bad_big.svg';
import GoodRating from '../img/rating_good_big.svg';
import NormalRating from '../img/rating_soso_big.svg';

const DashBoardBase = ({ message, exerciseType }) => {
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);

  return (
    <>
      <DashBoardContainer>
        {myTodayRoutine && myTodayRoutine.length !== 0 ? (
          <>
            {myTodayRoutine[0].isCompleted ? (
              <TodayWrapper>
                {myTodayRoutine[0].rating === 'soso' && (
                  <Enrolled src={NormalRating}></Enrolled>
                )}
                {myTodayRoutine[0].rating === 'bad' && (
                  <Enrolled src={BadRating}></Enrolled>
                )}
                {myTodayRoutine[0].rating === 'good' && (
                  <Enrolled src={GoodRating}></Enrolled>
                )}
                <DashBoardDiv>
                  <TextItem>{message}</TextItem>
                </DashBoardDiv>
              </TodayWrapper>
            ) : (
              <TodayWrapper
                onClick={() => {
                  history.push('/workout');
                }}
              >
                <EnrolledOne>{myTodayRoutine.length}</EnrolledOne>
                <DashBoardDiv>
                  <PlayBtnIcon src={playButton} />
                  <TextItem>{message}</TextItem>
                </DashBoardDiv>
              </TodayWrapper>
            )}
          </>
        ) : (
          <TodayWrapper>
            <EnrolledZero>0</EnrolledZero>
            <DashBoardDiv>
              <TextItem>{message}</TextItem>
            </DashBoardDiv>
          </TodayWrapper>
        )}

        <TodayTypeContainer>
          <TypeWrapper>
            <Span>종목</Span>
            <TextItem>{exerciseType}</TextItem>
          </TypeWrapper>
          <Div />
          <TypeWrapper>
            <Span>운동시간</Span>
            {myTodayRoutine && myTodayRoutine.length !== 0 ? (
              <>
                {myTodayRoutine[0].isCompleted ? (
                  <TextItem>
                    <WorkoutDate>
                      {Math.floor(myTodayRoutine[0].routineTime / 60) < 10 ? (
                        <Time>
                          {'0' + Math.floor(myTodayRoutine[0].routineTime / 60)}:
                        </Time>
                      ) : (
                        <Time>
                          {Math.floor(myTodayRoutine[0].routineTime / 60)}:
                        </Time>
                      )}
                      {myTodayRoutine[0].routineTime % 60 < 10 ? (
                        <Time>
                          {'0' + (myTodayRoutine[0].routineTime % 60)}
                        </Time>
                      ) : (
                        <Time>{myTodayRoutine[0].routineTime % 60}</Time>
                      )}
                    </WorkoutDate>
                  </TextItem>
                ) : (
                  <TextItem>00:00</TextItem>
                )}
              </>
            ) : (
              <TextItem>00:00</TextItem>
            )}
          </TypeWrapper>
        </TodayTypeContainer>
      </DashBoardContainer>
    </>
  );
};

export default DashBoardBase;

const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 30px;
`;

const TodayTypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 24px 0px;
  padding: 0px 15px;
`;

const Div = styled.div`
  border-left: 1px solid gray;
  padding: 10px;
  margin-left: 20px;
`;

const TypeWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
`;

const Enrolled = styled.img`
  width: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const EnrolledZero = styled.span`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1;
`;

const EnrolledOne = styled.span`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1;
  color: ${Color.mainBlue};
`;

const TextItem = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 600;
`;

const DashBoardDiv = styled.div`
  display: flex;
`;

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;

const Time = styled.span`
  font-size: 14px;
`;


const PlayBtnIcon = styled.img`
  width: 15px;
  margin-right: 5px;
`;