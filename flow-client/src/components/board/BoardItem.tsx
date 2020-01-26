import React from "react";
import { Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { Board } from "../../routes/Home";
import styled from "@emotion/styled";

const Container = styled.div<{ background: string }>`
  border-radius: 3px;
  width: 100%;
  background: ${props => props.background};
  height: 100%;
  padding: 8px;
  color: white;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none;
    transition: background 0.3s ease;
  }
  &:hover::before {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const BoardItem = ({ id, name, ...props }: Board) => (
  <Link to={{ pathname: `b/${id}` }} style={{ textDecoration: "none" }}>
    <Container {...props}>
      <Text fontSize="xl">{name}</Text>
    </Container>
  </Link>
);

export default BoardItem;
