import React, { useState, useRef, useMemo, useEffect } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image, FooterButton } from '../shared/Styles';
import PurePlusButtonGrey from '../img/pure-plus-button-grey.svg';
import PurePlusButtonBlack from '../img/pure-plus-button-black.svg';
import ReArrangementNavy from '../img/re-arrangement-navy.svg';
import ReArrangementBlack from '../img/re-arrangement-black.svg';
import logger from '../shared/Logger';
import './FormExercise.css';
import InputExercise from '../components/InputExercise';
import { history } from '../redux/configureStore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import closeButton from '../img/close-button.svg';
import FormExerciseDnd from '../components/FormExerciseDnd';
import removeStick from '../img/remove_stick.svg';

// material-ui 모달
import { makeStyles } from '@material-ui/core/styles';
import ModalView from '../components/Modal';

const modalStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const innerHeight = window.innerHeight - 181;

const FormExercise = (props) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.exercise.routine[0].myExercise);
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const [isExercise, setIsExercise] = useState(true);
  const editor = useSelector((state) => state.exercise.editor);
  const [idxes, updateIdxes] = useState(null);
  const [reArrangement, setReArrangement] = useState(false);

  // 모든 운동의 첫 세트의 횟수가 0이 아니면 설정 완료 버튼 활성화 (무게는 무중량 운동일수도 있으므로 제외.)
  const [editCompletion, setEditCompletion] = useState(false);
  const [checkCompletion, setCheckCompletion] = useState(false);

  useEffect(() => {
    if (lists) {
      for (let list in lists) {
        if (lists[list].set[0].count === 0) {
          setCheckCompletion(false);
          return;
        } else {
          setCheckCompletion(true);
        }
      }
    }
  });

  useEffect(() => {
    setEditCompletion(checkCompletion);
  }, [checkCompletion]);

  useEffect(() => {
    return () => {
      closeRow();
    };
  }, []);

  // material-ui 모달
  const classes = modalStyles();
  const [open, setOpen] = React.useState(false);

  const switchModal = (value) => {
    setOpen(value);
  };

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
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <Text type="title" margin="0px 5px 0px 0px;" fontSize="18px;">
          Select
        </Text>
        <PageText>2/2</PageText>
      </GoBackButton>
      {/* 클릭한 list만 재렌더링 되도록 최적화 필요 */}
      <OptionCont reArrangement={reArrangement}>
        {reArrangement && (
          <DeleteAll
            onClick={() => {
              dispatch(exerciseCreator.removeSelectedItem());
              dispatch(exerciseCreator.removeExerciseType());
            }}
          >
            <Image
              src={removeStick}
              width="24px"
              height="24px"
              borderRadius="0"
              margin="0 5px 0 0"
            />
            <Text type="contents" fontSize="13px" margin="0 3px 0 0">
              전체 삭제
            </Text>
          </DeleteAll>
        )}
        <OptionContRight>
          <Image
            src={PurePlusButtonBlack}
            width="15px"
            height="15px"
            borderRadius="0"
            margin="0 25px 0 0"
            _onClick={() => {
              history.push('/exercise');
            }}
          ></Image>
          {!reArrangement ? (
            <Image
              src={ReArrangementBlack}
              width="18px"
              height="18px"
              borderRadius="0"
              margin="0 20px 0 0"
              _onClick={() => {
                setReArrangement(!reArrangement);
              }}
            ></Image>
          ) : (
            <Image
              src={ReArrangementNavy}
              width="18px"
              height="18px"
              borderRadius="0"
              margin="0 20px 0 0"
              _onClick={() => {
                setReArrangement(!reArrangement);
              }}
            ></Image>
          )}
        </OptionContRight>
      </OptionCont>
      {!reArrangement ? (
        <Container>
          {lists.map((list, listIdx) =>
            listIdx === parseInt(openedRow) ? (
              <OpenList id={listIdx} key={listIdx}>
                <Text
                  type="contents"
                  width="100%"
                  padding="20px 0 0 20px"
                  margin="0"
                  fontWeight="600"
                  fontSize="1.1em"
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
                      color="#000"
                    >
                      {set.type === 'exercise' ? `${set.setCount}세트` : '휴식'}
                    </Text>
                    <Text
                      type="contents"
                      fontSize="1.3em"
                      minWidth="80px"
                      textAlign="center"
                      color="#000"
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
                      color="#000"
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
                    <RadioP
                      className="list"
                      onClick={() => clickBreak(listIdx)}
                    >
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
                isColoredList={list.set[0].count > 0}
              >
                {list.set[0].count > 0 && openedRow === null ? (
                  <>
                    <Text
                      type="contents"
                      minWidth="80px"
                      padding="0 0 0 10px"
                      fontWeight="600"
                      fontSize="1.1em"
                      color="#000"
                    >
                      {list.exerciseName}
                    </Text>
                    <Text type="contents" color="#000">
                      {list.set.filter((set) => set.type === 'exercise').length}
                      세트
                    </Text>
                    <Text type="contents" color="#000">
                      {list.set[0].weight}kg
                    </Text>
                    <Text type="contents" padding="0 20px 0 0" color="#000">
                      {list.set[0].count}회
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      type="contents"
                      minWidth="80px"
                      padding="0 0 0 20px"
                      fontWeight="600"
                      fontSize="1.1em"
                      color="#848484"
                    >
                      {list.exerciseName}
                    </Text>
                    <Text type="contents" color="#848484">
                      {list.set.filter((set) => set.type === 'exercise').length}
                      세트
                    </Text>
                    <Text type="contents" color="#848484">
                      {list.set[0].weight}kg
                    </Text>
                    <Text type="contents" padding="0 20px 0 0" color="#848484">
                      {list.set[0].count}회
                    </Text>
                  </>
                )}
              </List>
            ),
          )}
        </Container>
      ) : (
        <FormExerciseDnd></FormExerciseDnd>
      )}

      {editCompletion ? (
        <FooterButton
          onClick={() => {
            const routine = {
              myExercise: lists,
            };
            dispatch(exerciseCreator.addRoutineAPI(routine));
          }}
        >
          설정 완료
        </FooterButton>
      ) : (
        <FooterButton disabled>설정 완료</FooterButton>
      )}

      {editor && (
        <InputExercise
          isExercise={isExercise}
          idxes={idxes}
          exerciseName={lists[idxes.listIdx].exerciseName}
        ></InputExercise>
      )}
      <ModalView classes={classes} switchModal={switchModal} open={open} />
    </React.Fragment>
  );
};

export default FormExercise;

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: ${innerHeight}px;
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
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-left: ${(props) =>
    props.isColoredList ? '8px solid rgba(74, 64, 255, 0.3)' : ''};
`;

const OpenList = styled.div`
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
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
  height: 35px;
  padding: 0px 15px;
  color: #4a40ff;
  font-size: 14px;
  border: 1px solid #4a40ff;
  border-radius: 25px;
  background-color: rgb(255, 255, 255);
  user-select: none;
`;

const GoBackButton = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-start;
  padding: 25px;
  box-sizing: border-box;
  align-items: baseline;
  background-color: #f7f7fa;
`;

const PageText = styled.span`
  font-size: 14px;
  line-height: 2.5;
`;

const OptionCont = styled.div`
  background-color: #f7f7fa;
  display: flex;
  justify-content: ${(props) =>
    props.reArrangement ? 'space-between' : 'flex-end'};
  padding: 10px 0 0;
  align-items: center;
  min-height: 36px;
`;

const DeleteAll = styled.div`
  display: flex;
  width: 108px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  margin-left: 20px;
  min-height: 32px;
  border-radius: 16px;
  line-height: 32px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const OptionContRight = styled.div`
  display: flex;
`;
