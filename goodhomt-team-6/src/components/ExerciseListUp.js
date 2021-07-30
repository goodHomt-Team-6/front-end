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
import ExerciseCategory from '../elements/ExerciseCategory';

// 운동리스트 컴포넌트
const ExerciseListUp = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSerachInput] = useState('');
  const [selected, setSelected] = useState({});
  const [clicked, isClicked] = useState(false);

  const exercise = useSelector((store) => store.exercise.exercise);
  const categoryNames = useSelector((store) => store.exercise.categoryNames);

  // 전체조회를 위한 데이터 가공
  const newnewArr = [];
  const newArr = exercise.forEach(element => { newnewArr.push(element.exerciseList); });
  const AllExercise = newnewArr.reduce((a, e) => a.concat(e), []);

  // 내가 등록한 운동 불러오기
  const myExercise = useSelector((store) => store.exercise.myExercise);

  useEffect(() => {
    dispatch(exerciseActions.getExerciseAPI());
  }, []);

  // 카테고리 아이디 찾기 (동적으로 가져와야함)
  // const searchCategory = categoryNames.filter(item => item.id === 2);
  // const searchArr = [];
  // const hey = searchCategory.forEach(element => { searchArr.push(element.exerciseList); });

  // 각 카테고리의 아이템만 가져오기
  const categoryItems = useSelector((store) => store.exercise.categoryItems);

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
                  setSelected(
                    Object.keys(selected).reduce((object, key) => {
                      if (key !== exercise) {
                        object[key] = selected[key];
                      }
                      return object;
                    }, {}),
                  );
                  dispatch(exerciseActions.removeExerciseType(exercise));
                }}
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
        <CategoryItem
          onClick={() => {
            isClicked(false);
          }}>
          전체
        </CategoryItem>
        {categoryNames
          .map((e, idx) => (
            <CategoryItem
              key={idx}
              onClick={() => {
                dispatch(exerciseActions.getExerciseTypeAPI(`${e.id}`));
                isClicked(true);
              }}
            >
              {e.categoryName}
            </CategoryItem>
          ))}

      </Category>

      {/* 운동 카테고리별 리스트 보여주기 */}
      {clicked ?
        <CategoryList>
          {categoryItems.exerciseList && // 뷰를 먼저 그리고 useEffect가 작동하는데 없어서 안된거
            categoryItems.exerciseList
              // .filter((e) => e.exercise.includes(searchInput))
              .map(e => (
                <ExerciseItem
                  key={e.id}
                  onClick={() => {
                    setSelected({
                      ...selected, [e.exerciseName]: {
                        set: [{
                          type: 'exercise',
                          count: 0,
                          weight: 0,
                        }]
                      }
                    });
                    const exercise = {
                      exerciseName: e.exerciseName,
                      set: [{
                        type: 'exercise',
                        count: 0,
                        weight: 0,
                      },],
                    };
                    // 리덕스에 추가하기
                    dispatch(exerciseActions.addExerciseType(exercise));
                  }}
                >
                  <ItemWrapper >
                    {e.exerciseName}
                  </ItemWrapper>
                </ExerciseItem>
              ))}
        </CategoryList>
        :
        // 운동 전체 리스트 보여주기
        <CategoryList>
          {AllExercise
            .map((e, idx) => (
              <ExerciseItem
                key={idx}
                onClick={() => {
                  setSelected({
                    ...selected, [e.exerciseName]: {
                      set: [{
                        type: 'exercise',
                        count: 0,
                        weight: 0,
                      }]
                    }
                  });
                  const exercise = {
                    exerciseName: e.exerciseName,
                    set: [{
                      type: 'exercise',
                      count: 0,
                      weight: 0,
                    },],
                  };
                  // 리덕스에 추가하기
                  dispatch(exerciseActions.addExerciseType(exercise));
                }}
              >
                <ItemWrapper>
                  {e.exerciseName}
                </ItemWrapper>
              </ExerciseItem>
            ))
          }
        </CategoryList>
      }

      {/* 종목 저장하기 */}
      <SaveButtonWrapper>
        <SaveButton
          onClick={() => {
            localStorage.setItem('exercise', JSON.stringify(selected));
            console.log(selected);
            history.push('/exercise/form');
          }}
        >
          종목 추가하기
        </SaveButton>
      </SaveButtonWrapper>
    </>
  );
};

export default ExerciseListUp;

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

const ItemWrapper = styled.div`
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

const CloseBtn = styled.img`
`;

const Category = styled.ul`
  display: flex;
  padding: 0px;
  list-style: none;
  margin: 40px 0px 0px 0px;
  overflow: scroll;
  white-space: nowrap;
`;

const CategoryItem = styled.li`
  list-style: none;
  padding-bottom: 15px;
  width: 33.3%;
  text-align: center;
  color: ${Color.navy};
  font-size: 1rem;
  opacity: 54%;
  color: black;
  &:hover,
  &:active {
    cursor: pointer;
  }
  border-bottom: 1px solid black;
`;

const CategoryTop = styled.li`
  list-style: none;
  padding-bottom: 15px;
  width: 33.3%;
  text-align: center;
  color: ${Color.navy};
  font-size: 1rem;
  opacity: 54%;
  color: black;
  &:hover,
  &:active {
    cursor: pointer;
    background-color: ${Color.gray};
  }
  border-bottom: 1px solid black;
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
