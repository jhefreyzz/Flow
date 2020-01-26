import React from "react";
import styled from "@emotion/styled";
import { Card } from "../../routes/Home";
import { Droppable, Draggable } from "react-beautiful-dnd";
import BoardCardItem from "./BoardCardItem";
import BoardCreateCard from "./BoardCreateCard";

const Container = styled.div`
  min-height: 26px;
  flex: 1;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const ScrollView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  flex: 1;
  padding: 0 8px;
`;

type BoardListCardProps = {
  cards: Card[];
  listId: string;
  isFormShow: boolean;
  handleFormClose: () => void;
};

const BoardListCard: React.FC<BoardListCardProps> = props => {
  const { cards, listId, isFormShow, handleFormClose } = props;

  return (
    <Droppable droppableId={listId} type="CARD" ignoreContainerClipping>
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <ScrollView>
            {cards.map((card, index) => (
              <Draggable draggableId={card.id} index={index} key={card.id}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                  >
                    <BoardCardItem
                      isDragging={dragSnapshot.isDragging}
                      card={card}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {isFormShow && (
              <BoardCreateCard
                handleClose={handleFormClose}
                handleSubmit={() => console.log("test")}
              />
            )}
          </ScrollView>
        </Container>
      )}
    </Droppable>
  );
};

export default BoardListCard;
