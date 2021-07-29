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
import searchIcon from '../img/search-icon.svg';

// 운동리스트 컴포넌트
const ExerciseList = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSerachInput] = useState('');
  const [selected, setSelected] = useState({});
  const [clicked, isClicked] = useState(false);

  const exercise = useSelector((store) => store.exercise.exercise);
  const myExercise = useSelector((store) => store.exercise.myExercise);

  // 로컬 스토리지에서 추가했던 종목 가져오기
  useEffect(() => {
    const selectedExercise = JSON.parse(localStorage.getItem("exercise"));
  });

  return (
    <>
      {/* 뒤로가기 버튼 */}
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
        <Text>Select</Text>
        <PageText>1/2</PageText>
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
                onClick={() => {
                  console.log(Object.keys(selected));
                  console.log(Object.entries(selected));
                  console.log(selected);
                  setSelected(
                    Object.keys(selected).reduce((object, key) => {
                      if (key !== exercise) {
                        object[key] = selected[key];
                      }
                      return object;
                    }, {}),
                  );
                  dispatch(exerciseActions.removeExerciseType(exercise));
                }
                }
              />
            </Selected>
          ))}
        </SelectedWrapper>
      ) : null}


      {/* 운동 검색 */}
      <SearchExercise>
        <SearchInput
          value={searchInput}
          onChange={(e) => {
            setSerachInput(e.target.value);
          }}
        />
        <SearchButton
          src={searchIcon}
        />
      </SearchExercise>

      {/* 운동 카테고리 */}
      <Category>
        <PartofExercise
          onClick={() => {
            isClicked(true);
          }}
        >상체</PartofExercise>
        <PartofExercise
          onClick={() => {
            isClicked(true);
          }}
        >하체</PartofExercise>
        <PartofExercise
          onClick={() => {
            isClicked(true);
          }}
        >허벅지</PartofExercise>
      </Category>

      {/* 운동 카테고리별 리스트 보여주기 */}
      <CategoryList>
        {exercise
          .filter((e) => e.exercise.includes(searchInput))
          .map((e, i) => (
            <ExerciseItem
              key={e.id}
              onClick={() => {
                setSelected({
                  ...selected, [e.exercise]: {
                    set: [{
                      type: 'exercise',
                      count: null,
                      weight: null,
                    }]
                  }
                });
                const exercise = {
                  exerciseName: e.exercise,
                  set: [{
                    type: 'exercise',
                    count: null,
                    weight: null,
                  },],
                };
                dispatch(exerciseActions.addExerciseType(exercise));
              }}
            >
              <ItemWrapper>
                {e.exercise}
                <CalText>{e.cal}kcal</CalText>
              </ItemWrapper>
            </ExerciseItem>
          ))}
      </CategoryList>

      {/* 종목 저장하기 */}
      <SaveButtonWrapper>
        <SaveButton
          onClick={() => {
            localStorage.setItem('exercise', JSON.stringify(selected));
            console.log(selected);
            // history.push('/');
          }}
        >
          종목 추가하기
        </SaveButton>
      </SaveButtonWrapper>
    </>
  );
};

export default ExerciseList;

const GoBackButton = styled.div`
  display: flex;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 24px;
`;

const PageText = styled.span`
  font-size: 14px;
  line-height: 2.5;
`;

const SearchExercise = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 90%;
  margin: 0px auto;
`;

const SearchInput = styled.input`
  font-size: 15px;
  padding: 0px;
  width: 100%;
  height: 48px;
  border: none;
  &:focus,
  &:active {
    outline: none;
  }
`;

const SearchButton = styled.img`
  width: 30px;
  height: 30px;
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

const CategoryList = styled.ul`
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
  list-style: none;
  margin: 40px 0px 0px 0px;
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
  &:hover,
  &:active  {
    border-bottom: 1px solid black;
  }
  border-bottom: ${props => props.isClicked ? "1px solid black" : "none"}
`;
