// @flow

import nanoid from "nanoid";

import type {Dog} from "../models/Dog";

// State

export type KeyedAsyncGenerator<T> = {
  items: AsyncGenerator<T, void, void>,
  key: string,
}

type State = {
  dogss: $ReadOnlyArray<KeyedAsyncGenerator<Dog>>;
};

const initialState: State = {
  dogss: [],
};

// Action

type Append = {|
  type: "APPEND",
  payload: {
    dogs: AsyncGenerator<Dog, void, void>,
  }
|};

type Remove = {|
  type: "REMOVE",
  payload: {|
    key: string
  |}
|};

type Action = Append | Remove;

const APPEND = "APPEND";
const REMOVE = "REMOVE";

export const actions = {
  append: (dogs: AsyncGenerator<Dog, void, void>): Append => ({
    type: APPEND,
    payload: {
      dogs
    }
  }),
  remove: (key: string): Remove => ({
    type: REMOVE,
    payload: {
      key,
    }
  })
};

// Reducer

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case APPEND: {
      const dogs = {
        items: action.payload.dogs,
        key: nanoid(),
      };
      return {
        ...state,
        dogss: [ ...state.dogss, dogs ],
      };
    }
    case REMOVE: {
      return {
        ...state,
        dogss: state.dogss.filter((dogs) => dogs.key !== action.payload.key),
      }
    }
    default:
      return state;
  }
}