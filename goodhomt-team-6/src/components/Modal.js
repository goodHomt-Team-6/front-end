import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import { Button, Input } from '../shared/Styles';
import './Modal.css';
import { history } from '../redux/configureStore';

const modalView = ({ classes }) => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.exercise.openModal);
  const myExercise = useSelector((state) => state.exercise.myExercise);
  const closeModal = () => {
    dispatch(exerciseCreator.openModal(false));
  };
  const [routineName, setRoutineName] = useState(null);
  const [emptyInput, setEmptyInput] = useState(false);
  const attentionInput = useRef();

  const submitRoutine = () => {
    if (!routineName) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    if (emptyInput) {
      attentionInput.current.classList.remove('vibrate-1');
      setTimeout(() => {
        attentionInput.current.classList.add('vibrate-1');
      }, 50);
      return;
    }
    const routine = {
      routineName: routineName,
      myExercise: myExercise,
    };
    dispatch(exerciseCreator.addRoutineAPI(routine));
    // 리덕스를 초기화 해주기 위해 함수를 재활용함. 네이밍과 헷갈리지 말것.
    dispatch(exerciseCreator.reArrangeMyExercise([]));
    history.replace('/');
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className={classes.paper}>
            <h3 id="transition-modal-title">루틴의 이름을 입력해주세요.</h3>
            {emptyInput ? (
              <Input
                ref={attentionInput}
                _onChange={(e) => {
                  setRoutineName(e.target.value);
                }}
                searchbox
                border="2px solid #F44335"
                attention
              />
            ) : (
              <Input
                _onChange={(e) => {
                  setRoutineName(e.target.value);
                }}
                searchbox
              />
            )}
            <ButtonCont>
              <Button
                width="47%"
                fontSize="16px"
                bgColor="#000"
                color="#fff"
                margin="0 6% 0 0"
                padding="10px 0"
                _onClick={closeModal}
              >
                취소
              </Button>
              <Button
                width="47%"
                fontSize="16px"
                bgColor="#000"
                color="#fff"
                padding="10px 0"
                _onClick={() => {
                  submitRoutine();
                }}
              >
                저장
              </Button>
            </ButtonCont>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default modalView;

const Box = styled.div`
  &:focus-visible {
    outline: none !important;
  }
  width: 80vw;
  box-sizing: border-box;
  text-align: center;
`;

const ButtonCont = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
