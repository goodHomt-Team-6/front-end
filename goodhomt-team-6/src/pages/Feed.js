import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import api from '../shared/Request';
import logger from '../shared/Logger';

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
import NavBar from '../components/NavBar';
import FeedItem from '../components/FeedItem';
import PurePlusButtonBlack from '../img/pure-plus-button-black.svg';
import Noti from '../img/notification.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { actionCreators as userActions } from '../redux/modules/user';
import AddAndDeleteModal from '../components/AddAndDeleteModal';

// 피드 페이지 컴포넌트
const Feed = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);

  const userId = useSelector((store) => store.user.user.userId);
  const feed = useSelector((store) => store.feed.feed);
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);

  useEffect(() => {
    dispatch(feedActions.getFeedAllAPI(userId));
    dispatch(userActions.getUpdatedAccessTokenAPI());
  }, []);


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
        >Feed
        </Text>

        <IconWrapper>
          <Icon
            onClick={() => {
              setShowAddFeedModal(true);
            }}
            margin="0px"
            src={PurePlusButtonBlack} />
        </IconWrapper>
      </InboxWrapper>

      {
        showModal ?
          <AddAndDeleteModal
            message="피드 삭제"
            setShowModal={setShowModal} />
          : null
      }

      {
        showAddFeedModal ?
          <AddAndDeleteModal
            message="피드 추가"
            setShowAddFeedModal={setShowAddFeedModal} />
          : null
      }

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

      {/* 피드 목록 */}
      <FeedWrapper>
        <FeedContReal>
          <FeedCont>
            {feed &&
              feed.map((item, idx) => (
                <Card key={idx}>
                  {/* 유저 정보 */}
                  <UserWrapper>
                    <UserBox>
                      <Image
                        width="34px"
                        height="34px"
                        margin="0px 15px 0px 0px"
                        src={item.img}
                      />
                      <InfoBox>
                        {userName && (
                          <Text
                            type="label"
                            fontSize="14px"
                            color="black"
                            fontWeight="600"
                          >{item.communityNickname}
                          </Text>
                        )}
                        <Text
                          type="label"
                          fontSize="12px"
                        >{item.createdAt.substring(0, 10)}
                        </Text>
                      </InfoBox>
                    </UserBox>

                    {/* 좋아요 */}
                    <LikeWrapper>
                      {item.isLike ? (
                        <IconBtn
                          src={LikeSolid}
                          onClick={() => {
                            dispatch(feedActions.likeAPI(item._id));
                          }}
                        />
                      ) : (
                        <IconBtn
                          src={LikeLine}
                          onClick={() => {
                            dispatch(feedActions.likeAPI(item._id));
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
                  </UserWrapper>

                  {/* 피드 게시 운동 정보 */}
                  <TodayMainBox
                    onClick={() => {
                      const selected = feed.filter((m) => m._id == item._id);
                      dispatch(exerciseActions.addSelectedPrevItem(selected[0]));
                      dispatch(exerciseActions.initializeRoutine());
                      history.push(`/feed/${item._id}`);
                    }}>
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
                        >종목
                        </Text>
                        <TextItem>
                          {item.myExercise[0].exerciseName} 외 {item.myExercise.length - 1}개
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
                        >운동시간
                        </Text>
                        <TextItem>
                          {Math.floor(item.routineTime / 60) < 10 ? (
                            <Time>
                              {'0' + Math.floor(item.routineTime / 60)}:
                            </Time>
                          ) : (
                            <Time>
                              {Math.floor(item.routineTime / 60)}:
                            </Time>)
                          }
                          {(item.routineTime % 60) < 10 ? (
                            <Time>
                              {'0' + item.routineTime % 60}
                            </Time>
                          ) : (<Time>
                            {item.routineTime % 60}
                          </Time>)}
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
                        >{item.routineName}
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
                            >#{i.exerciseName}
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
                            dispatch(feedActions.selectFeed(item._id));
                          }}
                        />
                      ) : null
                      }
                    </TextBox>
                    <Text
                      type="contents"
                      margin="0px"
                      fontSize="14px"
                    >{item.description}
                    </Text>
                  </TextWrapper>
                </Card>
              ))
            }
          </FeedCont >
        </FeedContReal >
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
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1.5rem;
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

const FeedContReal = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
  overflow-y: scroll;
`;

const FeedCont = styled.li`
`;

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

const UserWrapper = styled.div`
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
  flex-flow: row wrap ;

`;