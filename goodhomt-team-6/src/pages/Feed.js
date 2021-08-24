import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import api from '../shared/Request';
import logger from '../shared/Logger';
import Moment from 'react-moment';
import 'moment/locale/ko';

import { Image, Text, Icon } from '../shared/Styles';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import CategoryItem from '../components/CategoryItem';
import ChallengeItem from '../components/ChallengeItem';
import searchIcon from '../img/search-icon.svg';
import LikeLine from '../img/like_line.svg';
import LikeSolid from '../img/like_solid.svg';
import Delete from '../img/more_button_delete.svg';
import CloseButton from '../img/close-button.svg';
import NavBar from '../components/NavBar';
import FeedItem from '../components/FeedItem';
import PurePlusButtonBlack from '../img/pure-plus-button-black.svg';
import Noti from '../img/notification.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { actionCreators as userActions } from '../redux/modules/user';
import AddAndDeleteModal from '../components/AddAndDeleteModal';
import ErrorModal from '../components/ErrorModal';
import DashBoardBase from '../components/DashBoardBase';

// 피드 페이지 컴포넌트
const Feed = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const userId = useSelector((store) => store.user.user.userId);
  const feed = useSelector((store) => store.feed.feed);
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const is_login = useSelector((store) => store.user?.is_login);
  const isSearchError = useSelector((store) => store.feed.isSearchError);

  useEffect(() => {
    if (is_login) {
      dispatch(feedActions.getFeedAllAPI(userId));
      dispatch(userActions.getUpdatedAccessTokenAPI());
    }
  }, []);
  useEffect(() => {
    if (is_login) {
      dispatch(feedActions.getFeedAllAPI(userId));
      dispatch(userActions.getUpdatedAccessTokenAPI());
    }
  }, [is_login]);

  useEffect(() => {
    if (isSearchError) {
      setShowErrorModal(true);
    } else {
      setSearchKeyword('');
      return;
    }
  }, [isSearchError]);

  // 업로드 시간 가공
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  return (
    <Container>
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
          Feed
        </Text>

        <IconWrapper>
          {/* 검색한 키워드 보여주기 */}
          {searchKeyword !== '' ? (
            <SelectedWrapper visible={visible}>
              <Selected>
                <ExerciseName>{searchKeyword}</ExerciseName>
                <CloseBtn
                  src={CloseButton}
                  width="10"
                  onClick={() => {
                    setSearchKeyword('');
                    dispatch(feedActions.getFeedAllAPI(userId));
                  }}
                />
              </Selected>
            </SelectedWrapper>
          ) : null}

          {/* 운동 종목 키워드 검색 */}
          <SearchWrapper visible={visible}>
            <SearchInput
              visible={visible}
              value={searchInput}
              placeholder="검색어를 입력해주세요."
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </SearchWrapper>
          <Icon
            width="16px"
            margin="0px 10px 0px 0px"
            src={searchIcon}
            onClick={() => {
              setSearchInput('');
              if (visible) {
                setVisible(false);
                dispatch(feedActions.getFeedSearchAPI(searchInput, userId));
                setSearchKeyword(searchInput);
              } else {
                if (searchKeyword === '') {
                  setVisible(true);
                } else {
                  setVisible(true);
                  setSearchKeyword('');
                }
              }
            }}
          />
          <Icon
            width="15px"
            margin="0px"
            src={PurePlusButtonBlack}
            onClick={() => {
              setShowAddFeedModal(true);
            }}
          />
        </IconWrapper>
      </InboxWrapper>

      {showModal ? (
        <AddAndDeleteModal
          message="피드 삭제"
          setShowModal={setShowModal}
        />
      ) : null}

      {showAddFeedModal ? (
        <AddAndDeleteModal
          message="피드 추가"
          setShowAddFeedModal={setShowAddFeedModal}
        />
      ) : null}

      {showErrorModal ? (
        <ErrorModal
          message="찾으시는 키워드가 없습니다."
          buttonMessage="피드로 돌아가기"
          setShowErrorModal={setShowErrorModal} />
      ) : null}

      {/* 피드 목록 */}
      <FeedWrapper>
        <FeedContainer>
          <FeedCont>
            {feed &&
              feed.map((item, idx) => (
                <Card key={idx}>
                  {/* 유저 정보 */}
                  <UserContainer>
                    <UserBox>
                      <Image
                        width="34px"
                        height="34px"
                        margin="0px 15px 0px 0px"
                        src={item.User.img}
                      />
                      <InfoBox>
                        {userName && (
                          <Text
                            type="label"
                            fontSize="14px"
                            color="black"
                            fontWeight="600"
                          >
                            {item.communityNickname}
                          </Text>
                        )}
                        <Text type="label" fontSize="12px">
                          {displayCreatedAt(item.createdAt)}
                        </Text>
                      </InfoBox>
                    </UserBox>

                    {/* 좋아요 */}
                    <LikeWrapper>
                      {item.isLiked === 1 ? (
                        <IconBtn
                          src={LikeSolid}
                          onClick={() => {
                            dispatch(feedActions.likeAPI(item.id));
                          }}
                        />
                      ) : (
                        <IconBtn
                          src={LikeLine}
                          onClick={() => {
                            dispatch(feedActions.likeAPI(item.id));
                          }}
                        />
                      )}
                      <Text
                        type="contents"
                        margin="0px 0px 0px 6px"
                        color="#999999"
                        fontWeight="500"
                      >
                        {item.totalLike}
                      </Text>
                    </LikeWrapper>
                  </UserContainer>

                  {/* 피드 게시 운동 정보 */}
                  <TodayMainBox
                    onClick={() => {
                      const selected = feed.filter((select) => select.id == item.id);
                      dispatch(
                        exerciseActions.addSelectedPrevItem(selected[0]),
                      );
                      dispatch(exerciseActions.initializeRoutine());
                      history.push(`/feed/${item.id}`);
                    }}
                  >
                    <TodayWrapper>
                      <Enrolled>{item.myExercise.length}</Enrolled>
                      <TextItem>{item.routineName}</TextItem>
                    </TodayWrapper>
                    <TodayTypeContainer>
                      <TypeWrapper>
                        <Text
                          type="label"
                          fontSize="14px"
                          fontWeight="600"
                          color="black"
                          opacity="54%"
                        >
                          종목
                        </Text>
                        <TextItem>
                          {item.myExercise[0].exerciseName} 외{' '}
                          {item.myExercise.length - 1}개
                        </TextItem>
                      </TypeWrapper>
                      <Div />
                      <TypeWrapper>
                        <Text
                          type="label"
                          fontSize="14px"
                          fontWeight="600"
                          color="black"
                          opacity="54%"
                        >
                          운동시간
                        </Text>
                        <TextItem>
                          {Math.floor(item.routineTime / 60) < 10 ? (
                            <Time>
                              {'0' + Math.floor(item.routineTime / 60)}:
                            </Time>
                          ) : (
                            <Time>{Math.floor(item.routineTime / 60)}:</Time>
                          )}
                          {item.routineTime % 60 < 10 ? (
                            <Time>{'0' + (item.routineTime % 60)}</Time>
                          ) : (
                            <Time>{item.routineTime % 60}</Time>
                          )}
                        </TextItem>
                      </TypeWrapper>
                    </TodayTypeContainer>
                  </TodayMainBox>

                  {/* 운동 정보 텍스트 */}
                  <TextWrapper>
                    <TextBox>
                      <CommentText>
                        <Text
                          type="contents"
                          margin="0px 8px 0px 0px"
                          fontSize="14px"
                          fontWeight="600"
                        >
                          {item.routineName}
                        </Text>

                        {/* 키워드 */}
                        <KeywordBox>
                          {item.myExercise.map((i, idx) => (
                            <Text
                              key={idx}
                              type="contents"
                              margin="0px 6px 0px 0px"
                              color="#4A40FF"
                              fontSize="14px"
                              fontWeight="600"
                              onClick={() => {
                                if (visible) {
                                  setVisible(false);
                                  setSearchKeyword(i.exerciseName);
                                } else {
                                  setSearchKeyword(i.exerciseName);
                                }
                                dispatch(feedActions.getFeedSearchAPI(i.exerciseName, userId));
                              }}>
                              #{i.exerciseName}
                            </Text>
                          ))}
                        </KeywordBox>
                      </CommentText>

                      {/* 삭제 버튼 */}
                      {item && item.userId === userId ? (
                        <Icon
                          margin="0px 5px 0px 0px"
                          src={Delete}
                          onClick={() => {
                            setShowModal(true);
                            dispatch(feedActions.selectFeed(item.id));
                          }}
                        />
                      ) : null}
                    </TextBox>
                    <Text type="contents" margin="0px" fontSize="14px">
                      {item.description}
                    </Text>
                  </TextWrapper>
                </Card>
              ))}
          </FeedCont>
        </FeedContainer>
      </FeedWrapper>

      {/* 고정 하단바 */}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  background-color: #f7f7fa;
`;

const InboxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1.5rem;
  width: 65%;
`;

const FeedWrapper = styled.ul`
  width: 100%;
  padding: 0px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  background-color: #f7f7fa;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  margin: 0px;
  padding: 0px;
  width: ${(props) => (props.visible ? '100%' : '0px')};
  /* transition: all 0.4s cubic-bezier(0.6, -0.5, 0.2, 0.1); */
`;

const SearchInput = styled.input`
  font-size: 15px;
  padding: 0px;
  height: 48px;
  border: none;
  width: ${(props) => (props.visible ? '100%' : '0px')};
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

const innerHeight = window.innerHeight - 170;

const FeedContainer = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  height: ${innerHeight}px;
  /* height: clac(100% - 500px); */
  overflow-y: scroll;
`;

const FeedCont = styled.li``;

const Card = styled.div`
  border-bottom: 1px solid ${Color.clickedGray};
  margin-top: 2.5rem;
  :first-child {
    margin-top: 0;
  }
  :last-child {
    border-bottom: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 1rem 0px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TodayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 30px;
`;

const TodayTypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 24px 0px;
  padding: 0px 15px;
`;

const Div = styled.div`
  border-left: 1px solid gray;
  padding: 10px;
  margin-left: 20px;
`;

const TypeWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
`;

const Enrolled = styled.span`
  font-size: 72px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1;
  color: ${Color.mainBlue};
`;

const TodayMainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextItem = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 600;
`;

const IconBtn = styled.img`
  width: 18px;
  :hover {
    cursor: pointer;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0px 2.5rem 0px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  line-height: 45px;
`;

const UserBox = styled.div`
  display: flex;
`;

const CommentText = styled.div`
  display: flex;
  width: 90%;
`;

const KeywordBox = styled.div`
  width: 50%;
  display: flex;
  flex-flow: row wrap;
`;

const Selected = styled.div`
  font-size: 14px;
  border: 1px solid ${Color.mainBlue};
  height: 32px;
  display: flex;
  padding: 0 8px;
  color: black;
  line-height: 32px;
  border-radius: 16px;
  margin-right: 16px;
  background-color: #fff;
`;

const SelectedWrapper = styled.div`
  height: auto;
  overflow-x: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
  box-sizing: border-box;
  margin: 15px 0px;
  display: flex;
  z-index: 1000;
`;

const ExerciseName = styled.span`
  margin-right: 5px;
`;

const CloseBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
