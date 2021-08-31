import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseActions } from '../redux/modules/exercise';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import { history } from '../redux/configureStore';
import { FooterButton, Input, Text, Image } from '../shared/Styles';
import BookmarkSolid from '../img/bookmark_solid.svg';
import CompletedCheck from '../img/completed_check.svg';
import ClickedBadRating from '../img/clicked_bad_rating.svg';
import ClickedNormalRating from '../img/clicked_normal_rating.svg';
import ClickedGoodRating from '../img/clicked_good_rating.svg';
import UnclickedBadRating from '../img/unclicked_bad_rating.svg';
import UnclickedNormalRating from '../img/unclicked_normal_rating.svg';
import UnclickedGoodRating from '../img/unclicked_good_rating.svg';
import { produceWithPatches } from 'immer';
import moment from 'moment';
import logger from '../shared/Logger';

// 북마크 버튼 클릭시 모달 생성 컴포넌트
const ExerciseResultModal = ({
  exerciseLength,
  time,
  routineName,
  id,
  challengeId,
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);

  const recordResult = () => {
    const resultRoutine = {
      id: id,
      routineTime: time,
      rating: rating,
      isCompleted: true,
    };
    const resultChallenge = {
      id: challengeId,
      challengeTime: time,
      rating: rating,
      isCompleted: true,
    };
    if (sessionStorage.getItem('is_challenge_workout') === 'true') {
      dispatch(challengeActions.recordChallengeResultAPI(resultChallenge));
      sessionStorage.removeItem('is_challenge_workout');
    } else {
      dispatch(exerciseActions.recordResultAPI(resultRoutine));
    }
  };

  return (
    <ModalWrapper>
      <ModalInner>
        <PurpleAcc></PurpleAcc>
        <Inner>
          <CheckIcon src={CompletedCheck} />
          <Text
            type="contents"
            color="black"
            fontSize="18px"
            margin="10px 0 10px 0"
          >
            {routineName}
          </Text>
          <RoutineBasicInfo>
            <WhiteDiv />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                종목
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="14px"
                margin="0 0 3px 0"
              >
                {exerciseLength}
              </Text>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                날짜
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="14px"
                margin="0 0 3px 0"
              >
                {moment().format('MM.DD')}
              </Text>
            </TextWrapper>
            <Div />
            <TextWrapper>
              <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
                시간
              </Text>
              <Text
                type="contents"
                color="black"
                fontSize="14px"
                margin="0 0 3px 0"
              >
                {parseInt(time / 60) < 10
                  ? `0${parseInt(time / 60)}`
                  : parseInt(time / 60)}
                :{time % 60 < 10 ? `0${time % 60}` : time % 60}
              </Text>
            </TextWrapper>
            <WhiteDiv />
          </RoutineBasicInfo>
          <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
            운동 만족도
          </Text>
          <RoutineRatingIcon>
            {rating === 'good' ? (
              <Image src={ClickedGoodRating} width="32px" height="32px"></Image>
            ) : (
              <Image
                src={UnclickedGoodRating}
                width="32px"
                height="32px"
                _onClick={() => {
                  setRating('good');
                }}
              ></Image>
            )}
            {rating === 'soso' ? (
              <Image
                src={ClickedNormalRating}
                width="32px"
                height="32px"
              ></Image>
            ) : (
              <Image
                src={UnclickedNormalRating}
                width="32px"
                height="32px"
                _onClick={() => {
                  setRating('soso');
                }}
              ></Image>
            )}
            {rating === 'bad' ? (
              <Image src={ClickedBadRating} width="32px" height="32px"></Image>
            ) : (
              <Image
                src={UnclickedBadRating}
                width="32px"
                height="32px"
                _onClick={() => {
                  setRating('bad');
                }}
              ></Image>
            )}
          </RoutineRatingIcon>
          <RoutineRatingText>
            <Text
              type="contents"
              width="32px"
              textAlign="center"
              opacity="54%"
              fontSize="11px"
              margin="0px"
            >
              만족
            </Text>
            <Text
              type="contents"
              width="32px"
              textAlign="center"
              opacity="54%"
              fontSize="11px"
              margin="0px"
            >
              보통
            </Text>
            <Text
              type="contents"
              width="32px"
              textAlign="center"
              opacity="54%"
              fontSize="11px"
              margin="0px"
            >
              불만족
            </Text>
          </RoutineRatingText>
          <Text type="contents" opacity="54%" fontSize="11px" margin="0px">
            오늘의 운동은 어떠셨나요?
          </Text>
          {/* 저장버튼 */}
          {rating != null ? (
            <SaveButton
              onClick={() => {
                recordResult();
              }}
            >
              기록하기
            </SaveButton>
          ) : (
            <SaveButton disabled>기록하기</SaveButton>
          )}
        </Inner>
      </ModalInner>
    </ModalWrapper>
  );
};

export default ExerciseResultModal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  outline: 0;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
`;

const ModalInner = styled.div`
  z-index: 1000;
  box-sizing: border-box;
  position: relative;
  background-color: #f7f7fa;
  width: 76%;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckIcon = styled.img`
  width: 24px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 90%;
  width: 95%;
  margin: 15px auto 0px;
`;

const RoutineBasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 30px;
  margin-bottom: 20px;
`;

const TextWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
`;

const Div = styled.div`
  border-right: 1px solid black;
  height: 22px;
`;

const WhiteDiv = styled.div`
  border-right: 1px solid transparent;
`;

const SaveButton = styled.button`
  ${(props) =>
    props.disabled ? `background-color: #9E9EA0;` : 'background-color: black;'}
  color: white;
  text-align: center;
  line-height: 60px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 50px;
  margin-top: 20px;
  line-height: 1;
  padding: 8px 0px;
`;

const RoutineRatingIcon = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 10px 0 15px;
`;

const RoutineRatingText = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const PurpleAcc = styled.div`
  position: absolute;
  width: 84px;
  height: 28px;
  background-color: rgba(74, 64, 255, 0.6);
  top: -14px;
  left: calc(50% - 42px);
`;
