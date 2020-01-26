import React, { memo, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@chakra-ui/core";
import TextArea from "react-autosize-textarea";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { customTheme } from "../../App";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  flex: 0 0 auto;
  padding: 12px 68px 10px 8px;
  min-height: 22px;
  position: relative;
`;

const ClickTarget = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`;

const TitleInput = styled(TextArea)`
  background: transparent;
  max-height: 256px;
  min-height: 20px;
  height: 26px;
  resize: none;
  border: 1px solid transparent;
  box-shadow: none;
  font-weight: 700;
  overflow: hidden;
  word-wrap: break-word;
  margin-top: -4px;
  padding: 4px 7px;
  &:focus {
    background: rgba(255, 255, 255, 0.85);
  }
`;

const ButtonRemove = styled(Button)<{ color: string }>`
  position: absolute;
  top: 4px;
  right: 4px;
  background: transparent;
  color: ${props => props.color};
`;

type BoardListHeaderProps = {
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  title: string;
};

const BoardListHeader: React.FC<BoardListHeaderProps> = props => {
  const { dragHandleProps, title } = props;
  const [visible, isVisible] = useState(true);
  const [currentTitle, setTitle] = useState(title);
  const palette = customTheme.palette;
  const handleTitleClick = () => {
    isVisible(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (currentTitle) {
      console.log(currentTitle);
    } else {
      setTitle(event.target.value);
    }
    isVisible(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.which === 13 || event.which === 27) {
      event.currentTarget.blur();
    }
  };

  return (
    <Container {...dragHandleProps}>
      {visible && <ClickTarget onClick={handleTitleClick} />}
      <TitleInput
        spellCheck={false}
        autoCorrect={"false"}
        maxLength={512}
        value={currentTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeydown}
      />
      <ButtonRemove leftIcon="close" color={palette.shades[400]}>
        {" "}
      </ButtonRemove>
    </Container>
  );
};

export default memo(BoardListHeader);
