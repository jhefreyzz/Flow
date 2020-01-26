import React from "react";
import styled from "@emotion/styled";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Button
} from "@chakra-ui/core";

const Container = styled.div`
  height: 48px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledButton = styled(Button)`
  font-weight: 700;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.4);
  }
  &:active {
    background: rgba(255, 255, 255, 0.6);
    transition: background 0s ease;
  }
`;

const StyledPreview = styled(EditablePreview)`
  font-weight: 500;
  font-size: 1.5rem;
  color: white;
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StyledInput = styled(EditableInput)`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
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
    border: none;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

type BoardHeaderProps = {
  boardName: string;
  handleDeleteBoard: () => void;
  handleChangeBoardName: (name: string) => void;
};

const BoardHeader: React.FC<BoardHeaderProps> = props => {
  const { boardName, handleDeleteBoard, handleChangeBoardName } = props;
  return (
    <Container>
      <Editable
        defaultValue={boardName}
        selectAllOnFocus={false}
        onSubmit={(newValue: any) => handleChangeBoardName(newValue)}
        submitOnBlur={true}
      >
        <StyledPreview />
        <StyledInput spellCheck="false" autoCorrect="false" />
      </Editable>
      <StyledButton leftIcon="close" size="sm" onClick={handleDeleteBoard}>
        Delete board
      </StyledButton>
    </Container>
  );
};

export default BoardHeader;
