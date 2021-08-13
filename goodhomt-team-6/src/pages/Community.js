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

// 커뮤니티 페이지 컴포넌트
const Community = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [feedClicked, setFeedClicked] = useState(true);
  const [challengeClicked, setChallengeClicked] = useState(false);

  const exerciseAll = useSelector((store) => store.exercise.exercise);
  const userImg = useSelector((store) => store.user.user.userImg);
  const feed = useSelector((store) => store.feed.feed);

  useEffect(() => {
    dispatch(feedActions.getFeedAllAPI());
  }, []);

  const feedClick = useCallback(() => {
    setFeedClicked(true);
    setChallengeClicked(false);
  }, []);
  const challengeClick = useCallback(() => {
    setFeedClicked(false);
    setChallengeClicked(true);
  }, []);

  return (
    <Container>
      <Wrapper>
        <InboxWrapper>

          {/* 유저 프로필 */}
          <UserWrapper>
            <InfoBox>
              {/* <Image
                // width="40px"
                // height="40px"
                // margin="0px 15px 0px 0px"
                // src={userImg}
              ></Image> */}
              <Text type="title" margin="0px 5px 0px 0px;" fontSize="18px;">
                Community
              </Text>
            </InfoBox>
            <IconBox
              onClick={() => {
                // 피드 올리기 디자인 완성된 후 진행 (오늘 밤)
                // dispatch(feedActions.addFeedAPI());
              }}
            >
              <Icon
                margin="0px"
                src={PurePlusButtonBlack}
              />
              <Icon
                margin="0px 1rem"
                src={Noti} />
            </IconBox>
          </UserWrapper>

          {/* 운동 종목 키워드 검색 */}
          {/* <SearchWrapper>
            <SearchInput
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <SearchButton
              src={searchIcon}
              onClick={() => {
                dispatch(feedActions.getFeedSearchAPI(searchInput));
                setSearchInput('');
              }}
            />
          </SearchWrapper> */}

          <Category>
            <CategoryItem
              isChecked={feedClicked}
              handle={feedClick}
              name={'Feed'}
            />
            <CategoryItem
              isChecked={challengeClicked}
              handle={challengeClick}
              name={'Challenge'}
            />
          </Category>
          {feedClicked ? (
            //Feed
            <CategoryList>
              <FeedItem />
            </CategoryList>
          ) : (
            // Challenge
            <CategoryList>
              <ChallengeItem />
            </CategoryList>
          )}
        </InboxWrapper>
      </Wrapper>

      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Community;

const Container = styled.div`
  background-color: #f7f7fa;
  overflow: scroll;
  height: calc(100vh - 75px);
`;

const Wrapper = styled.div`
  /* padding: 1.5rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
`;

const InboxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
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
  align-self: flex-start;
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
  height: calc(100vh - 314px);
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
