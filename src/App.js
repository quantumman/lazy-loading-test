// @flow

import React from 'react';
import styled from 'styled-components';
import type {Dog} from "./models/Dog";

type Props = {
  dogs: Dog[],
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
  `
};

function App({dogs}: Props) {
  return (
    <S.Container>
      <S.Content>
        {dogs.map(dog => (<img src={dog.photoUrl} key={dog.id} alt={"Bow!"} />))}
      </S.Content>
    </S.Container>
  );
}

export default App;
