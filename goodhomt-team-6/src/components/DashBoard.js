import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';


// 대시보드 컴포넌트
const DashBoard = (props) => {
  const selectedItems = useSelector((store) => store.exercise.selectedItems);
  console.log(selectedItems);

  return (
    <>
      <MainBox>
        <TodayWrapper>
          <Enrolled>{selectedItems[0].myExercise.length}</Enrolled>
        </TodayWrapper>
        <TypeContainer>
          <TypeWrapper>
            <span>종목</span>
            <span>{selectedItems[0].routineName}</span>
          </TypeWrapper>
          <TypeWrapper>
            <span>운동시간</span>
            <span>0m</span>
          </TypeWrapper>
        </TypeContainer>
      </MainBox>
    </>
  );
};

export default DashBoard;

const MainBox = styled.div`
  margin: 0px 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  box-sizing: border-box;
  padding: 10px 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1);
  transition: background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
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

const Enrolled = styled.span`
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1;
`;

const TypeContainer = styled.div`
  display: flex;
`;

const TypeWrapper = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 25px;
  &:last-child {
    border-left: 1px solid black;
  }
`;