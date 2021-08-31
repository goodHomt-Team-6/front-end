import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import logger from '../shared/Logger';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { Image, Text, Icon } from '../shared/Styles';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import searchIcon from '../img/search-icon.svg';
import LikeLine from '../img/like_line.svg';
import LikeSolid from '../img/like_solid.svg';
import Delete from '../img/more_button_delete.svg';
import CloseButton from '../img/close-button.svg';
import nullUserImg from '../img/no_profile-image.jpg';
import './Feed.css';
import NavBar from '../components/NavBar';
import PurePlusButtonBlack from '../img/pure-plus-button-black.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { actionCreators as userActions } from '../redux/modules/user';
import AddAndDeleteModal from '../components/AddAndDeleteModal';
import ErrorModal from '../components/ErrorModal';
import _ from 'lodash';

// 피드 페이지 컴포넌트
const Feed = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [clickSearch, isClickSearch] = useState(false);
  const [clickKeyword, setClickKeyword] = useState('');
  const [clickFeedId, setClickFeedId] = useState('');

  const userId = useSelector((store) => store.user.user.userId);
  const feed = useSelector((store) => store.feed.feed);
  const userName = useSelector((store) => store.user.user.nickname);
  const is_login = useSelector((store) => store.user?.is_login);
  const isSearchError = useSelector((store) => store.feed.isSearchError);
  const keyword = useSelector((store) => store.feed.keyword);

  useEffect(() => {
    if (is_login) {
      dispatch(feedActions.getFeedAllAPI(userId));
    }
  }, []);

  useEffect(() => {
    if (is_login) {
      dispatch(feedActions.getFeedAllAPI(userId));
    }
  }, [is_login]);

  useEffect(() => {
    if (isSearchError) {
      setShowErrorModal(true);
      dispatch(feedActions.initializeKeyword());
    } else {
      setSearchKeyword('');
      return;
    }
  }, [isSearchError]);

  useEffect(() => {
    if (searchInput === '') {
      dispatch(feedActions.initializeKeywordInput());
      dispatch(feedActions.initializeKeyword());
    }
  }, [searchInput]);

  // 타겟 부위 내용 뽑아내기
  const getTargetPart = (myExercise) => {
    let result = myExercise.reduce((acc, cur) => {
      if (!acc.includes(cur.Category.categoryName))
        acc.push(cur.Category.categoryName);
      return acc;
    }, []);
    return result;
  };

  // 업로드 시간 가공
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment style={{ fontFamily: 'Noto Sans KR' }}
        format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment style={{ fontFamily: 'Noto Sans KR' }}
        format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment style={{ fontFamily: 'Noto Sans KR' }}
        fromNow>{startTime}</Moment>;
    }
  };

  const regexForKorean = /[a-z0-9]|[ [\]{}()<>?|`~!@#$%^&*-_+=,.;:"'\\]/g;

  // 운동 종목 키워드 검색 처리
  const debounce = _.debounce(() => {
    dispatch(feedActions.addKeyword(searchInput));

    if (searchInput === '') {
      dispatch(feedActions.initializeKeyword());
      dispatch(feedActions.initializeKeywordInput());
    }
    if (searchInput !== '' && !regexForKorean.test(searchInput)) {
      dispatch(feedActions.getKeywordSearchAPI(searchInput, userId));
    }
  }, 500);
  const debounceOnchange = useCallback(debounce, [searchInput]);

  return (
    <Container>
      <InboxWrapper>
        <Text
          visible={visible}
          type="contents"
          padding="24px 0 24px 24px"
          fontSize="18px"
          textAlign="left"
          fontWeight="bold"
          margin="0"
          bgColor="#F7F7FA"
          onClick={() => {
            location.reload();
          }}
        >
          Feed
        </Text>

        <IconWrapper>
          {/* 검색한 키워드 보여주기 */}
          {clickKeyword !== '' ? (
            <SelectedWrapper visible={visible}>
              <Selected>
                <ExerciseName>{clickKeyword}</ExerciseName>
                <CloseBtn
                  src={CloseButton}
                  width="10"
                  onClick={() => {
                    setClickKeyword('');
                    dispatch(feedActions.getFeedAllAPI(userId));
                  }}
                />
              </Selected>
            </SelectedWrapper>
          ) : null}

          {/* 운동 종목 키워드 검색 */}
          <SearchWrapper
            visible={visible}>
            <SearchInput
              visible={visible}
              value={searchInput}
              placeholder="운동 종목명을 입력해주세요."
              onChange={(e) => {
                setSearchInput(e.target.value);
                debounceOnchange(e.target.value);
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
                isClickSearch(false);
                setVisible(false);
                setSearchKeyword(searchInput);
                if (searchInput !== '') {
                  dispatch(feedActions.getFeedSearchAPI(searchInput, userId));
                }
              } else {
                if (searchKeyword === '') {
                  setVisible(true);
                  isClickSearch(true);
                  dispatch(feedActions.initializeKeyword());
                } else {
                  setVisible(true);
                  isClickSearch(true);
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
          id={clickFeedId}
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
          setShowErrorModal={setShowErrorModal}
        />
      ) : null}

      {/* 검색한 키워드 목록 */}
      {clickSearch ? (
        <SearchCont>
          <SearchBox>
            {keyword && keyword !== [] ? (
              keyword.map((item, idx) => (
                <TextCont
                  key={idx}
                  onClick={() => {
                    dispatch(
                      feedActions.getFeedSearchAPI(item.exerciseName, userId),
                    );
                    isClickSearch(false);
                    dispatch(feedActions.initializeKeyword());
                    setVisible(false);
                    setClickKeyword(item.exerciseName);
                  }}
                >
                  <Text>{item.exerciseName}</Text>
                </TextCont>
              ))
            ) : (
              <TextCont>
                <Text>키워드를 찾을 수 없습니다.</Text>
              </TextCont>
            )}
          </SearchBox>
        </SearchCont>
      ) : (
        // 피드 목록
        <FeedWrapper>
          <FeedContainer>
            <FeedCont>
              {feed &&
                feed.map((item, idx) => (
                  <Card key={idx}>
                    {/* 유저 정보 */}
                    <UserContainer>
                      <UserBox>
                        {item.User.img === null ? (
                          <Image
                            width="34px"
                            height="34px"
                            margin="0px 15px 0px 0px"
                            src={nullUserImg}
                          />
                        ) : (
                          <Image
                            width="34px"
                            height="34px"
                            margin="0px 15px 0px 0px"
                            src={item.User.img}
                          />
                        )}

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
                          <>
                            <Icon
                              width="15px"
                              src={LikeSolid}
                              onClick={() => {
                                dispatch(feedActions.likeAPI(item.id));
                              }}
                            />
                            <Text
                              type="contents"
                              fontSize="0.9em"
                              margin="0px 0px 0px 6px"
                              color="#black"
                              fontWeight="500"
                            >
                              {item.totalLike}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Icon
                              width="15px"
                              src={LikeLine}
                              onClick={() => {
                                dispatch(feedActions.likeAPI(item.id));
                              }}
                            />
                            <Text
                              type="contents"
                              fontSize="0.9em"
                              margin="0px 0px 0px 6px"
                              color="#999999"
                              fontWeight="500"
                            >
                              {item.totalLike}
                            </Text>
                          </>
                        )}
                      </LikeWrapper>
                    </UserContainer>

                    {/* 피드 대시보드 */}
                    <TodayMainBox
                      onClick={() => {
                        const selected = feed.filter(
                          (select) => select.id == item.id,
                        );
                        dispatch(
                          exerciseActions.addSelectedPrevItem(selected[0]),
                        );
                        dispatch(exerciseActions.initializeRoutine());
                        history.push(`/feed/${item.id}`);
                      }}
                    >
                      <TodayWrapper>
                        <TextItem
                          style={{
                            fontSize: '14px',
                            color: 'black',
                            fontFamily: 'PoppinsR',
                            opacity: '54%',
                            fontWeight: '600',
                          }}
                        >
                          루틴 이름
                        </TextItem>
                        <TextItem
                          style={{
                            fontSize: '24px',
                            marginTop: '15px',
                            color: '#4A40FF',
                            opacity: '0.8',
                            borderRadius: '24px',
                            padding: '5px 15px',
                            border: '2px solid #4A40FF',
                          }}
                        >
                          {item.routineName}
                        </TextItem>
                      </TodayWrapper>
                      <TodayTypeContainer>
                        <TypeWrapper>
                          <Text
                            type="label"
                            fontSize="14px"
                            fontWeight="600"
                            color="black"
                            opacity="54%"
                            style={{
                              minWidth: '30px',
                            }}
                          >
                            타겟
                            <br />
                            부위
                          </Text>
                          <TextItem>
                            {getTargetPart(item.myExercise).map(
                              (categoryName, idx) => {
                                return idx ===
                                  getTargetPart(item.myExercise).length - 1
                                  ? `${categoryName}`
                                  : `${categoryName}, `;
                              },
                            )}
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
                                    setClickKeyword(i.exerciseName);
                                  }
                                  dispatch(
                                    feedActions.getFeedSearchAPI(
                                      i.exerciseName,
                                      userId,
                                    ),
                                  );
                                }}
                              >
                                #{i.exerciseName}
                              </Text>
                            ))}
                          </KeywordBox>
                        </CommentText>

                        {/* 삭제 버튼 */}
                        {item && item.userId === userId ? (
                          <Icon
                            width="3.5px"
                            margin="0px 5px 0px 0px"
                            src={Delete}
                            onClick={() => {
                              setShowModal(true);
                              setClickFeedId(item.id);
                              // dispatch(feedActions.selectFeed(item.id));
                            }}
                          />
                        ) : null}
                      </TextBox>

                      <Text
                        type="contents"
                        width="95%"
                        color="black"
                        margin="4px 0px 0px 0px"
                        fontSize="13px"
                      >
                        {item.description}
                      </Text>
                    </TextWrapper>
                  </Card>
                ))}
            </FeedCont>
          </FeedContainer>
        </FeedWrapper>
      )}

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
  width: 100%;
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
  background-color: ${Color.bgIvory};
  position: relative;
  z-index: 1000;
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
  font-weight: 500;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 500;
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
  align-items: center;
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
  width: auto;
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

const ScrollBtn = styled.img`
  position: fixed;
  bottom: 6rem;
  right: 20px;
  color: white;
  font-size: 30px;
  width: 67px;
  height: 67px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  z-index: 1000;
`;

const SearchBox = styled.div`
  background-color: ${Color.bgIvory};
`;

const TextCont = styled.div`
  list-style: none;
  margin: 0px 1.5rem;
  padding: 1rem 0px;
  border-bottom: 1px solid #999999;
`;

const SearchCont = styled.div`
  background-color: ${Color.bgIvory};
  height: ${innerHeight + 20}px;
`;
