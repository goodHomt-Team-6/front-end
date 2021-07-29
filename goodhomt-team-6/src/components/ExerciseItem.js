import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { useSelector, useDispatch } from 'react-redux';


const ExerciseItem = (props) => {
  const { exerciseName } = props;

  return (
    <>
      <ItemWrapper>
        {exerciseName}
        <CalText>kcal</CalText>
      </ItemWrapper>
    </>
  );
};

export default ExerciseItem;

// const ItemWrapper = styled.div`
// `;

const ItemWrapper = styled.li`
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
