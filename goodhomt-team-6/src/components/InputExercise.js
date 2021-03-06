import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image, FooterButton } from '../shared/Styles';
import logger from '../shared/Logger';
import MuButton from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './InputExercise.css';
import SimpleSlider from './TimePicker';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { findLastIndex } from 'lodash';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const InputExercise = ({ isExercise, idxes, exerciseName }) => {
  const alertClasses = useStyles();
  const [alert, openAlert] = React.useState(false);
  const dispatch = useDispatch();

  const savedSet = useSelector(
    (state) => state.exercise.routine[0].myExercise[idxes.listIdx].set,
  );
  const [inputEditWeight, setInputEditWeight] = useState(true);
  const [inputEditCount, setInputEditCount] = useState(false);
  const editor = useSelector((state) => state.exercise.editor);
  const [weight, setWeight] = useState(savedSet[idxes.setIdx].weight);
  const [count, setCount] = useState(savedSet[idxes.setIdx].count);
  const [unit, setUnit] = useState(1);
  const minutes = savedSet[idxes.setIdx].minutes;
  const seconds = savedSet[idxes.setIdx].seconds;

  const completeEdit = () => {
    if (inputEditWeight && count === 0) {
      setInputEditCount(true);
      setInputEditWeight(false);
      return;
    } else if (inputEditCount && count === 0) {
      // 횟수 입력 안했을때 경고창 띄우기
      openAlert(true);
      return;
    }
    if (isExercise) {
      const set = {
        count: count,
        weight: weight,
      };
      dispatch(exerciseCreator.updateSet(set, idxes));
    }
    dispatch(exerciseCreator.openEditor(false));
  };

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    openAlert(false);
  };

  return (
    <InputCont>
      <Text
        type="contents"
        margin="0"
        color="#fff"
        fontSize="1.2em"
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          left: '10px',
          top: '27px',
          zIndex: '9999',
        }}
        onClick={() => {
          dispatch(exerciseCreator.openEditor(false));
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        {exerciseName}
      </Text>
      <DataRow>
        <Text type="contents" fontSize="1.3em" minWidth="80px" color="#fff">
          {isExercise ? `${savedSet[idxes.setIdx].setCount}세트` : '휴식'}
        </Text>
        {inputEditWeight ? (
          <Text
            type="contents"
            fontSize="1.3em"
            minWidth="80px"
            textAlign="center"
            color="#fff"
            onClick={() => {
              if (isExercise) {
                setInputEditCount(false);
                setInputEditWeight(true);
              }
            }}
          >
            {isExercise ? `${weight}Kg` : `${minutes}분`}
          </Text>
        ) : (
          <Text
            type="contents"
            fontSize="1.3em"
            minWidth="80px"
            textAlign="center"
            color="#848484"
            onClick={() => {
              if (isExercise) {
                setInputEditCount(false);
                setInputEditWeight(true);
              }
            }}
          >
            {isExercise ? `${weight}Kg` : `${minutes}분`}
          </Text>
        )}
        {inputEditCount || !isExercise ? (
          <Text
            type="contents"
            fontSize="1.3em"
            minWidth="80px"
            textAlign="right"
            color="#fff"
            onClick={() => {
              if (isExercise) {
                setInputEditCount(true);
                setInputEditWeight(false);
              }
            }}
          >
            {isExercise ? `${count}회` : `${seconds}초`}
          </Text>
        ) : (
          <Text
            type="contents"
            fontSize="1.3em"
            minWidth="80px"
            textAlign="right"
            color="#848484"
            onClick={() => {
              if (isExercise) {
                setInputEditCount(true);
                setInputEditWeight(false);
              }
            }}
          >
            {isExercise ? `${count}회` : `${seconds}초`}
          </Text>
        )}
      </DataRow>
      {(inputEditWeight || inputEditCount) && (
        <InputForm>
          {isExercise ? (
            <>
              <InputFooter>
                <ButtonCont>
                  <ButtonWrap>
                    <RadioInput
                      type="radio"
                      name={'inputButton'}
                      defaultChecked
                    />
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
            </>
          ) : (
            <SimpleSlider idxes={idxes} />
          )}
          <FooterButton
            style={{ backgroundColor: '#4A40FF' }}
            onClick={() => {
              completeEdit();
            }}
          >
            {inputEditWeight && isExercise && '다음'}
            {(inputEditCount || !isExercise) && '완료'}
          </FooterButton>
        </InputForm>
      )}
      <div className={alertClasses.root}>
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={closeAlert}
          style={{ bottom: '50% !important' }}
        >
          <Alert onClose={closeAlert} severity="error">
            횟수를 입력해주세요!
          </Alert>
        </Snackbar>
      </div>
    </InputCont>
  );
};

export default InputExercise;

const innerHeight = window.innerHeight;

const InputCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${innerHeight - 60}px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(22, 26, 29, 0.98);
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  height: ${innerHeight / 2}px;
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
  height: ${innerHeight / 2}px;
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
  height: calc(100% - 100px);
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
  padding: 11px 20px;
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

const Picker = styled.div``;
