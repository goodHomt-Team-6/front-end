import React from 'react';
import styled from 'styled-components';
import { Button, Image } from "../shared/Styles";

import UserProfile from "../components/UserProfile";
import RegisterExercise from "../components/RegisterExercise";
import ImportExercise from "../components/ImportExercise";

// 메인 페이지 컴포넌트
const Main = (props) => {
  return (
    <Wrapper>
      <UserProfile />
      <RegisterExercise />
      <ImportExercise />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  padding: 1.5rem;
`;
