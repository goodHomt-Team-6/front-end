import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Button } from "../shared/Styles";

// 최근 운동기록 컴포넌트
const RegisterExercise = (props) => {
  return (
    <>
      <Index>최근 운동기록</Index>
      <Button
        width="100%"
        height="50px"
      >+</Button>
    </>
  );
};

export default RegisterExercise;

const Index = styled.h2`
  font-size: 0.9rem;
`;