import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import api from '../shared/Request';
import { Image, Text, Icon } from '../shared/Styles';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import CategoryItem from '../components/CategoryItem';
import ChallengeItem from '../components/ChallengeItem';
import searchIcon from '../img/search-icon.svg';
import NavBar from '../components/NavBar';
import FeedItem from '../components/FeedItem';
import PurePlusButtonBlack from '../img/pure-plus-button-black.svg';
import Noti from '../img/notification.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { actionCreators as userActions } from '../redux/modules/user';

// 챌린지 페이지 컴포넌트
const Challenge = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <InboxWrapper>
          <Text
            type="contents"
            padding="24px 0 24px 24px"
            fontSize="18px"
            textAlign="left"
            fontWeight="bold"
            margin="0"
            bgColor="#F7F7FA"
          >
            Challenge
          </Text>

          <CategoryList>
            <ChallengeItem />
          </CategoryList>
          {/* )} */}
        </InboxWrapper>
      </Wrapper>

      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Challenge;

const Container = styled.div`
  background-color: #f7f7fa;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InboxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  background-color: #f7f7fa;
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
