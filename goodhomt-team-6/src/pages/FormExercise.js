import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image } from '../shared/Styles';
import PlusButton from '../img/plus-button.svg';
import logger from '../shared/Logger';
import './FormExercise.css';
import InputExercise from '../components/InputExercise';
import { history } from '../redux/configureStore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import closeButton from '../img/close-button.svg';

const FormExercise = (props) => {
  const dispatch = useDispatch();
  const [setCount, setSetCount] = useState(1);
  const lists = useSelector((state) => state.exercise.myExercise);
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const [isExercise, setIsExercise] = useState(true);
  const editor = useSelector((state) => state.exercise.editor);
  const [idxes, updateIdxes] = useState(null);

  const openRow = (e) => {
    const target = e.currentTarget.id;
    dispatch(exerciseCreator.openRow(target));
  };

  const closeRow = () => {
    dispatch(exerciseCreator.openRow(null));
  };

  const clickSet = (listIdx) => {
    setIsExercise(true);
    dispatch(exerciseCreator.addSet(listIdx));
  };

  const clickBreak = (listIdx) => {
    setIsExercise(false);
    dispatch(exerciseCreator.addBreak(listIdx));
  };

  return (
    <React.Fragment>
      {/* 뒤로가기 버튼 */}
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
        <Text type="title" margin="0px 5px 0px 0px;" fontSize="24px;">
          Select
        </Text>
        <PageText>2/2</PageText>
      </GoBackButton>
      {/* 클릭한 list만 재렌더링 되도록 최적화 필요 */}
      <Container>
        {lists.map((list, listIdx) =>
          listIdx === parseInt(openedRow) ? (
            <OpenList id={listIdx} key={listIdx}>
              <Text
                type="contents"
                width="100%"
                padding="20px 0 0 20px"
                margin="0"
                onClick={() => {
                  closeRow();
                }}
              >
                {list.exerciseName}
              </Text>
              {list.set.map((set, setIdx) => (
                <DataRow
                  key={setIdx}
                  onClick={() => {
                    dispatch(exerciseCreator.openEditor(true));
                    updateIdxes({ listIdx: listIdx, setIdx: setIdx });
                    set.type === 'exercise'
                      ? setIsExercise(true)
                      : setIsExercise(false);
                  }}
                >
                  {list.set.length != 1 && (
                    <img
                      src={closeButton}
                      width="13"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          exerciseCreator.deleteSet({
                            listIdx: listIdx,
                            setIdx: setIdx,
                          }),
                        );
                      }}
                    />
                  )}
                  <Text
                    type="contents"
                    fontSize="1.3em"
                    minWidth="80px"
                    color="#848484"
                  >
                    {set.type === 'exercise' ? `${set.setCount}세트` : '휴식'}
                  </Text>
                  <Text
                    type="contents"
                    fontSize="1.3em"
                    minWidth="80px"
                    textAlign="center"
                    color="#848484"
                  >
                    {set.type === 'exercise'
                      ? `${set.weight}Kg`
                      : `${set.minutes}분`}
                  </Text>
                  <Text
                    type="contents"
                    fontSize="1.3em"
                    minWidth="80px"
                    textAlign="right"
                    color="#848484"
                  >
                    {set.type === 'exercise'
                      ? `${set.count}회`
                      : `${set.seconds}초`}
                  </Text>
                </DataRow>
              ))}
              <ButtonCont>
                <ButtonWrap>
                  <RadioInput
                    type="radio"
                    name={`exercise_${listIdx}`}
                    defaultChecked
                  />
                  <RadioP className="list" onClick={() => clickSet(listIdx)}>
                    세트
                  </RadioP>
                </ButtonWrap>
                <ButtonWrap>
                  <RadioInput type="radio" name={`exercise_${listIdx}`} />
                  <RadioP className="list" onClick={() => clickBreak(listIdx)}>
                    휴식
                  </RadioP>
                </ButtonWrap>
              </ButtonCont>
            </OpenList>
          ) : (
            <List
              id={listIdx}
              key={listIdx}
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
              <Text type="contents">{list.set[0].weight}kg</Text>
              <Text type="contents" padding="0 10px 0 0">
                {list.set[0].count}회
              </Text>
            </List>
          ),
        )}
      </Container>
      <Footer>설정 완료</Footer>
      {editor && (
        <InputExercise isExercise={isExercise} idxes={idxes}></InputExercise>
      )}
    </React.Fragment>
  );
};

export default FormExercise;

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: calc(100vh - 145px);
  overflow-y: scroll;
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

const GoBackButton = styled.div`
  display: flex;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
`;

const PageText = styled.span`
  font-size: 14px;
  line-height: 2.5;
`;
