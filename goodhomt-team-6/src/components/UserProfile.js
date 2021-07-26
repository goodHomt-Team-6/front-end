import React from 'react';
import styled from 'styled-components';
import { Image } from "../shared/Styles";

// 유저정보 컴포넌트
const UserProfile = (props) => {
  return (
    <Wrapper>
      <InfoBox>
        <Image
          src="https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg">
        </Image>
        <Text>안녕하세요,
          <br />지음님</Text>
      </InfoBox>
      <Today>7월 20일</Today>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Today = styled.span`
  font-size: 1rem;
`;

const Text = styled.span`
  font-size: 1rem;
`;