import React from 'react';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Text } from '../shared/Styles';
import { history } from '../redux/configureStore';

const Header = (props) => {
  return (
    <React.Fragment>
      {props.toMain ? (
        <GoBackButton
          onClick={() => {
            history.push('/');
          }}
        >
          <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
          <Text type="title" margin="0px 5px 0px 0px;" fontSize="18px;">
            {props.message}
          </Text>
          {props.page && <PageText>{props.page}</PageText>}
        </GoBackButton>
      ) : (
        <GoBackButton
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIosIcon style={{ width: '16px', height: '16px' }} />
          <Text type="title" margin="0px 5px 0px 0px;" fontSize="18px;">
            {props.message}
          </Text>
          {props.page && <PageText>{props.page}</PageText>}
        </GoBackButton>
      )}
    </React.Fragment>
  );
};

export default Header;

const GoBackButton = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-start;
  padding: 25px;
  box-sizing: border-box;
  align-items: baseline;
  background-color: #f7f7fa;
`;

const PageText = styled.span`
  font-size: 14px;
  line-height: 2.5;
`;
