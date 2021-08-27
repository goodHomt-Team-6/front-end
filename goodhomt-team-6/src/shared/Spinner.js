import React from 'react';
import { Text } from '../shared/Styles';
import styled, { keyframes } from 'styled-components';
import { rotateIn } from 'react-animations';
import SpinnerIcon from '../img/spinner.svg';

const RotateInAnimation = keyframes`${rotateIn}`;

const Spinner = () => {
  return (
    <Container>
      <RotationCont src={SpinnerIcon}>
      </RotationCont>
      <Text type="title">
        Loading...
      </Text>
    </Container>
  );
};

export default Spinner;

const RotationCont = styled.img`
  width: auto;
  animation: infinite 0.5s ${RotateInAnimation};
  margin-bottom: 50px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;