import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Image, Text, Icon } from '../shared/Styles';
import { useSelector, useDispatch } from 'react-redux';
import LikeLine from '../img/like_line.svg';
import LikeSolid from '../img/like_solid.svg';
import Delete from '../img/more_button_delete.svg';
import BookmarkLine from '../img/bookmark_line.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { history } from '../redux/configureStore';
import logger from '../shared/Logger';
import AddAndDeleteModal from './AddAndDeleteModal';

// 피드 아이템 컴포넌트
const FeedItem = (props) => {
  const dispatch = useDispatch();

  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);
  const userId = useSelector((store) => store.user.user.userId);
  const feed = useSelector((store) => store.feed.feed);

  return (
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
                    src={userImg}
                  // src={item.userImg} 사용자 이미지 받아오는 거로 변경하기
                  />
                  <InfoBox>
                    {userName && (
                      <Text
                        type="label"
                        fontSize="14px"
                        color="black"
                        fontWeight="500"
                      >
                        {item.communityNickname}
                      </Text>
                    )}
                    <Text type="label" fontSize="12px">
                      {item.createdAt.substring(0, 10)}
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
                      fontWeight="500"
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
                      fontWeight="500"
                      color="black"
                      opacity="54%"
                    >
                      운동시간
                    </Text>
                    <TextItem>
                      {Math.floor(item.routineTime / 60) < 10 ? (
                        <Time>{'0' + Math.floor(item.routineTime / 60)}:</Time>
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
                      fontWeight="500"
                    >
                      {item.routineName}
                    </Text>

                    {/* 키워드 */}
                    {item.myExercise.map((i, idx) => (
                      <Text
                        key={idx}
                        type="contents"
                        margin="0px 6px 0px 0px"
                        color="#4A40FF"
                        fontSize="14px"
                        fontWeight="400"
                      >
                        #{i.exerciseName}
                      </Text>
                    ))}
                  </CommentText>

                  {/* 삭제 버튼 */}
                  {item && item.userId === userId ? (
                    <Icon
                      margin="0px 5px 0px 0px"
                      src={Delete}
                      onClick={() => {
                        logger('삭제 모달창 띄우기');
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
    </FeedContReal>
  );
};

export default FeedItem;

const innerHeight = window.innerHeight - 170;

const FeedContReal = styled.div`
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  height: ${innerHeight}px;
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
  margin: 0px 1rem;
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
  font-weight: 500;
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
  font-size: 15px;
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
`;

const Time = styled.span`
  line-height: 45px;
`;

const UserBox = styled.div`
  display: flex;
`;

const CommentText = styled.div`
  display: flex;
`;
