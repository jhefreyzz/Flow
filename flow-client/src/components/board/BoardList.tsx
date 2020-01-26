import React, { memo } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Board } from "../../routes/Home";
import BoardInitialList from "./BoardInitialList";
import BoardListItem from "./BoardListItem";

const BoardCanvas = styled.div`
  flex: 1;
  position: relative;
`;

const BoardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
`;

const Column = styled.div`
  width: 272px;
  height: 100%;
  margin: 0 4px;
  display: inline-block;
  vertical-align: top;
  &:first-of-type {
    margin-left: 8px;
  }
  &:last-child {
    margin-right: 8px;
  }
`;

const onDragEnd = (result: DropResult) => {
  const { type } = result;

  if (type === "LIST") {
    console.log(`drops from ${type}`);
  }

  if (type === "CARD") {
    console.log(`drops from ${type}`);
  }
};

type BoardListProps = {
  board: Board;
  id: string;
};

const BoardList: React.FC<BoardListProps> = props => {
  const { board, id } = props;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardCanvas>
        <Droppable type="LIST" direction="horizontal" droppableId="board">
          {provided => (
            <BoardContent ref={provided.innerRef} {...provided.droppableProps}>
              {board.lists?.map((list, index) => (
                <Column key={list.id}>
                  <BoardListItem list={list} index={index} />
                </Column>
              ))}
              {provided.placeholder}
              <Column>
                <BoardInitialList boardId={id} />
              </Column>
            </BoardContent>
          )}
        </Droppable>
      </BoardCanvas>
    </DragDropContext>
  );
};

export default memo(BoardList);
