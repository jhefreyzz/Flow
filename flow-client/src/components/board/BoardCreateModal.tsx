import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  Button,
  Icon
} from "@chakra-ui/core";
import { customTheme } from "../../App";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";

const InputTitle = styled(Input)`
  color: white;
  font-weight: 700;
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  border-radius: 3px;
  transition: background 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Form = styled.form`
  display: grid;
  grid-auto-flow: row;
  gap: 8px;
  grid-gap: 8px;
  width: 300px;
  margin: 56px auto;
`;

const BoardBox = styled.div<{ background: string }>`
  border-radius: 3px;
  height: 100px;
  padding: 2rem;
  transition: background 0.3s ease;
  background: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorsBox = styled.div`
  display: grid;
  grid-gap: 10px;
  gap: 10px;
  grid-template-columns: repeat(5, minmax(32px, 1fr));
  grid-auto-rows: 32px;
`;

const Color = styled.div<{ background: string; hover: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: white;
  transition: background 0.3s ease;
  cursor: pointer;
  background: ${props => props.background};

  &:hover {
    background: ${props => props.hover};
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BoardCreateModal = ({ isOpen, onClose }: ModalProps) => {
  const [boardColor, setBoardColor] = useState(customTheme.palette.blue[500]);
  const [title, setTitle] = useState("");

  const auth = useSelector((state: RootState) => state.firebase.auth);
  const firestore = useFirestore();

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBackgroundChange = (bg: string) => {
    setBoardColor(bg);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
    firestore
      .collection("boards")
      .add({
        name: title,
        background: boardColor,
        createdBy: auth.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setBoardColor(customTheme.palette.blue[500]);
        setTitle("");
      });
  };

  const renderColorBox = ([name, value]: [string, any]) => {
    const background = value[500];
    const hover = value[600];
    return (
      <Color
        key={name}
        background={background}
        hover={hover}
        onClick={() => handleBackgroundChange(background)}
      >
        {boardColor === background && <Icon name="check" />}
      </Color>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="none" boxShadow="none">
        <Form onSubmit={handleSubmit}>
          <BoardBox background={boardColor}>
            <InputTitle
              size="lg"
              focusBorderColor="none"
              placeholder="Enter board name"
              value={title}
              onChange={handleChangeTitle}
            />
          </BoardBox>
          <ColorsBox>
            {Object.entries(customTheme.palette).map(renderColorBox)}
          </ColorsBox>
          <Button
            _disabled={{
              background: "white",
              color: "black",
              cursor: "not-allowed"
            }}
            type="submit"
            isDisabled={!title}
            justifySelf="start"
            variantColor="green"
          >
            Create board
          </Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default BoardCreateModal;
