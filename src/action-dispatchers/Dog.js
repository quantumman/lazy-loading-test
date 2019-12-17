// @flow

import type {Dispatch} from "redux";
import {actions} from "../modules/animals";
import DogRepo from "../repositories/DogRepo";
import type {Dog} from "../models/Dog";

export default (dispatch: Dispatch<Object>, dogs: Dog[]) => {
  return {
    remove(key: string) : void {
      dispatch(actions.remove(key));
    },
    forever(): void {
       dispatch(actions.append(DogRepo.forever()));
    }
  };
};