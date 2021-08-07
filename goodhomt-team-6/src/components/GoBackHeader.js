import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { history } from '../redux/configureStore';


// 뒤로가기 헤더 컴포넌트
const GoBackHeader = (props) => {
  const { children } = props;

  return (
    <>
      <GoBackButton
        onClick={() => {
          history.replace('/');
        }}
      >
        <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
        <Text>{children}</Text>
        <PageText>1/2</PageText>
      </GoBackButton>
    </>
  );
};

export default GoBackHeader;

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