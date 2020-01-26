import React, { Fragment } from "react";
import { Box, theme, Text, useDisclosure } from "@chakra-ui/core";
import { FaUser } from "react-icons/fa";
import styled from "@emotion/styled";
import BoardCreateModal from "./BoardCreateModal";
import { Board } from "../../routes/Home";
import BoardItem from "./BoardItem";

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  background: ${theme.colors.gray[100]};
  &:hover {
    background: ${theme.colors.gray[300]};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-auto-rows: 150px;
  margin: 16px 0;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Header = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

type BoardGridProps = {
  boards: Board[];
};

const BoardGrid: React.FC<BoardGridProps> = props => {
  const { boards } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <Header>
        <Box as={FaUser} />
        <Text fontWeight="medium" paddingLeft="10px">
          Personal Boards
        </Text>
      </Header>
      <Grid>
        {boards.map(board => (
          <BoardItem key={board.id} {...board} />
        ))}
        <Placeholder onClick={onOpen}>
          <Text fontWeight="medium">Create new board...</Text>
        </Placeholder>
      </Grid>
      <BoardCreateModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

export default BoardGrid;
