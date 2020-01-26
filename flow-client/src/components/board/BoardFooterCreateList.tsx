import React from "react";
import styled from "@emotion/styled";
import { Icon, Text } from "@chakra-ui/core";

const Container = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const ActionPlaceholder = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
`;

type BoardFooterCreateListProps = {
  handleFormOpen: () => void;
};

const BoardFooterCreateList: React.FC<BoardFooterCreateListProps> = props => {
  const { handleFormOpen } = props;
  return (
    <Container>
      <ActionPlaceholder onClick={handleFormOpen}>
        <Icon name="add" />
        <Text margin="0" paddingLeft="5px">
          Add another list
        </Text>
      </ActionPlaceholder>
    </Container>
  );
};

export default BoardFooterCreateList;
