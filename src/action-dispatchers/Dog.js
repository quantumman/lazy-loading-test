// @flow

import type {Dispatch} from "redux";
import {actions} from "../modules/animals";
import DogRepo from "../repositories/DogRepo";
import type {Dog} from "../models/Dog";
import {batch} from "react-redux";

async function* chunks(dogs: AsyncIterable<Dog>, size: number) {
  let chunk = [];
  for await (const dog of dogs) {
    chunk.push(dog);
    if (chunk.length == size) {
      yield [...chunk];
      chunk = [];
    }
  }
  yield [...chunk];
};

export default (dispatch: Dispatch<Object>, dogs: Dog[]) => {
  return {
    forever: (): Promise<void> => {
      return new Promise(async (resolve) => {
        const dogss = chunks(DogRepo.forever(), 10);
        for await (const dogs of dogss) {
          batch(() => {
            for (const dog of dogs) {
              dispatch(actions.append(dog));
            }
          })
        }
      });
    }
  };
};