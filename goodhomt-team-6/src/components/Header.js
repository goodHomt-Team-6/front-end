import React from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';

const Header = (props) => {
  return (
    <HeaderBox>
      <Index>index</Index>
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  height: 8vh;
  /* background-color: ${Color.header}; */
`;

const Index = styled.h1`
  height: 100%;
  margin: 0px;
  font-size: 15px;
  color: ${Color.navy};
  display: flex;
  justify-content: center;
  align-items: center;
`;

