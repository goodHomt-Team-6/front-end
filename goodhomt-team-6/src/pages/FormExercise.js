import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image } from '../shared/Styles';
import PlusButton from '../img/plus-button.svg';
import logger from '../shared/Logger';

const App = (props) => {
  const dispatch = useDispatch();
  const [setCount, setSetCount] = useState(1);
  const lists = useSelector((state) => state.exercise.myExercise);
  const openedRow = useSelector((state) => state.exercise.openedRow);

  const openRow = (e) => {
    const target = e.currentTarget.id;
    dispatch(exerciseCreator.openRow(target));
  };

  const saveData = (e) => {
    dispatch(exerciseCreator.addSetData());
    const target = e.currentTarget;
  };

  return (
    <React.Fragment>
      {/* 클릭한 list만 재렌더링 되도록 최적화 필요 */}
      <Container>
        {lists.map(
          (list, idx) => (
            // idx === parseInt(openedRow) ? (
            <OpenList id={idx} key={idx}>
              <Text type="contents" width="100%" padding="20px 0 0 20px">
                {list.exerciseName}
              </Text>
              <DataRow>
                <Text type="contents" fontSize="1.3em" minWidth="80px">
                  1세트
                </Text>
                <Text
                  type="contents"
                  fontSize="1.3em"
                  minWidth="80px"
                  textAlign="center"
                >
                  0Kg
                </Text>
                <Text
                  type="contents"
                  fontSize="1.3em"
                  minWidth="80px"
                  textAlign="right"
                >
                  0회
                </Text>
              </DataRow>
              <ButtonCont>
                <ButtonWrap>
                  <RadioInput type="radio" name="set" />
                  <RadioP>세트</RadioP>
                </ButtonWrap>
                <ButtonWrap>
                  <RadioInput type="radio" name="set" />
                  <RadioP>세트</RadioP>
                </ButtonWrap>
                {/* <Button
                  width="48%"
                  bgColor="#000"
                  color="#fff"
                  padding="12px 0"
                  borderRadius="21px"
                >
                  세트
                </Button>
                <Button
                  width="48%"
                  bgColor="#000"
                  color="#fff"
                  padding="12px 0"
                  borderRadius="21px"
                >
                  휴식
                </Button> */}
              </ButtonCont>
            </OpenList>
          ),
          // ) : (
          //   <List
          //     id={idx}
          //     key={idx}
          //     onClick={(e) => {
          //       openRow(e);
          //     }}
          //   >
          //     <Text type="contents" minWidth="80px" padding="0 0 0 10px">
          //       {list.exerciseName}
          //     </Text>
          //     <Text type="contents">
          //       {list.set.filter((set) => set.type === 'exercise').length}
          //       세트
          //     </Text>
          //     <Text type="contents">0kg</Text>
          //     <Text type="contents" padding="0 10px 0 0">
          //       0번
          //     </Text>
          //   </List>
          // )
        )}
      </Container>
      <Footer>설정 완료</Footer>
    </React.Fragment>
  );
};

export default App;

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
  background-color: #000;
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
  width: 90%;
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
  color: #fff;
  width: 48%;
  background-color: #000;
  padding: 12px 0;
  font-size: 1em;
`;
