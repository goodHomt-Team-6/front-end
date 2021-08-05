import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import { history } from '../redux/configureStore';

const NavBar = (props) => {

  return (
    <>
      <BtnWrapper>
        <RouteBox>
          <Title>Workout</Title>
        </RouteBox>
        <RouteBox>
          <Title>Calendar</Title>
        </RouteBox>

        <AddBtn onClick={() => {
          history.push('/exercise');
        }}>+</AddBtn>

        <RouteBox>
          <Title>Community</Title>
        </RouteBox>
        <RouteBox>
          <Title>My</Title>
        </RouteBox>




      </BtnWrapper>
    </>
  );
};

export default NavBar;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: black;
  height: 80px;
`;

const RouteBox = styled.div`
  padding: 0px;
  margin: 0px;  
`;

const Title = styled.span`
  color: white;
`;


const AddBtn = styled.button`
  position: relative;
  bottom: 30px;
  color: white;
  font-size: 30px;
  width: 72px;
  height: 72px;
  border: 3px solid ${Color.bgIvory};
  border-radius: 50%;
  background-color: ${Color.mainBlue};
  margin: 0px auto;
`;