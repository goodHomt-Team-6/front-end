import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Text, Input } from '../shared/Styles';

// 피드에 나의 루틴 추가하기 페이지
const AddMyFeed = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header message="Feed"></Header>
      <Text
        type="contents"
      >루틴 제목과 설명을 입력해요!
      </Text>

      {/* 나의 오늘 운동 루틴 가져오기 */}
      <CategoryList>
        <TodayExerciseWrapper>
          <TimeBox>
            <Time>
              운동 전
            </Time>
          </TimeBox>
          <RoutineBox>
            <RoutineName>
              routineName
            </RoutineName>
            <WorkoutDate>
              00:00
            </WorkoutDate>
          </RoutineBox>
        </TodayExerciseWrapper>
      </CategoryList>

      <Text
        type="contents"
      >User name
      </Text>
      <Input>
      </Input>
    </>
  );
};

export default AddMyFeed;

const CategoryList = styled.ul`
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 314px);
  overflow-x: scroll;
`;

const TodayExerciseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  margin: 0px;
  padding: 28px 0px;
  font-size: 1rem;
  &:hover,
  &:active {
  cursor: pointer;
  }
`;

const TimeBox = styled.div`
  background-color: ${(props) => props.completed ? '#4A40FF' : 'black'};
  width: 25%;
  min-width: 75px;
  height: 44px;
  border-radius: 22px;
  color: white;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-image: url("${(props) => props.src}");
  background-size: 25%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Time = styled.span`
  line-height: 45px;
  font-size: 14px;
`;

const RoutineInfo = styled.div`
  display: flex;
`;

const RoutineName = styled.span`
  font-size: 14px;
  line-height: 24px;
`;

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;

const RoutineBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoutineBoxDiv = styled.div`
  display: flex;
`;