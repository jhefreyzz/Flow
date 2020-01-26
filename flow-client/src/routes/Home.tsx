import React, { memo } from "react";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import { Flex, Box } from "@chakra-ui/core";
import Header from "../components/shared/Header";
import BoardGrid from "../components/board/BoardGrid";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export type Card = {
  id: string;
  name: string;
};

export type List = {
  id: string;
  name: string;
  cards: Card[];
};

export type Board = {
  background: string;
  name: string;
  id: string;
  lists?: List[];
  tasks?: any;
  [key: string]: any;
};

const Home = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "boards",
      where: ["createdBy", "==", auth.uid],
      orderBy: ["createdAt", "asc"]
    }
  ]);

  const boards: Board[] = useSelector(
    (state: RootState) => state.firestore.ordered.boards
  );

  if (!isLoaded(boards)) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" height="100vh">
      <Header inHome={true} />
      <Box as="main" flex="1" overflowY="auto" padding="60px">
        <BoardGrid boards={boards} />
      </Box>
    </Flex>
  );
};

export default memo(Home);
