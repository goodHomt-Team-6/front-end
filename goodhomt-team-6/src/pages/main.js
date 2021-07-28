import React from 'react';
import styled from 'styled-components';
import { Button, Image } from "../shared/Styles";
import plusButton from '../img/plus-button.svg';
import { history } from '../redux/configureStore';

import ImportExercise from "../components/ImportExercise";

// 메인 페이지 컴포넌트
const Main = (props) => {
  const onMealButtonClick = () => {
    history.push('/exercise');
  };
  const breakfast = JSON.parse(localStorage.getItem('breakfast') || 'null');

  return (
    <Wrapper>

      {/* 유저 프로필 */}
      <UserWrapper>
        <InfoBox>
          <Image
            src="https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg">
          </Image>
          <Text>안녕하세요,
            <br />지음님</Text>
        </InfoBox>

        <DateBox>
          <span>&lt;</span>
          <Today>Aug 5</Today>
          <span>&gt;</span>
        </DateBox>
      </UserWrapper>


      {/* 운동 등록하기 */}
      <RegisterWrapper>
        <Index>운동 등록하기</Index>
        <Button
          width="100%"
          height="50px"
          _onClick={onMealButtonClick}
        >+</Button>
      </RegisterWrapper>


      {/* 운동 불러오기 */}
      {breakfast ?
        <div className="meal-menu">
          {Object.entries(breakfast).map(([name, value], i) =>
            <div key={i} className="meal-menu-entry">{name}{value.count}</div>
          )}
        </div>
        : <ImportExercise />
      }

    </Wrapper >
  );
};


export default Main;

const Wrapper = styled.div`
      padding: 1.5rem;
      width: 100%;
      height: 100%;
      `;

const RegisterWrapper = styled.div`
      height: 15rem;
      `;

const Index = styled.h2`
      font-size: 0.9rem;
      `;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const DateBox = styled.div`

`;

const Today = styled.span`
  font-size: 1rem;
  margin: 0px 14px;
`;

const Text = styled.span`
  font-size: 1rem;
`;