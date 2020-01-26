import React from "react";
import { Spinner, Flex, Text } from "@chakra-ui/core";

type LoaderProps = {
  isRedirect?: boolean;
};

const Loader = (props: LoaderProps) => {
  return (
    <Flex align="center" direction="column" justify="center" height="100vh">
      {props.isRedirect && (
        <Text fontSize={40} color="gray.500" marginBottom="1rem">
          Redirecting to home page.
        </Text>
      )}
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
