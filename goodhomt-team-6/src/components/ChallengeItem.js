import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Color from '../shared/Color';
import { Button, Image, Text } from '../shared/Styles';
import MascortBlue from '../img/mascort_blue.svg';
import Clock from '../img/clock.svg';
import Dumbbell from '../img/dumbbell.svg';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import logger from '../shared/Logger';
import { history } from '../redux/configureStore';

const ChallengeItem = () => {
  const dispatch = useDispatch();
  const challenges = useSelector((state) => state.challenge.challenges);
  const myChallenges = useSelector((state) => state.challenge.myChallenges);
  const myChallengesId = myChallenges.map((myChallenge, idx) => {
    return myChallenge.challengeId;
  });

  useEffect(() => {
    dispatch(challengeActions.getChallengesAPI());
    dispatch(challengeActions.getMyChallengesAPI());
  }, []);

  return (
    <ChallengeCont>
      {challenges.map((challenge, idx) => (
        <Card
          key={idx}
          onClick={() => {
            history.push(`/challenge/${challenge.id}`);
          }}
        >
          <Text
            type="contents"
            color="#4A40FF"
            fontSize="13px"
            margin="0 0 10px"
          >
            {challenge.communityNickname || '운동좋아'} 님
          </Text>
          <MascortPeopleCountCont>
            <Image src={MascortBlue} width="25px" height="24px"></Image>
            <Text
              type="contents"
              fontSize="13px"
              margin="3px 0 0 10px"
              fontWeight="600"
            >
              {/* {challenge.userCount} */}12
            </Text>
          </MascortPeopleCountCont>
          <Text
            type="contents"
            fontSize="20px"
            fontWeight="600"
            margin="0 0 20px"
          >
            {challenge.challengeName}
          </Text>
          <HashTagCont>
            {challenge.Challenge_Exercises.map((exercise, idx) => (
              <HashTag key={idx}>{exercise.exerciseName}</HashTag>
            ))}
          </HashTagCont>
          <Text type="contents" fontSize="11px" width="70%" margin="0 0 30px 0">
            {challenge.challengeIntroduce}
          </Text>
          <InfoCont challengeId={challenge.id} myChallengesId={myChallengesId}>
            <Image src={Clock} width="24px" height="24px"></Image>
            <Text type="contents" margin="0 0 0 10px" fontWeight="600">
              {`${challenge.challengeDateTime.slice(
                4,
                6,
              )}/${challenge.challengeDateTime.slice(6, 8)}`}
            </Text>
            <Text type="contents" margin="0 0 0 8px">
              {challenge.challengeDateTime.slice(8, 10) < 12 ? '오전' : '오후'}
            </Text>
            <Text
              type="contents"
              margin="0 0 0 10px"
              fontWeight="600"
              margin="0 0 0 4px"
            >
              {challenge.challengeDateTime.slice(8, 10) < 12
                ? `${challenge.challengeDateTime.slice(
                    8,
                    10,
                  )}:${challenge.challengeDateTime.slice(10, 12)}`
                : `${
                    challenge.challengeDateTime.slice(8, 10) - 12
                  }:${challenge.challengeDateTime.slice(10, 12)}`}
            </Text>
            <Image
              src={Dumbbell}
              width="20px"
              height="8px"
              margin="0 0 0 20px"
            ></Image>
            <Text type="contents" margin="0 0 0 10px" fontWeight="600">
              {challenge.Challenge_Exercises[0].exerciseName}
            </Text>
            <Text
              type="contents"
              margin="3px 0 0 8px"
              color="rgba(255, 255, 255, 0.6)"
            >
              {challenge.Challenge_Exercises.length > 1 &&
                `외 ${challenge.Challenge_Exercises.length - 1}종`}
            </Text>
          </InfoCont>
        </Card>
      ))}
    </ChallengeCont>
  );
};

const ChallengeCont = styled.div`
  padding: 10px 20px 30px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 368px);
  overflow-y: scroll;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 226px;
  background-color: white;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 65px;
`;

const MascortPeopleCountCont = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
`;

const HashTagCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const HashTag = styled.div`
  border: 1px solid rgba(74, 64, 255, 0.8);
  background-color: rgba(74, 64, 255, 0.1);
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 13px;
  margin: 0 8px 6px 0;
`;

const InfoCont = styled.div`
  ${(props) =>
    props.myChallengesId.includes(props.challengeId)
      ? 'background-color: rgba(74, 64, 255, 0.8);'
      : 'background-color: #000;'}
  color: #fff;
  display: flex;
  border-radius: 10px 0 10px 10px;
  position: absolute;
  width: calc(100% - 40px);
  left: 0;
  bottom: -34px;
  padding: 20px;
  align-items: center;
  font-size: 12px;
`;

export default ChallengeItem;
