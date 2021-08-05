import React, { useState } from 'react';
import styled from 'styled-components';
import Color from '../shared/Color';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DropDown = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectName, setSelectName] = useState('전체 기간');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const allHandleClose = () => {
    setAnchorEl(null);
    setSelectName('전체 기간');
  };

  const dayAgoHandleClose = () => {
    setAnchorEl(null);
    setSelectName('하루 전');
  };

  const weekAgoHandleClose = () => {
    setAnchorEl(null);
    setSelectName('일주일 전');
  };

  const monthAgoHandleClose = () => {
    setAnchorEl(null);
    setSelectName('한 달 전');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ fontSize: "18px" }}>
          {selectName}
        </Button>
      </ButtonWrapper>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={allHandleClose}>전체 기간</MenuItem>
        <MenuItem onClick={dayAgoHandleClose}>하루 전</MenuItem>
        <MenuItem onClick={weekAgoHandleClose}>일주일 전</MenuItem>
        <MenuItem onClick={monthAgoHandleClose}>한 달 전</MenuItem>
      </Menu>
    </div>
  );
};

export default DropDown;

const ButtonWrapper = styled.div`

`;