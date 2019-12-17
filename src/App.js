// @flow

import React from 'react';
import styled from 'styled-components';
import type {Dog} from "./models/Dog";
import LazyList from "./LazyList";
import type {KeyedAsyncGenerator} from "./modules/animals";

type Props = {
  dogss: Array<KeyedAsyncGenerator<Dog>>,
  onClickAdd: () => void,
  onClickRemove: (string) => void,
}

const S = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-content: flex-start;
  `,
  Content: styled.div`
    position: relative;
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
  AddButton: styled.button`
    position: fixed;
    top: 2em;
    left: 10em;
    width: 7em;
    height: 5em;   
  `,
  Img: styled.img`
    width: 10em;
    height: 10em;
  `,
};

function App({dogss, onClickAdd, onClickRemove}: Props) {
  return (
    <S.Container>
      {dogss
        .map(({items, key}) => (
          <S.Content key={key}>
            <LazyList
              items={items}
            >
              {dog => (<S.Img src={dog.photoUrl} key={dog.id} alt={"Bow!"}/>)}
            </LazyList>
            <S.ButtonGroup>
              <S.Button onClick={() => onClickRemove(key)}>Remove {key}</S.Button>
            </S.ButtonGroup>
          </S.Content>
        ))
      }
      <S.AddButton onClick={onClickAdd}>Add</S.AddButton>
    </S.Container>
  );
}

export default App;
