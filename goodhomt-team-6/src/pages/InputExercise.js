import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image } from '../shared/Styles';
import logger from '../shared/Logger';

const InputExercise = ({ isExercise, idxes }) => {
  const dispatch = useDispatch();
  const [inputEditWeight, setInputEditWeight] = useState(true);
  const [inputEditCount, setInputEditCount] = useState(false);
  const editor = useSelector((state) => state.exercise.editor);
  const [weight, setWeight] = useState(0);
  const [count, setCount] = useState(0);
  const [unit, setUnit] = useState(1);
  const completeEdit = () => {
    const set = {
      count: count,
      weight: weight,
    };
    dispatch(exerciseCreator.updateSet(set, idxes));
    dispatch(exerciseCreator.openEditor(false));
  };

  return (
    <InputCont>
      <DataRow>
        <Text type="contents" fontSize="1.3em" minWidth="80px" color="#848484">
          {isExercise ? `1세트` : '휴식'}
        </Text>
        <Text
          type="contents"
          fontSize="1.3em"
          minWidth="80px"
          textAlign="center"
          color="#848484"
          clicked={inputEditWeight}
          onClick={() => {
            if (isExercise) {
              setInputEditCount(false);
              setInputEditWeight(true);
            }
          }}
        >
          {isExercise ? `${weight}Kg` : '0분'}
        </Text>
        <Text
          type="contents"
          fontSize="1.3em"
          minWidth="80px"
          textAlign="right"
          color="#848484"
          clicked={inputEditCount}
          onClick={() => {
            if (isExercise) {
              setInputEditCount(true);
              setInputEditWeight(false);
            }
          }}
        >
          {isExercise ? `${count}회` : '0초'}
        </Text>
      </DataRow>
      {(inputEditWeight || inputEditCount) && (
        <InputForm>
          <InputHeader>
            <Submit
              color="#757575"
              onClick={() => {
                dispatch(exerciseCreator.openEditor(false));
              }}
            >
              취소
            </Submit>
            <Submit
              color="#000"
              onClick={() => {
                completeEdit();
              }}
            >
              완료
            </Submit>
          </InputHeader>
          <InputBody>
            <Button
              height="48px"
              width="48px"
              fontSize="24px"
              bgColor="#E5E5E7"
              _onClick={() => {
                if (inputEditWeight) {
                  if (parseInt(weight / unit) === 0) {
                    setWeight(0);
                  } else {
                    setWeight(weight - unit);
                  }
                } else if (inputEditCount) {
                  if (parseInt(count / unit) === 0) {
                    setCount(0);
                  } else {
                    setCount(count - unit);
                  }
                }
              }}
            >
              -
            </Button>
            <Text type="contents" fontSize="28px">
              {inputEditWeight && `${weight}kg`}
              {inputEditCount && `${count}회`}
            </Text>
            <Button
              height="48px"
              width="48px"
              fontSize="24px"
              bgColor="#E5E5E7"
              _onClick={() => {
                if (inputEditWeight) {
                  setWeight(weight + unit);
                } else if (inputEditCount) {
                  setCount(count + unit);
                }
              }}
            >
              +
            </Button>
          </InputBody>
          <InputFooter>
            <ButtonCont>
              <ButtonWrap>
                <RadioInput type="radio" name={'inputButton'} defaultChecked />
                <RadioP className="input" onClick={() => setUnit(1)}>
                  {inputEditWeight && `1kg`}
                  {inputEditCount && `1회`}
                </RadioP>
              </ButtonWrap>
              <ButtonWrap>
                <RadioInput type="radio" name={'inputButton'} />
                <RadioP className="input" onClick={() => setUnit(5)}>
                  {inputEditWeight && `5kg`}
                  {inputEditCount && `5회`}
                </RadioP>
              </ButtonWrap>
              <ButtonWrap>
                <RadioInput type="radio" name={'inputButton'} />
                <RadioP className="input" onClick={() => setUnit(10)}>
                  {inputEditWeight && `10kg`}
                  {inputEditCount && `10회`}
                </RadioP>
              </ButtonWrap>
            </ButtonCont>
          </InputFooter>
        </InputForm>
      )}
    </InputCont>
  );
};

export default InputExercise;

const InputCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(22, 26, 29, 0.95);
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  height: 50vh;
  align-items: center;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    border-bottom: 1px solid #fff;
    top: calc(50% + 35px);
    width: 100%;
    height: 1px;
  }
`;

const InputForm = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50vh;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
`;

const InputHeader = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const InputBody = styled.div`
  background-color: #f7f7fa;
  height: calc(100% - 140px);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InputFooter = styled.div`
  height: 100px;
`;

const Submit = styled.div`
  height: 100%;
  width: 65px;
  text-align: center;
  line-height: 40px;
  color: ${(props) => props.color};
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
  font-size: 16px;
  border-radius: 10px;
  user-select: none;
  font-weight: 500;
`;
