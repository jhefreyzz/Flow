import React, { memo } from "react";
import { Flex, Button, Text, IconButton } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { FaColumns, FaSignOutAlt } from "react-icons/fa";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

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

const StyledIconButton = styled(IconButton)`
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

type HeaderProps = {
  inHome?: boolean;
};

const Header: React.FC<HeaderProps> = props => {
  const firebase = useFirebase();
  const history = useHistory();
  const handleLogout = () => {
    firebase.logout();
  };

  const redirectToHome = () => {
    history.push("/");
  };

  return (
    <Flex
      as="header"
      padding="8px"
      width="100%"
      bg={props.inHome ? "blue.500" : "rgba(0, 0, 0, 0.15)"}
      justify="space-between"
      align="center"
    >
      <StyledButton leftIcon={FaColumns} size="sm" onClick={redirectToHome}>
        Boards
      </StyledButton>
      <Text color="white" fontWeight="bold">
        Flow
      </Text>
      <StyledIconButton
        size="sm"
        icon={FaSignOutAlt}
        aria-label="signout"
        onClick={handleLogout}
      />
    </Flex>
  );
};

export default memo(Header);
