// @flow

import type {Dog} from "../models/Dog";

// State

type State = {
  dogs: Dog[]
};

const initialState: State = {
  dogs: []
};

// Action

type FetchDogs = {|
  type: "FETCH_DOGS",
  payload: {
    dogs: Dog[]
  }
|}

type Append = {|
  type: "APPEND",
  payload: {
    dog: Dog
  }
|};

type Action = FetchDogs | Append;

const FETCH_DOGS = "FETCH_DOGS";
const APPEND = "APPEND";

export const actions = {
  fetchDogs: (dogs: Dog[]): FetchDogs => ({
    type: FETCH_DOGS,
    payload: {
      dogs
    }
  }),
  append: (dog: Dog): Append => ({
    type: APPEND,
    payload: {
      dog
    }
  }),
};

// Reducer

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_DOGS: {
      return {
        ...state,
        dogs: [ ...action.payload.dogs ],
      }
    }
    case APPEND: {
      return {
        ...state,
        dogs: [ ...state.dogs, action.payload.dog ],
      }
    }
    default:
      return state;
  }
}