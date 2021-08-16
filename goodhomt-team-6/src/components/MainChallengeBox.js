import React from 'react';
import styled from 'styled-components';
import Mascort from '../img/mascort_white.svg';
import { Image, Text } from '../shared/Styles';
import moment from 'moment';

const ChallengeBox = (props) => {
  const formatDate = () => {
    const dateTime = props.myFirstChallenge.Challenge.challengeDateTime;
    const year = dateTime.slice(0, 4);
    const month = dateTime.slice(4, 6);
    const date = dateTime.slice(6, 8);
    const format = `${year}-${month}-${date}T00:00:00.000Z`;
    const DAYS = {
      Monday: '월',
      Tuesday: '화',
      Wednesday: '수',
      Thursday: '목',
      Friday: '금',
      Saturday: '토',
      Sunday: '일',
    };

    const returnDate = `${month < 10 ? dateTime.slice(5, 6) : month}/${
      date < 10 ? dateTime.slice(7, 8) : date
    }`;
    const returnDay = DAYS[moment(format).format('dddd')];
    const returnTime =
      dateTime.slice(8, 10) < 12
        ? `오전 ${dateTime.slice(8, 10)}:${dateTime.slice(10, 12)}`
        : `오후 ${dateTime.slice(8, 10) - 12}:${dateTime.slice(10, 12)}`;

    return `${returnDate}(${returnDay}) ${returnTime}`;
  };

  return (
    <React.Fragment>
      <Container {...props}>
        <LeftCont>
          <Image src={Mascort} borderRadius="0" width="29px" height="28px" />
          <TextCont>
            <Text type="contents" fontSize="9px" margin="0">
              {formatDate()}
            </Text>
            <Text type="contents" fontSize="18px" margin="0">
              {props.myFirstChallenge.Challenge.challengeName}
            </Text>
          </TextCont>
        </LeftCont>
        <Button {...props}>
          {props.status === 'before' && '참가 대기중'}
          {props.status === 'start' && 'Go!'}
          {props.status === 'end' && '운동 완료!'}
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default ChallengeBox;

const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  color: white;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
  ${(props) => props.status === 'end' && 'background-color: #4A40FF;'}
  ${(props) =>
    (props.status === 'start' || props.status === 'before') &&
    'background-color: #000;'}
`;

const Button = styled.div`
  width: 80px;
  line-height: 28px;
  text-align: center;
  border-radius: 14px;
  font-weight: 600;
  font-size: 12px;
  ${(props) => props.status === 'end' && 'background-color: #000;'}
  ${(props) =>
    (props.status === 'start' || props.status === 'before') &&
    'background-color: #6259FF;'}
`;

const TextCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const LeftCont = styled.div`
  display: flex;
  align-items: center;
`;
