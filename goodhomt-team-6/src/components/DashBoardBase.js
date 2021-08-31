import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Image, Text, Icon } from '../shared/Styles';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

import playButton from '../img/play_button_blue.svg';
import BadRating from '../img/rating_bad_big.svg';
import GoodRating from '../img/rating_good_big.svg';
import NormalRating from '../img/rating_soso_big.svg';
import addButton from '../img/add_exercise_button.svg';
import Cookies from 'universal-cookie';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';

const cookie = new Cookies();

const DashBoardBase = ({ message, exerciseType }) => {
  const dispatch = useDispatch();
  const myTodayRoutine = useSelector((store) => store.exercise.myTodayRoutine);
  const tokenCookie = cookie.get('homt6_is_login');

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
                <PlayBtnIcon src={playButton} />
                <DashBoardDiv>
                  <TextItem>{message}</TextItem>
                </DashBoardDiv>
              </TodayWrapper>
            )}
          </>
        ) : (
          <TodayWrapper>
            <AddBtn
              src={addButton}
              onClick={() => {
                if (!tokenCookie) {
                  sessionStorage.setItem('redirect_url', '/exercise');
                  dispatch(userActions.showLoginModal(true));
                } else {
                  history.push('/exercise');
                  dispatch(exerciseActions.initializeRoutine());
                }
              }}
            ></AddBtn>
            <DashBoardDiv>
              <TextItem>{message}</TextItem>
            </DashBoardDiv>
          </TodayWrapper>
        )}

        <TodayTypeContainer>
          <TypeWrapper>
            <Span
              style={{
                minWidth: '30px',
                marginRight: '10px',
              }}
            >
              종목
            </Span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <TextItem
                style={{
                  textAlign: 'right',
                }}
              >
                {exerciseType.split('외')[0]}
              </TextItem>
              {exerciseType.split('외').length > 1 && (
                <TextItem>{`외 ${exerciseType.split('외')[1]}`}</TextItem>
              )}
            </div>
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
                          {'0' + Math.floor(myTodayRoutine[0].routineTime / 60)}
                          :
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

const TextItem = styled.span`
  color: black;
  font-size: 15px;
  font-weight: 500;
  word-break: keep-all;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 500;
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
  width: 50px;
  margin-bottom: 20px;
`;

const AddBtn = styled.img`
  color: white;
  font-size: 30px;
  width: 67px;
  height: 67px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  z-index: 1000;
  margin-bottom: 20px;
`;
