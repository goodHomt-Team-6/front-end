import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { useSelector, useDispatch } from 'react-redux';
import searchIcon from '../img/search-icon.svg';

// 운동 카테고리 컴포넌트
const Category = (props) => {
  const dispatch = useDispatch();
  const [clicked, isClicked] = useState(false);

  const categoryTitle = useSelector((store) => store.exercise.categoryTitle);
  const exerciseAll = useSelector((store) => store.exercise.exercise);
  const categoryItems = useSelector((store) => store.exercise.categoryItems);
  const selectedItems = useSelector((store) => store.exercise.selectedItems);

  const [clickedCategoryItem, setCategoryItem] = useState(null);
  const [allClicked, setAllClicked] = useState(true);
  const [topClicked, setTopClicked] = useState(false);
  const [bottomClicked, setBottomClicked] = useState(false);
  const [elseClicked, setElseClicked] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(exerciseActions.getExerciseAPI());
  }, []);

  useEffect(() => {
    if (clickedCategoryItem !== null) {
      dispatch(exerciseActions.getExerciseTypeAPI(clickedCategoryItem));
    }
  }, [selectedItems]);

  const allClickedYes = () => {
    setAllClicked(true);
    setTopClicked(false);
    setBottomClicked(false);
    setElseClicked(false);
    dispatch(exerciseActions.getExerciseAPI());
    isClicked(false);
  };

  const TopClickedYes = () => {
    setAllClicked(false);
    setTopClicked(true);
    setBottomClicked(false);
    setElseClicked(false);
    dispatch(exerciseActions.getExerciseTypeAPI(1));
    isClicked(true);
    setCategoryItem(1);
  };

  const BottomClickedYes = () => {
    setAllClicked(false);
    setTopClicked(false);
    setBottomClicked(true);
    setElseClicked(false);
    dispatch(exerciseActions.getExerciseTypeAPI(2));
    isClicked(true);
    setCategoryItem(2);
  };

  const ElseClickedYes = () => {
    setAllClicked(false);
    setTopClicked(false);
    setBottomClicked(false);
    setElseClicked(true);
    dispatch(exerciseActions.getExerciseTypeAPI(3));
    isClicked(true);
    setCategoryItem(3);
  };

  return (
    <>
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
      <Categories>
        <CategoryItem handle={allClicked} onClick={allClickedYes}>
          전체
        </CategoryItem>
        <CategoryItem handle={topClicked} onClick={TopClickedYes}>
          상체
        </CategoryItem>
        <CategoryItem handle={bottomClicked} onClick={BottomClickedYes}>
          하체
        </CategoryItem>
        <CategoryItem handle={elseClicked} onClick={ElseClickedYes}>
          기타
        </CategoryItem>
      </Categories>

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
    </>
  );
};

export default Category;

const innerHeight = window.innerHeight - 285;

const CategoryList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  height: ${innerHeight}px;
  overflow-x: scroll;
  background-color: #f7f7fa;
`;

const Categories = styled.ul`
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
  color: black;
  &:hover,
  &:active {
    cursor: pointer;
    color: ${Color.navy};
  }
  border-bottom: ${(props) => (props.handle ? '1px solid black' : 'none')};
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
    background-color: rgba(74, 64, 255, 0.15);
    color: black;
  }
`;

const ItemWrapper = styled.div``;

const SearchInput = styled.input`
  font-size: 15px;
  padding: 0px;
  width: 100%;
  height: 48px;
  border: none;
  background-color: #f7f7fa;
  &:focus,
  &:active {
    outline: none;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  width: 90%;
  margin: 0px auto;
`;

const SearchButton = styled.img`
  width: 17px;
  height: 17px;
`;