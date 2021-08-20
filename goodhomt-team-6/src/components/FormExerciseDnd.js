import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text, Image } from '../shared/Styles';
import DragIndicator from '../img/drag-indicator.svg';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';
import removeButton from '../img/remove_button.svg';
import logger from '../shared/Logger';

export default function FormExerciseDnd() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.exercise.routine[0].myExercise);
  const [touchStart, setToutchStart] = useState(false);
  const [touchedListIdx, setTouchedListIdx] = useState(null);
  logger(touchedListIdx);
  const handlelists = (result) => {
    if (!result.destination) return;
    const items = [...lists];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(exerciseCreator.reArrangeMyExercise(items));
  };

  return (
    <DragDropContext onDragEnd={handlelists}>
      <Droppable droppableId="lists">
        {(provided) => (
          <Container
            className="lists"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists.map((list, listIdx) => (
              <Draggable
                key={listIdx}
                // draggableId에는 string 값이 들어가야 함.
                draggableId={listIdx.toString()}
                index={listIdx}
                disableInteractiveElementBlocking="true"
              >
                {(provided) => (
                  <ListCont
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    id={listIdx}
                  >
                    {!touchStart && (
                      <Image
                        src={removeButton}
                        width="26px"
                        height="24px"
                        bgColor="#fff"
                        margin="0 10px 0 0"
                        _onClick={() => {
                          dispatch(exerciseCreator.removeSelectedItem(list));
                          dispatch(exerciseCreator.removeExerciseType(list));
                        }}
                      />
                    )}
                    {parseInt(touchedListIdx) === parseInt(listIdx) ? (
                      <List
                        touchStart={touchStart}
                        isTouched={
                          parseInt(touchedListIdx) === parseInt(listIdx)
                        }
                        onTouchStart={() => {
                          setToutchStart(true);
                          setTouchedListIdx(listIdx);
                        }}
                        onTouchEnd={() => {
                          setToutchStart(false);
                          setTouchedListIdx(null);
                        }}
                      >
                        <Text
                          type="contents"
                          minWidth="80px"
                          padding="0 0 0 30px"
                          fontWeight="600"
                          fontSize="1.1em"
                        >
                          {list.exerciseName}
                        </Text>
                        <Image
                          ref={provided.innerRef}
                          src={DragIndicator}
                          width="20px"
                          height="20px"
                          borderRadius="0"
                          margin="0 15px 0 0"
                        ></Image>
                      </List>
                    ) : (
                      <List
                        touchStart={touchStart}
                        isTouched={
                          parseInt(touchedListIdx) === parseInt(listIdx)
                        }
                        onTouchStart={() => {
                          setToutchStart(true);
                          setTouchedListIdx(listIdx);
                        }}
                        onTouchEnd={() => {
                          setToutchStart(false);
                          setTouchedListIdx(null);
                        }}
                      >
                        <Text
                          type="contents"
                          minWidth="80px"
                          padding="0 0 0 30px"
                          fontWeight="600"
                          fontSize="1.1em"
                        >
                          {list.exerciseName}
                        </Text>
                        <Image
                          ref={provided.innerRef}
                          src={DragIndicator}
                          width="20px"
                          height="20px"
                          borderRadius="0"
                          margin="0 15px 0 0"
                        ></Image>
                      </List>
                    )}
                  </ListCont>
                )}
              </Draggable>
            ))}
            {/* 가장 위로 위치를 변경할때 필요한 높이를 확보해준다고 한다. */}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const innerHeight = window.innerHeight - 175;

const Container = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background-color: #f7f7fa;
  height: ${innerHeight}px;
  overflow-y: scroll;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-left: ${(props) =>
    props.touchStart &&
    (props.isTouched
      ? '20px solid #4A40FF;'
      : '20px solid rgba(74, 64, 255, 0.3)')};
  margin-left: ${(props) =>
    props.touchStart && (props.isTouched ? '0' : '30px')};
  box-sizing: border-box;
`;

const ListCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  &:first-child {
    margin-top: 0;
  }
`;

const ListHead = styled.div`
  width: 20px;
  background-color: ${(props) =>
    props.touchStart ? `#4A40FF;` : 'rgba(74, 64, 255, 0.3)'};
`;
