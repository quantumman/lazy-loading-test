// @flow

import type {Dispatch} from "redux";
import {actions} from "../modules/animals";
import DogRepo from "../repositories/DogRepo";
import type {Dog} from "../models/Dog";

export type Abort = () => void;

export default (dispatch: Dispatch<Object>, dogs: Dog[]) => {
  return {
    remove(key: string) : void {
      dispatch(actions.remove(key));
    },
    forever(): Abort {
      const dogs = DogRepo.forever();
      dispatch(actions.append(dogs));
      return () => { dogs.next(); }
    }
  };
};