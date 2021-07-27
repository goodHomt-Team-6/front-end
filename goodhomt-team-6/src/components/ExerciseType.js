import React from 'react';
import styled from 'styled-components';
import { Button } from "../shared/Styles";

// 운동타입 컴포넌트
const ExerciseType = (props) => {
  return (
    <>
      <TypeContainer>
        <TypeWrapper>
          <span>요가</span>
          <kcal></kcal>
        </TypeWrapper>
        <Button></Button>
      </TypeContainer>
    </>
  );
};

export default ExerciseType;

const TypeContainer = styled.div`

`;

const TypeWrapper = styled.div`

`;

