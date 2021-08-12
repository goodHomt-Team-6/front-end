import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { Image, Text } from '../shared/Styles';
import { useSelector, useDispatch } from 'react-redux';
import LikeLine from '../img/like_line.svg';
import LikeSolid from '../img/like_solid.svg';
import BookmarkLine from '../img/bookmark_line.svg';
import { actionCreators as feedActions } from '../redux/modules/feed';

// 피드 아이템 컴포넌트
const FeedItem = (props) => {
  const { routineName, description, communityNickname, createdAt, myExercise, like, totalLike } = props;
  const userName = useSelector((store) => store.user.user.nickname);
  const userImg = useSelector((store) => store.user.user.userImg);

  return (
    <FeedItemWrapper>
      {/* 유저정보 */}
      <UserWrapper>
        <Image
          width="40px"
          height="40px"
          margin="0px 15px 0px 0px"
          src={userImg}
        />
        <InfoBox>
          {userName && (
            <Text type="label"
              fontSize="14px"
              color="black"
              fontWeight="600">
              {communityNickname}
            </Text>
          )}
          <Text
            type="label"
            fontSize="12px"
          >{createdAt.substring(0, 10)}
          </Text>
        </InfoBox>
      </UserWrapper>

      {/* 피드 게시 운동 정보 */}
      <TodayMainBox>
        <TodayWrapper>
          <Enrolled>{myExercise.length}</Enrolled>
          <TextItem>{routineName}</TextItem>
        </TodayWrapper>
        <TodayTypeContainer>
          <TypeWrapper>
            <Text
              type='label'
              fontSize="14px"
              fontWeight="600"
              color="black"
              opacity="54%"
            >중량</Text>
            <TextItem>15kg</TextItem>
          </TypeWrapper>
          <Div />
          <TypeWrapper>
            <Text
              type='label'
              fontSize="14px"
              fontWeight="600"
              color="black"
              opacity="54%"
            >운동시간</Text>
            <TextItem>30분</TextItem>
          </TypeWrapper>
        </TodayTypeContainer>
      </TodayMainBox>

      <IconWrapper>
        {/* 좋아요 */}
        <LikeWrapper>
          <IconBtn src={LikeLine} />
          <Text type="contents"
            margin="0px 0px 0px 6px"
            color="#999999"
            fontWeight="500"
          >342</Text>
        </LikeWrapper>
        {/* 북마크 */}
        <IconBtn src={BookmarkLine} />
      </IconWrapper>

      {/* 운동 정보 텍스트 */}
      <TextWrapper>
        <TextBox>
          <Text
            type="contents"
            margin="0px 8px 0px 0px"
            fontSize="14px"
            fontWeight="600">
            {routineName}
          </Text>

          {myExercise.map((item, idx) => (
            <Text
              key={idx}
              type="contents"
              margin="0px 6px 0px 0px"
              color="#4A40FF"
              fontSize="14px"
              fontWeight="600">
              #{item.exerciseName}
            </Text>
          ))}

        </TextBox>
        <Text
          type="contents"
          margin="0px"
          fontSize="14px">
          {description}
        </Text>
      </TextWrapper>
    </FeedItemWrapper>
  );
};

export default FeedItem;

const FeedItemWrapper = styled.li`
  margin-bottom: 3rem;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0px 1rem 1rem;
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
`;

const TextItem = styled.span`
  color: black;
  font-size: 15px;
  font-weight: 600;
`;

const Span = styled.span`
  color: black;
  opacity: 54%;
  font-size: 14px;
  font-weight: 600;
  `;

const IconBtn = styled.img`
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`;
const LikeWrapper = styled.div`
  display: flex;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 1rem 1rem 1rem;
`;

const TextBox = styled.div`
  display: flex;
`;