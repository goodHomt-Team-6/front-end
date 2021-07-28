import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Button } from '../shared/Styles';
import CloseButton from '../img/close-button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import { List } from '@material-ui/core';
import Logger from '../shared/Logger';

// 운동리스트 컴포넌트
const SelectExercise = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSerachInput] = useState('');
  const [selected, setSelected] = useState({});

  const exercise = useSelector((store) => store.exercise.exercise);
  const categoryIdTop = exercise.filter((e) => e.category_id === '상체');
  let myExercise = [];

  return (
    <>
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
        <Text>Select</Text>
      </GoBackButton>
      {/* 선택한 운동 보여주기 */}
      {Object.keys(selected).length > 0 ? (
        <SelectedWrapper>
          {Object.entries(selected).map(([exercise], i) => (
            <Selected key={i}>
              <ExerciseName>{exercise}</ExerciseName>
              <CloseBtn
                src={CloseButton}
                width="10"
                onClick={() =>
                  setSelected(
                    Object.keys(selected).reduce((object, key) => {
                      if (key !== exercise) {
                        object[key] = selected[key];
                      }
                      return object;
                    }, {}),
                  )
                }
              />
            </Selected>
          ))}
        </SelectedWrapper>
      ) : null}
      ;{/* 운동 검색 */}
      <SearchInput
        value={searchInput}
        onChange={(e) => {
          setSerachInput(e.target.value);
        }}
      />
      {/* 운동 카테고리 */}
      <Category>
        <PartofExercise>상체</PartofExercise>
        <PartofExercise>하체</PartofExercise>
        <PartofExercise>허벅지</PartofExercise>
      </Category>
      {/* 운동 카테고리별 리스트 보여주기 */}
      <ExerciseList>
        {exercise
          .filter((e) => e.exercise.includes(searchInput))
          .map((e, i) => (
            <ExerciseItem
              key={e.id}
              onClick={() => {
                setSelected({ ...selected, [e.exercise]: {} });
                // exercise.splice(exercise.filter(e => e.exercise));
                // exercise.filter(e.exercise);
                const byeonsu = {
                  exerciseName: e.exercise,
                  set: [
                    {
                      type: 'exercise',
                      count: null,
                      weight: null,
                    },
                  ],
                };
                myExercise.push({ exerciseName: byeonsu });
                console.log(myExercise);
              }}
            >
              <ItemWrapper>
                {e.exercise}
                <CalText>{e.cal}kcal</CalText>
              </ItemWrapper>
            </ExerciseItem>
          ))}
      </ExerciseList>
      {/* 종목 저장해주기 */}
      <SaveButtonWrapper>
        <SaveButton
          onClick={() => {
            localStorage.setItem('exercise', JSON.stringify(selected));
            history.push('/');
          }}
        >
          종목 추가하기
        </SaveButton>
      </SaveButtonWrapper>
    </>
  );
};

export default SelectExercise;

const GoBackButton = styled.div`
  display: flex;
  margin: 25px;
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.h2`
  margin: 0px;
  font-size: 15px;
`;

const SearchInput = styled.input`
  font-size: 15px;
  box-sizing: border-box;

  width: 100%;
  height: 48px;
  border-bottom: 1px solid black;
  border-top: none;
  border-right: none;
  border-left: none;
  &:focus,
  &:active {
    outline: none;
  }
`;

const SaveButton = styled.button`
  background-color: black;
  height: 86px;
  width: 100%;
  border: none;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
`;

const ItemWrapper = styled.div``;

const ExerciseList = styled.ul`
  padding: 0 16px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
`;

const ExerciseItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  padding: 10px;
  font-size: 1rem;
  &:hover,
  &:active {
    background-color: #c4c4c4;
  }
`;

const CalText = styled.span`
  font-size: 9px;
  color: #465678;
  line-height: 48px;
  margin: 0px 15px;
`;

// const ExerciseAddBtn = styled.button`
//   width: 32px;
//   height: 32px;
//   font-size: 24px;
//   background-color: ${Color.navy};
//   border: none;
//   border-radius: 50%;
//   top: 20px;
//   padding: 0;
//   right: 0;
//   color: white;
// `;

const SelectedWrapper = styled.div`
  height: 44px;
  overflow: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0 16px;
  padding-top: 4px;
  display: flex;
`;

const Selected = styled.div`
  font-size: 14px;
  border: 1px solid #465678;
  height: 32px;
  display: flex;
  padding: 0 8px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  margin-right: 16px;
`;

const ExerciseName = styled.span`
  margin-right: 5px;
`;

const CloseBtn = styled.img``;

const Category = styled.ul`
  display: flex;
  padding: 0px;
  /* margin: 5px 15px 30px 15px ; */
  list-style: none;
  margin: 20px 0px 0px 0px;
`;

const PartofExercise = styled.li`
  list-style: none;
  padding-bottom: 15px;
  width: 33.3%;
  text-align: center;
  color: ${Color.navy};
  font-size: 1rem;
  opacity: 54%;
  color: black;
  &:hover
  /* &:active  */ {
    border-bottom: 1px solid black;
    opacity: 100%;
  }
`;
