import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Button } from "../shared/Styles";

// 운동 등록하기 컴포넌트
const RegisterExercise = (props) => {
  return (
    <Wrapper>
      <Index>운동 등록하기</Index>
      <Button
        width="100%"
        height="50px"
      >+</Button>
    </Wrapper>
  );
};

export default RegisterExercise;

const Wrapper = styled.div`
  height: 15rem;
`;

const Index = styled.h2`
  font-size: 0.9rem;
`;