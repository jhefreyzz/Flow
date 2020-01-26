import React, { useState, memo } from "react";
import styled from "@emotion/styled";
import { Input, Button, IconButton } from "@chakra-ui/core";
import { customTheme } from "../../App";

const Form = styled.form<{ background: string }>`
  display: flex;
  flex-direction: column;
  background: ${props => props.background};
  height: auto;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  border-radius: 3px;
  transition: height 0.3s ease;
`;

const Action = styled.div`
  margin-top: 4px;
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  grid-gap: 4px;
  justify-items: start;
  justify-content: start;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  font-weight: bold;
  color: grey;
  background: transparent;
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.4);
  }
  &:active {
    background: rgba(255, 255, 255, 0.6);
    transition: background 0s ease;
  }
`;

type BoardCreateListProps = {
  handleFormclose: () => void;
  handleCreateList: (title: string) => void;
};

const BoardCreateList: React.FC<BoardCreateListProps> = props => {
  const { handleFormclose, handleCreateList } = props;
  const { palette } = customTheme;
  const [title, setTitle] = useState("");
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCreateList(title);
  };

  return (
    <Form background={palette.shades["200"]} onSubmit={handleSubmit}>
      <Input
        size="sm"
        autoFocus
        color="black"
        placeholder="Enter list title..."
        fontWeight="bold"
        value={title}
        onChange={handleChangeTitle}
      />
      <Action>
        <Button type="submit" variantColor="green" size="sm">
          Add list
        </Button>
        <StyledIconButton
          icon="close"
          aria-label="close"
          size="sm"
          onClick={handleFormclose}
        />
      </Action>
    </Form>
  );
};

export default memo(BoardCreateList);
