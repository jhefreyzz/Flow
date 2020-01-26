import React, { memo } from "react";
import styled from "@emotion/styled";
import { useHistory, Redirect, useParams } from "react-router-dom";
import {
  useFirestore,
  isLoaded,
  isEmpty,
  useFirestoreConnect
} from "react-redux-firebase";
import Header from "../components/shared/Header";
import Loader from "../components/shared/Loader";
import BoardHeader from "../components/board/BoardHeader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BoardList from "../components/board/BoardList";

const Container = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: ${props => props.background};
`;

const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const firestore = useFirestore();
  // const [board, setBoard] = useState();
  const history = useHistory();

  const auth = useSelector((state: RootState) => state.firebase.auth);
  useFirestoreConnect([
    {
      collection: "boards",
      where: ["createdBy", "==", auth.uid],
      orderBy: ["createdAt", "asc"]
    }
  ]);

  const board = useSelector(
    (state: RootState) =>
      state.firestore.data.boards && state.firestore.data.boards[boardId]
  );

  const testBoards = {
    id: "100zc92x",
    background: "#fff",
    name: "My test",
    lists: [
      {
        id: "1a1x0zz",
        name: "list 1",
        cards: [
          {
            id: "1xx0zzz",
            name: "card 1"
          },
          {
            id: "1xa0zzz",
            name: "card 2"
          },
          {
            id: "1xx1zzz",
            name: "card 3"
          },
          {
            id: "1xx9zzz",
            name: "card 4"
          }
        ]
      },
      {
        id: "1a1xszz",
        name: "list 2",
        cards: [
          {
            id: "2xx0zzz",
            name: "cardd 1"
          },
          {
            id: "5xa0zzz",
            name: "cardf 2"
          },
          {
            id: "1vx1zzz",
            name: "cards 3"
          },
          {
            id: "17x9zzz",
            name: "carda 4"
          }
        ]
      },
      {
        id: "sa1x0zz",
        name: "list 3",
        cards: [
          {
            id: "1dx0zzz",
            name: "card 10"
          },
          {
            id: "1xa0zdz",
            name: "card 12"
          },
          {
            id: "1xx109z",
            name: "card 42"
          },
          {
            id: "1xx9mKz",
            name: "card 24"
          }
        ]
      }
    ]
  };

  if (!isLoaded(board)) {
    return <Loader />;
  }

  if (isEmpty(board)) {
    return <Redirect to="/" />;
  }

  const handleDeleteBoard = () => {
    firestore
      .collection("boards")
      .doc(boardId)
      .delete()
      .then(() => history.push("/"));
  };

  const handleChangeBoardName = (name: string) => {
    firestore.update(`/boards/${boardId}`, {
      name: name
    });
  };

  return (
    <Container background={board.background}>
      <Header />
      <Body>
        <BoardHeader
          boardName={board.name}
          handleDeleteBoard={handleDeleteBoard}
          handleChangeBoardName={handleChangeBoardName}
        />
        <BoardList board={testBoards} id={boardId} />
      </Body>
    </Container>
  );
};

export default memo(Board);
