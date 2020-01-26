import React, { memo } from "react";
import { Text, Box } from "@chakra-ui/core";
import { customTheme } from "../../App";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Card } from "../../routes/Home";

const Container = styled(Box)<{
  background: string;
  border: string;
  isDragging: boolean;
}>`
  cursor: pointer;
  margin-bottom: 8px;
  outline: none;
  transition: background 85ms ease;

  &:hover {
    background: ${props => props.background};
  }
  ${props =>
    props.isDragging
      ? css`
          border: 1px solid ${props.border};
          border-bottom-color: ${props.border};
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
        `
      : ""}
`;

const Title = styled(Text)<{ color: string }>`
  color: ${props => props.color};
  margin: 0;
  overflow: hidden;
  word-wrap: break-word;
`;

type BoardCardItemProps = {
  isDragging: boolean;
  card: Card;
};

const BoardCardItem: React.FC<BoardCardItemProps> = props => {
  const palette = customTheme.palette;
  const { card, isDragging } = props;
  return (
    <Container
      background={palette.shades[100]}
      border={palette.shades[300]}
      isDragging={isDragging}
    >
      <Title color={palette.shades[600]}>{card.name}</Title>
    </Container>
  );
};

export default memo(BoardCardItem);
