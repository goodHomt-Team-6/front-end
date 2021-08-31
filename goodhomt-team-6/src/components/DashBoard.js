import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Text } from '../shared/Styles';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkSolid from '../img/bookmark_solid.svg';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';

// 대시보드 컴포넌트
const DashBoard = ({ props }) => {
  const dispatch = useDispatch();
  const selectedPrevItem = useSelector(
    (store) => store.exercise.selectedPrevItem,
  );
  const routine = useSelector((store) => store.exercise.routine[0]);

  return (
    <>
      <MainBox>
        <TodayWrapper>
          <Enrolled>{selectedPrevItem.myExercise.length}</Enrolled>
          <Wrapper>
            {selectedPrevItem && selectedPrevItem.isBookmarked ? (
              <IconImg src={BookmarkSolid} />
            ) : null}
            <span>{selectedPrevItem.routineName}</span>
          </Wrapper>
        </TodayWrapper>
        <TypeContainer>
          <TypeWrapper>
            <Text
              type="label"
              fontSize="14px"
              fontWeight="600"
              color="black"
              opacity="54%"
              style={{
                minWidth: '30px',
              }}
            >
              종목
            </Text>
            <TextItem>
              {selectedPrevItem.myExercise !== [] &&
                selectedPrevItem.myExercise.length < 2
                ? selectedPrevItem.myExercise[0].exerciseName
                : `${selectedPrevItem.myExercise[0].exerciseName} 외 ${selectedPrevItem.myExercise.length - 1
                }개`}
            </TextItem>
          </TypeWrapper>
          <Div />
          <TypeWrapper>
            <Text
              type="label"
              fontSize="14px"
              fontWeight="600"
              color="black"
              opacity="54%"
            >
              운동시간
            </Text>

            <TextItem>
              {Math.floor(selectedPrevItem.routineTime / 60) < 10 ? (
                <Time>
                  {'0' + Math.floor(selectedPrevItem.routineTime / 60)}:
                </Time>
              ) : (
                <Time>{Math.floor(selectedPrevItem.routineTime / 60)}:</Time>
              )}
              {selectedPrevItem.routineTime % 60 < 10 ? (
                <Time>{'0' + (selectedPrevItem.routineTime % 60)}</Time>
              ) : (
                <Time>{selectedPrevItem.routineTime % 60}</Time>
              )}
            </TextItem>
          </TypeWrapper>
        </TypeContainer>
      </MainBox>
    </>
  );
};

export default DashBoard;

const MainBox = styled.div`
  padding: 0px 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  border-bottom: 2px solid black;
  width: 100%;
`;

const TodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* padding: 30px; */
`;

const Enrolled = styled.span`
  font-size: 72px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1;
  color: ${Color.mainBlue};
`;

const TextItem = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 500;
`;

const Div = styled.div`
  border-left: 1px solid gray;
  padding: 10px;
  margin-left: 20px;
`;

const TypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 38px 0px;
`;

const TypeWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
`;

const IconImg = styled.img`
  cursor: pointer;
  height: 20px;
  margin-right: 5px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Time = styled.span`
  line-height: 45px;
`;
