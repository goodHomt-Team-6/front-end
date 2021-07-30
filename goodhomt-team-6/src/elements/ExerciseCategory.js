import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';

// 카테고리별 목록 컴포넌트
const ExerciseCategory = (props) => {
  const dispatch = useDispatch();
  const exercise = useSelector((store) => store.exercise.exercise);
  console.log(exercise.result);

  useEffect(() => {
    dispatch(exerciseActions.getExerciseTypeAPI());
  }, []);

  if (exercise.length > 0) {
    return (
      <CategoryList>
        {exercise
          .map(e => {
            return (
              <ExerciseItem key={e.id}
                onClick={() => {
                  const exercise = {
                    exerciseName: e.exerciseName,
                    set: [{
                      type: 'exercise',
                      count: 0,
                      weight: 0,
                    },],
                  };
                  dispatch(exerciseActions.addExerciseType(exercise));
                }}>
                <ItemWrapper>
                  {e.exerciseName}
                  <CalText>{e.cal}kcal</CalText>
                </ItemWrapper>
              </ExerciseItem>
            );
          })}
      </CategoryList>
    );
  } else {
    return null;
  }
};


export default ExerciseCategory;

const CategoryList = styled.div`
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

const CalText = styled.span`
  font-size: 9px;
  color: #465678;
  line-height: 48px;
  margin: 0px 15px;
`;
