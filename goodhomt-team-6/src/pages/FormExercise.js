import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image } from '../shared/Styles';
import PlusButton from '../img/plus-button.svg';
import logger from '../shared/Logger';
import './FormExercise.css';
import InputExercise from './InputExercise';

const FormExercise = (props) => {
  const dispatch = useDispatch();
  const [setCount, setSetCount] = useState(1);
  const lists = useSelector((state) => state.exercise.myExercise);
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const [isExercise, setIsExercise] = useState(true);
  const [editWeight, setEditWeight] = useState(false);
  const [editCount, setEditCount] = useState(false);
  // const [disabled, setDisabled] = useState(true);

  const openRow = (e) => {
    const target = e.currentTarget.id;
    dispatch(exerciseCreator.openRow(target));
    // setDisabled(false);
  };

  const saveData = (e) => {
    dispatch(exerciseCreator.addSetData());
    const target = e.currentTarget;
  };

  const clickSet = () => {
    setIsExercise(true);
  };

  const clickBreak = () => {
    setIsExercise(false);
  };

  return (
    <React.Fragment>
      <Header>
        <Title>
          &#60; <PageName>Select</PageName>
          <Paging>2/2</Paging>
        </Title>
      </Header>
      {/* 클릭한 list만 재렌더링 되도록 최적화 필요 */}
      <Container>
        {lists.map((list, idx) =>
          idx === parseInt(openedRow) ? (
            <OpenList id={idx} key={idx}>
              <Text type="contents" width="100%" padding="20px 0 0 20px">
                {list.exerciseName}
              </Text>
              <DataRow>
                <Text
                  type="contents"
                  fontSize="1.3em"
                  minWidth="80px"
                  color="#848484"
                >
                  {isExercise ? `1세트` : '휴식'}
                </Text>
                <Text
                  type="contents"
                  fontSize="1.3em"
                  minWidth="80px"
                  textAlign="center"
                  color="#848484"
                  onClick={() => setEditWeight(isExercise)}
                >
                  {isExercise ? '0Kg' : '0분'}
                </Text>
                <Text
                  type="contents"
                  fontSize="1.3em"
                  minWidth="80px"
                  textAlign="right"
                  color="#848484"
                >
                  {isExercise ? '0회' : '0초'}
                </Text>
              </DataRow>
              <ButtonCont>
                <ButtonWrap>
                  <RadioInput
                    type="radio"
                    name={`exercise_${idx}`}
                    defaultChecked
                  />
                  <RadioP onClick={() => clickSet()}>세트</RadioP>
                </ButtonWrap>
                <ButtonWrap>
                  <RadioInput type="radio" name={`exercise_${idx}`} />
                  <RadioP onClick={() => clickBreak()}>휴식</RadioP>
                </ButtonWrap>
              </ButtonCont>
            </OpenList>
          ) : (
            <List
              id={idx}
              key={idx}
              onClick={(e) => {
                openRow(e);
              }}
            >
              <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                {list.exerciseName}
              </Text>
              <Text type="contents">
                {list.set.filter((set) => set.type === 'exercise').length}
                세트
              </Text>
              <Text type="contents">0kg</Text>
              <Text type="contents" padding="0 10px 0 0">
                0회
              </Text>
            </List>
          ),
        )}
      </Container>
      <Footer>설정 완료</Footer>
      <InputExercise editWeight editCount></InputExercise>
    </React.Fragment>
  );
};

export default FormExercise;

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: calc(92vh - 60px);
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

const OpenList = styled.div`
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

const Footer = styled.div`
  background-color: ${(props) => (props.disabled ? `#9E9EA0;` : '#000')};
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin: 0 20px;
`;

const ButtonCont = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrap = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  width: 47%;
`;

const RadioInput = styled.input`
  width: 0px;
  height: 0px;
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const RadioP = styled.p`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 46px;
  padding: 0px 15px;
  color: rgb(102, 102, 102);
  font-size: 14px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 25px;
  background-color: rgb(255, 255, 255);
  user-select: none;
`;

const Header = styled.div`
  height: 8vh;
`;

const Title = styled.h1`
  height: 100%;
  margin: 0 0 0 10px;
  font-size: 15px;
  color: ${Color.navy};
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Paging = styled.span`
  color: #727273;
  font-size: 11px;
  padding-top: 4px;
`;

const PageName = styled.span`
  font-size: 16px;
  margin: 0 5px;
`;
