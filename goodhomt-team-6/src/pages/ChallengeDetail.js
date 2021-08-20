import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { actionCreators as challengeActions } from '../redux/modules/challenge';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Header from '../components/Header';
import Clock from '../img/clock_blue.svg';
import Dumbbell from '../img/dumbbell_blue.svg';
import Mascort from '../img/mascort_white.svg';
import logger from '../shared/Logger';
import { Image, Text, FooterButton } from '../shared/Styles';
import moment from 'moment';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { actionCreators as challengeCreator } from '../redux/modules/challenge';
import ChallengeModal from '../components/ChallengeModal';

const ChallengeDetail = (props) => {
  const dispatch = useDispatch();
  const challengeId = props.paramsId;
  const challenge = useSelector(
    (state) => state.challenge.challengeDetail.challenge,
  );
  const myChallenges = useSelector((state) => state.challenge.myChallenges);
  const myChallengesId = myChallenges.map((myChallenge, idx) => {
    return myChallenge.challengeId;
  });
  const openedRow = useSelector((state) => state.exercise.openedRow);
  const [challengeModal, showChallengeModal] = useState(false);

  useEffect(() => {
    dispatch(challengeActions.getChallengeDetailAPI(challengeId));
    return () => {
      closeRow();
    };
  }, []);

  const parseDay = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const format = `${year}-${month}-${day}T00:00:00.000Z`;
    return moment(format).format('dddd');
  };

  const openRow = (e) => {
    const target = e.currentTarget.id;
    dispatch(exerciseCreator.openRow(target));
  };

  const closeRow = () => {
    dispatch(exerciseCreator.openRow(null));
  };

  return (
    <React.Fragment>
      {/* 뒤로가기 버튼 */}
      <Header message="Challenge"></Header>
      <ChallengeCont>
        {challenge && (
          <React.Fragment>
            <Card>
              <Text
                type="contents"
                color="#4A40FF"
                fontSize="13px"
                margin="0 0 10px"
              >
                {challenge.communityNickname || '운동좋아'} 님
              </Text>
              <Text
                type="contents"
                fontSize="30px"
                fontWeight="bold"
                margin="0 0 20px"
              >
                {challenge.challengeName}
              </Text>
              <HashTagCont>
                {challenge.Challenge_Exercises.map((exercise, idx) => (
                  <HashTag key={idx}>{exercise.exerciseName}</HashTag>
                ))}
              </HashTagCont>
              <Text
                type="contents"
                fontSize="12px"
                width="100%"
                margin="0 0 30px 0"
              >
                {challenge.challengeIntroduce}
              </Text>
              <UserCountCont>
                <Image
                  src={Mascort}
                  width="25px"
                  height="24px"
                  borderRadius="0"
                ></Image>
                <Text
                  type="contents"
                  margin="0 0 0 10px"
                  fontSize="18px"
                  fontWeight="600"
                >
                  {challenge.userCount}
                </Text>
                <Text type="contents" fontSize="18px" margin="0">
                  명 참가중
                </Text>
              </UserCountCont>
              <InfoCont>
                <Info>
                  <Image
                    src={Clock}
                    width="32px"
                    height="32px"
                    borderRadius="0"
                  ></Image>
                  <Text
                    type="contents"
                    fontWeight="bold"
                    fontSize="24px"
                    bgColor="rgba(74, 64, 255, 0.15)"
                    padding="0 4px 2px"
                    margin="18px 0 0"
                  >
                    {challenge.challengeDateTime.slice(8, 10) < 12
                      ? `오전 ${challenge.challengeDateTime.slice(
                          8,
                          10,
                        )}:${challenge.challengeDateTime.slice(10, 12)}`
                      : `오후 ${
                          challenge.challengeDateTime.slice(8, 10) - 12
                        }:${challenge.challengeDateTime.slice(10, 12)}`}
                  </Text>
                  <Text type="contents" fontSize="15px" margin="10px 0 0">
                    {`${
                      challenge.challengeDateTime.slice(4, 6) < 10
                        ? challenge.challengeDateTime.slice(5, 6)
                        : challenge.challengeDateTime.slice(4, 6)
                    }/${
                      challenge.challengeDateTime.slice(6, 8) < 10
                        ? challenge.challengeDateTime.slice(7, 8)
                        : challenge.challengeDateTime.slice(6, 8)
                    }`}
                    {` ${parseDay(challenge.challengeDateTime.slice(0, 8))}`}
                  </Text>
                </Info>
                <Info>
                  <Image
                    src={Dumbbell}
                    width="28px"
                    height="12px"
                    borderRadius="0"
                    margin="10px 0"
                  ></Image>
                  <Text
                    type="contents"
                    fontWeight="bold"
                    fontSize="24px"
                    bgColor="rgba(74, 64, 255, 0.15)"
                    padding="0 4px 2px"
                    margin="18px 0 0"
                  >
                    {challenge.Challenge_Exercises[0].exerciseName}
                  </Text>
                  <Text
                    type="contents"
                    fontSize="15px"
                    margin="10px 0 0"
                    minHeight="23px"
                  >
                    {challenge.Challenge_Exercises.length > 1 &&
                      `외 ${challenge.Challenge_Exercises.length - 1}종목`}
                  </Text>
                </Info>
              </InfoCont>
              <Text
                type="title"
                margin="0px 5px 0px 0px"
                fontSize="18px"
                textAlign="left"
              >
                Routine
              </Text>
              <TodayTypeContainer>
                <TypeWrapper>
                  <Text
                    type="label"
                    fontSize="14px"
                    fontWeight="600"
                    color="black"
                    opacity="54%"
                  >
                    난이도
                  </Text>
                  <TextItem>{challenge.difficulty}</TextItem>
                </TypeWrapper>
                <Divider />
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
                  <TextItem>{challenge.runningTime}분</TextItem>
                </TypeWrapper>
              </TodayTypeContainer>
            </Card>
            <ListContainer>
              {challenge.Challenge_Exercises.map((list, listIdx) =>
                listIdx === parseInt(openedRow) ? (
                  <OpenList id={listIdx} key={listIdx}>
                    <Text
                      type="contents"
                      width="100%"
                      padding="20px 0 0 20px"
                      margin="0"
                      onClick={() => {
                        closeRow();
                      }}
                    >
                      {list.exerciseName}
                    </Text>
                    {list.Challenge_Sets.map((set, setIdx) => (
                      <DataRow key={setIdx}>
                        <Text
                          type="contents"
                          fontSize="1.3em"
                          minWidth="80px"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.setCount}세트`
                            : '휴식'}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.3em"
                          minWidth="80px"
                          textAlign="center"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.weight}Kg`
                            : `${set.minutes}분`}
                        </Text>
                        <Text
                          type="contents"
                          fontSize="1.3em"
                          minWidth="80px"
                          textAlign="right"
                          color="#848484"
                        >
                          {set.type === 'exercise'
                            ? `${set.count}회`
                            : `${set.seconds}초`}
                        </Text>
                      </DataRow>
                    ))}
                  </OpenList>
                ) : (
                  <List
                    id={listIdx}
                    key={listIdx}
                    onClick={(e) => {
                      openRow(e);
                    }}
                  >
                    <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                      {list.exerciseName}
                    </Text>
                    <Text type="contents">
                      {
                        list.Challenge_Sets.filter(
                          (set) => set.type === 'exercise',
                        ).length
                      }
                      세트
                    </Text>
                    <Text type="contents">
                      {list.Challenge_Sets[0].weight}kg
                    </Text>
                    <Text type="contents" padding="0 10px 0 0">
                      {list.Challenge_Sets[0].count}회
                    </Text>
                  </List>
                ),
              )}
            </ListContainer>
          </React.Fragment>
        )}
      </ChallengeCont>
      {challenge && myChallengesId.includes(parseInt(challengeId)) ? (
        <FooterButton
          onClick={() => {
            dispatch(challengeCreator.leaveChallengeAPI(challengeId));
          }}
        >
          참가 취소하기
        </FooterButton>
      ) : (
        <FooterButton
          onClick={() => {
            showChallengeModal(true);
          }}
        >
          참가 신청하기
        </FooterButton>
      )}
      {challengeModal && (
        <ChallengeModal
          from="joinChallenge"
          exerciseLength={challenge.Challenge_Exercises.length}
          time={challenge.challengeDateTime}
          challengeName={challenge.challengeName}
          firstExerciseName={challenge.Challenge_Exercises[0].exerciseName}
          userCount={challenge.userCount}
          showChallengeModal={showChallengeModal}
          challengeId={challengeId}
          progressStatus={challenge.progressStatus}
          mainMessage="챌린지 신청이 완료되었습니다!"
        ></ChallengeModal>
      )}
    </React.Fragment>
  );
};

const innerHeight = window.innerHeight - 177;

const ChallengeCont = styled.div`
  padding: 10px 20px 30px;
  display: flex;
  flex-direction: column;
  height: ${innerHeight}px;
  overflow-y: scroll;
  background-color: #f7f7fa;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background-color: white;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const HashTagCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const HashTag = styled.div`
  border: 1px solid rgba(74, 64, 255, 0.8);
  background-color: rgba(74, 64, 255, 0.1);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 13px;
  margin: 0 8px 6px 0;
`;

const UserCountCont = styled.div`
  border: 1px solid #000;
  background-color: #000;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 22px;
`;

const InfoCont = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 130px;
  margin-bottom: 50px;
`;

const TodayTypeContainer = styled.div`
  display: flex;
  height: 30px;
  margin: 8px 0px 14px;
  padding-top: 36px;
  border-top: 1px solid #000;
`;

const Divider = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.32);
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

const TextItem = styled.span`
  color: black;
  font-size: 15px;
  font-weight: 600;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
`;

const OpenList = styled.div`
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
  padding-bottom: 20px;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin: 0 20px;
`;

export default ChallengeDetail;
