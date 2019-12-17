// @flow

import React from 'react';
import styled from 'styled-components';
import type {Dog} from "./models/Dog";

type Props = {
  dogs: Dog[],
  onClickStart: () => void,
  onClickStop: () => void,
}

const S = {
  Container: styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-content: flex-start;
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  `,
  ButtonGroup: styled.div`
    position: fixed;
    bottom: 5em;
    background: transparent;
  `,
  Button: styled.button`
    width: 7em;
    height: 5em;
  `,
};

function App({dogs, onClickStart, onClickStop}: Props) {
  return (
    <S.Container>
      <S.Content>
        {dogs.map(dog => (<img src={dog.photoUrl} key={dog.id} alt={"Bow!"} />))}
      </S.Content>
      <S.ButtonGroup>
        <S.Button onClick={onClickStart}>Start</S.Button>
        <S.Button onClick={onClickStop}>Stop</S.Button>
      </S.ButtonGroup>
    </S.Container>
  );
}

export default App;
