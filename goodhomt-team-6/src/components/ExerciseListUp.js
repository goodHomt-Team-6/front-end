import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Button, FooterButton } from '../shared/Styles';
import CloseButton from '../img/close-button.svg';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import { List } from '@material-ui/core';
import Logger from '../shared/Logger';
import searchIcon from '../img/search-icon.svg';
import { Opacity } from '@material-ui/icons';

// 운동리스트 컴포넌트
const ExerciseListUp = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [clicked, isClicked] = useState(false);
  const [selected, isSelected] = useState(false);
  const [clickedCategoryItem, setCategoryItem] = useState(null);

  const exerciseAll = useSelector((store) => store.exercise.exercise);
  const categoryTitle = useSelector((store) => store.exercise.categoryTitle);
  const categoryItems = useSelector((store) => store.exercise.categoryItems);
  const selectedItems = useSelector((store) => store.exercise.selectedItems);
  const myExercise = useSelector((store) => store.exercise.routine.myExercise);

  useEffect(() => {
    dispatch(exerciseActions.getExerciseAPI());
  }, [selectedItems]);

  useEffect(() => {
    if (clickedCategoryItem !== null) {
      dispatch(exerciseActions.getExerciseTypeAPI(clickedCategoryItem));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (myExercise && myExercise.length > 0) {
      isSelected(true);
      return;
    } else {
      isSelected(false);
      return;
    }
  }, [myExercise]);

  return (
    <>
      {/* 뒤로가기 */}
      <GoBackButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <Text>Select</Text>
        <PageText>1/2</PageText>
      </GoBackButton>

      {/* 선택한 운동 보여주기 */}
      {selectedItems && (
        <SelectedWrapper>
          {selectedItems.map((e, i) => (
            <Selected key={i}>
              <ExerciseName>{e.exerciseName}</ExerciseName>
              <CloseBtn
                src={CloseButton}
                width="10"
                onClick={() => {
                  dispatch(exerciseActions.removeSelectedItem(e));
                  dispatch(exerciseActions.removeExerciseType(e));
                }}
              />
            </Selected>
          ))}
        </SelectedWrapper>
      )}

      {/* 운동 검색 */}
      <SearchWrapper>
        <SearchInput
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <SearchButton src={searchIcon} />
      </SearchWrapper>

      {/* 운동 카테고리 */}
      <Category>
        <CategoryItem
          onClick={() => {
            isClicked(false);
          }}
        >
          전체
        </CategoryItem>
        {categoryTitle.map((e, i) => (
          <CategoryItem
            key={i}
            onClick={() => {
              dispatch(exerciseActions.getExerciseTypeAPI(`${e.id}`));
              setCategoryItem(e.id);
              isClicked(true);
            }}
          >
            {e.categoryName}
          </CategoryItem>
        ))}
      </Category>

      {/* 운동 카테고리별 리스트 보여주기 */}
      {clicked ? (
        <CategoryList>
          {categoryItems &&
            categoryItems
              .filter((e) => e.exerciseName.includes(searchInput))
              .map((e) => (
                <ExerciseItem
                  key={e.id}
                  onClick={() => {
                    const exercise = {
                      exerciseName: e.exerciseName,
                      set: [
                        {
                          type: 'exercise',
                          count: 0,
                          weight: 0,
                          setCount: 1,
                        },
                      ],
                    };
                    dispatch(exerciseActions.addExerciseType(exercise));
                    dispatch(exerciseActions.addSelectedItem(e));
                  }}
                >
                  <ItemWrapper>{e.exerciseName}</ItemWrapper>
                </ExerciseItem>
              ))}
        </CategoryList>
      ) : (
        // 운동 전체 리스트 보여주기
        <CategoryList>
          {exerciseAll
            .filter((e) => e.exerciseName.includes(searchInput))
            .map((e, i) => (
              <ExerciseItem
                key={i}
                onClick={() => {
                  const exercise = {
                    exerciseName: e.exerciseName,
                    set: [
                      {
                        type: 'exercise',
                        count: 0,
                        weight: 0,
                        setCount: 1,
                      },
                    ],
                  };
                  dispatch(exerciseActions.addExerciseType(exercise));
                  dispatch(exerciseActions.addSelectedItem(e));
                }}
              >
                <ItemWrapper>{e.exerciseName}</ItemWrapper>
              </ExerciseItem>
            ))}
        </CategoryList>
      )}

      {/* 종목 추가하기 */}
      <FooterButtonWrapper>
        {selected ? (
          <FooterButton
            onClick={() =>
              history.push('/exercise/form')}
          >종목 추가하기
          </FooterButton>
        ) : (
          <FooterButton
            disabled
          >종목 추가하기
          </FooterButton>
        )}
      </FooterButtonWrapper>
    </>
  );
};

export default ExerciseListUp;

const GoBackButton = styled.div`
  display: flex;
  margin: 25px;
  /* width: 100%; */
  box-sizing: border-box;
  align-items: baseline;
`;

const Text = styled.h2`
  margin: 0px 5px 0px 0px;
  font-size: 24px;
`;

const PageText = styled.span`
  font-size: 14px;
  line-height: 2.5;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
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
  width: 25px;
  height: 25px;
`;

const CategoryList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: calc(100vh - 314px);
  overflow-x: scroll;
  background-color: #F7F7FA;
`;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  padding: 10px 18px;
  font-size: 1rem;
  &:hover,
  &:active {
    background-color: #c4c4c4;
  }
`;

const ItemWrapper = styled.div``;

const SelectedWrapper = styled.div`
  height: auto;
  overflow-x: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
  box-sizing: border-box;
  margin: 15px 16px;
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
  &:hover {
    cursor: pointer;
  }
`;

const Category = styled.ul`
  display: flex;
  padding: 0px;
  list-style: none;
  margin: 40px 0px 0px 0px;
  overflow-x: scroll;
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
    color: ${Color.navy};
  }
  border-bottom: 1px solid black;
`;

const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
