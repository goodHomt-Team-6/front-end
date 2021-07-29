import React, { useState, useRef, useMemo } from 'react';
import Color from '../shared/Color';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input, Text, Image } from '../shared/Styles';
import logger from '../shared/Logger';

const InputExercise = (props) => {
  const dispatch = useDispatch();

  return <React.Fragment></React.Fragment>;
};

export default InputExercise;
