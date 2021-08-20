import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text, Image } from '../shared/Styles';
import DragIndicator from '../img/drag-indicator.svg';
import { actionCreators as exerciseCreator } from '../redux/modules/exercise';

export default function FormExerciseDnd() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.exercise.routine[0].myExercise);
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
                  <List
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    id={listIdx}
                  >
                    <Text type="contents" minWidth="80px" padding="0 0 0 10px">
                      {list.exerciseName}
                    </Text>
                    <Text type="contents">
                      {list.set.filter((set) => set.type === 'exercise').length}
                      세트
                    </Text>
                    <Text type="contents">{list.set[0].weight}kg</Text>
                    <Text type="contents" padding="0 10px 0 0">
                      {list.set[0].count}회
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
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
  align-items: center;
`;
