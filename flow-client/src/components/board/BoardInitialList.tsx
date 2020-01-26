import React, { memo, useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Text, Icon } from "@chakra-ui/core";
import BoardCreateList from "./BoardCreateList";
import { useFirestore } from "react-redux-firebase";

const Container = styled.div`
  border-radius: 3px;
  cursor: pointer;
  height: auto;
  min-height: 32px;
  padding: 4px;
  display: block;
  color: white;
  background: rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
  position: relative;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
const ActionPlaceholder = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
`;

const BoardInitialList: React.FC<{ boardId: string }> = props => {
  const firestore = useFirestore();
  const { boardId } = props;
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleCreateList = () => {
    console.log(firestore.doc(`/boards/${boardId}`).id);
    console.log(firestore.collection("boards").id);
    console.log(firestore.collection("boards").doc().id);

    // firestore.update(`/boards/${boardId}`, {
    //   lists: firebase.firestore.FieldValue.arrayUnion({
    //     title,
    //     test: firebase.firestore.
    //   })
    // });
  };

  return (
    <Container ref={containerRef}>
      <ActionPlaceholder onClick={handleFormOpen}>
        <Icon name="add" />
        <Text margin="0" paddingLeft="5px">
          Add another list
        </Text>
        {isOpen && (
          <BoardCreateList
            handleFormclose={handleFormClose}
            handleCreateList={handleCreateList}
          />
        )}
      </ActionPlaceholder>
    </Container>
  );
};

export default memo(BoardInitialList);
