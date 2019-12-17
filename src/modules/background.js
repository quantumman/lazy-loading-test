// @flow

// State

import type {Task} from "../models/Task";
import {create} from "../models/Task";

type State = {
  [key: string]: Task<any>
}

export const initialState: State = {};

// Action

type Start = {|
  type: "START",
  payload: {|
    key: string,
    task: Task<any>
  |}
|};

type Cancel = {|
  type: "CANCEL",
  payload: {|
    key: string,
  |}
|}

type Action = Start | Cancel;

export const START = "START";
export const CANCEL = "CANCEL";

export const actions = {
  start: <T>(key: string, task: Task<T>): Start => ({
    type: START,
    payload: {key, task: task},
  }),
  cancel: (key: string) => ({
    type: CANCEL,
    payload: {key}
  }),
};

// Reducer

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case START: {
      action.payload.task.action();
      return {
        ...state,
        [action.payload.key]: { ...action.payload.task },
      }
    }
    case CANCEL: {
      const { [action.payload.key]: task, ...rest } = state;
      if (task){
        task.cancel();
      }
      return rest;
    }
    default:
      return state;
  }
};
