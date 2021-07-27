import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Button, Input } from "../shared/Styles";

import ExerciseList from "../components/ExerciseList";

// 운동 선택하기 페이지 컴포넌트
const SelectExercise = (props) => {
  return (
    <>
      <Text>운동 선택하기</Text>
      <Category>
        <PartofExercise>상체</PartofExercise>
        <PartofExercise>하체</PartofExercise>
        <PartofExercise>허벅지</PartofExercise>
      </Category>
      <ExerciseList />
    </>
  );
};

export default SelectExercise;

const Text = styled.h2`
`;

const Category = styled.ul`
  display: flex;
  padding-left: 0px;
`;

const PartofExercise = styled.li`
  list-style: none;
  background-color: ${Color.gray};
  color: ${Color.navy};
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 0.8rem;
  margin-right: 10px;
`;


