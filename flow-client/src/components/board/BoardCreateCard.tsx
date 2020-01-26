import React, { useState, memo } from "react";
import TextArea from "react-autosize-textarea";
import styled from "@emotion/styled";
import { Button, Box } from "@chakra-ui/core";
import { customTheme } from "../../App";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
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

const ButtonClose = styled(Button)<{ color: string }>`
  color: ${props => props.color};
  background: transparent;
`;

const PaperInput = styled(Box)`
  margin-bottom: 4px;
  height: auto;
  background: white;
  padding: 8px;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 4px 0px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

const TitleInput = styled(TextArea)`
  border: none;
  background: transparent;
  box-shadow: none;
  resize: none;
  max-height: 162px;
  min-height: 54px;
  word-wrap: break-word;
  padding: 0.2rem;
  width: 100%;
  outline: none;

  &:hover,
  &:focus {
    border: none;
    background: transparent;
    box-shadow: none;
  }
`;
const Empty = styled.span`
  display: none;
`;

type BoardCreateCardProps = {
  handleClose: () => void;
  handleSubmit: (name: string) => void;
};

const BoardCreateCard: React.FC<BoardCreateCardProps> = props => {
  const palette = customTheme.palette;
  const { handleClose, handleSubmit } = props;
  const [title, setTitle] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submitted.");
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.which === 27) {
      handleClose();
    }

    if (event.which === 13) {
      event.preventDefault();
      if (Boolean(title)) {
        handleSubmit(title);
        setTitle("");
        event.currentTarget.scrollIntoView();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Form {...props} onSubmit={onSubmit}>
      <PaperInput>
        <TitleInput
          placeholder="Enter a title for this card..."
          value={title}
          autoFocus
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
      </PaperInput>
      <Action>
        <Button type="submit" variantColor="green" size="sm">
          Add Card
        </Button>
        <ButtonClose
          color={palette.shades[400]}
          type="button"
          leftIcon="close"
          size="sm"
        >
          <Empty />
        </ButtonClose>
      </Action>
    </Form>
  );
};

export default memo(BoardCreateCard);
