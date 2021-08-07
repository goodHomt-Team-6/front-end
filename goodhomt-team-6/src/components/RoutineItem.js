import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import logger from '../shared/Logger';
import Cookies from 'universal-cookie';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';

const cookies = new Cookies();

// 리스트의 개별 루틴 아이템 컴포넌트
const RoutineItem = (props) => {
  const dispatch = useDispatch();
  const { routineName, createdAt, id, myExercise } = props;

  const [selected, setSelected] = useState(false);
  const selectedItem = useSelector((store) => store.exercise.selectedItem);
  const myRoutine = useSelector((store) => store.exercise.routine);

  return (
    <>
      <ExerciseItem
        selected={selected}
        onClick={() => {
          const routine = {
            createdAt: createdAt,
            id: id,
            routineName: routineName,
            myExercise: myExercise
          };

          if (selected) {
            setSelected(false);
            dispatch(exerciseActions.removeSelectedItem(routine));
            dispatch(exerciseActions.is_selected(false));
          }
          else {
            setSelected(true);
            dispatch(exerciseActions.addSelectedItem(routine));
            dispatch(exerciseActions.is_selected(true));
          }
        }}
      >
        <TimeBox>
          <Time>30:00</Time>
        </TimeBox>
        {myRoutine &&
          <RoutineInfo>
            <RoutineName>{routineName}</RoutineName>
            <WorkoutDate>{createdAt.substring(0, 10)}</WorkoutDate>
          </RoutineInfo>
        }
      </ExerciseItem>
    </>
  );
};

export default RoutineItem;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  border-bottom: 1px solid ${Color.lightGray};
  line-height: 48px;
  /* width: 100%; */
  margin: 0px;
  padding: 32px 1.5rem;
  font-size: 1rem;
  &:hover,
  &:active {
    background-color: #c4c4c4;
    cursor: pointer;
  }
  background-color: ${(props) => (props.selected ? `#c4c4c4` : `none`)};
`;

const TimeBox = styled.div`
  background-color: black;
  width: 72px;
  height: 44px;
  border-radius: 22px;
  color: white;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Time = styled.span`
  line-height: 45px;
`;

const RoutineInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoutineName = styled.span`
  font-size: 14px;
  line-height: 24px;
`;

const WorkoutDate = styled.span`
  font-size: 14px;
  line-height: 24px;
  
`;
