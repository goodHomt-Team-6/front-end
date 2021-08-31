import React, { Component } from 'react';
import logger from './Logger';
import { Text, Image } from '../shared/Styles';
import styled from 'styled-components';
import LoginBackground from '../img/login_background.svg';
import Home from '../img/home.svg';
import { history } from '../redux/configureStore';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  // componentDidCatch(error, info) {
  //   logger('에러가 발생했습니다.');
  //   logger({
  //     error,
  //     info,
  //   });
  //   this.setState({
  //     error: true,
  //   });
  //   if (process.env.NODE_ENV === 'production') {
  //     Sentry.captureException(error, { extra: info });
  //   }
  // }

  render() {
    if (this.state.error) {
      return (
        <Cont>
          <ImgContainer src={LoginBackground}></ImgContainer>
          <Text
            type="contents"
            textAlign="center"
            fontSize="18px"
            fontWeight="500"
          >
            찾으시는 데이터가 없습니다.
          </Text>
          <Text
            type="contents"
            textAlign="center"
            fontSize="15px"
            fontWeight="500"
          >
            메인으로 돌아가기
          </Text>
          <Image
            src={Home}
            width="40px"
            height="40px"
            _onClick={() => {
              history.replace('/');
              window.location.reload();
            }}
          />
        </Cont>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const innerHeight = window.innerHeight;

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${innerHeight}px;
`;

const ImgContainer = styled.img`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: -1;
  opacity: 0.3;
`;
