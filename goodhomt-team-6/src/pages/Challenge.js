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

  const userId = useSelector((store) => store.user.user.userId);
  const feed = useSelector((store) => store.feed.feed);

  // useEffect(() => {
  //   dispatch(feedActions.getFeedAllAPI("userId"));
  //   dispatch(userActions.getUpdatedAccessTokenAPI());
  // }, []);

  // const feedClick = useCallback(() => {
  //   setFeedClicked(true);
  //   setChallengeClicked(false);
  // }, []);
  // const challengeClick = useCallback(() => {
  //   setFeedClicked(false);
  //   setChallengeClicked(true);
  // }, []);

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
            bgColor="#F7F7FA">
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
  /* padding: 1.5rem; */
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

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.5rem;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1.5rem;
  /* align-self: flex-start; */
`;

// const Text = styled.h2`
//   margin: 8px 0px 0px 0px;
//   font-size: 18px;
//   font-weight: 500;
// `;

const CategoryList = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  background-color: #f7f7fa;
`;

const Category = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px;
  list-style: none;
  margin-top: 43px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  margin: 0px 1.5rem;
  padding: 0px;
`;

const SearchInput = styled.input`
  font-size: 15px;
  padding: 0px;
  width: 100%;
  height: 48px;
  border: none;
  background-color: ${Color.bgIvory};
  &:focus,
  &:active {
    outline: none;
  }
`;

const SearchButton = styled.img`
  width: 17px;
  height: 17px;
`;

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;
