import React, { memo, useState, useRef, useEffect } from "react";
import { List } from "../../routes/Home";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { customTheme } from "../../App";
import BoardListHeader from "./BoardListHeader";
import BoardListCard from "./BoardListCard";
import BoardFooterCreateList from "./BoardFooterCreateList";

const Container = styled.div<{
  background: string;
  border: string;
  isDragging: boolean;
}>`
  border-radius: 3px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${props =>
    props.isDragging
      ? css`
          border: 1px solid ${props.border};
          border-bottom-color: ${props.border};
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
        `
      : ""}
`;

type BoardListItemProps = {
  list: List;
  index: number;
};

const BoardListItem: React.FC<BoardListItemProps> = props => {
  const { list, index } = props;
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = customTheme;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) {
        return;
      }
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleFormClose = () => {
    setOpen(false);
  };

  const handleFormOpen = () => {
    setOpen(true);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <Container
          background={theme.palette.shades[200]}
          border={theme.palette.shades[300]}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <BoardListHeader
            dragHandleProps={provided.dragHandleProps}
            title={list.name}
          />
          <div ref={containerRef}>
            <BoardListCard
              cards={list.cards}
              isFormShow={isOpen}
              listId={list.id}
              key={list.id}
              handleFormClose={handleFormClose}
            />
          </div>
          {!isOpen && <BoardFooterCreateList handleFormOpen={handleFormOpen} />}
        </Container>
      )}
    </Draggable>
  );
};

export default memo(BoardListItem);
