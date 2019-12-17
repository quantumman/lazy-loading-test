// @flow

import type {Dispatch} from "redux";
import {actions} from "../modules/animals";
import {actions as background} from "../modules/background";
import DogRepo from "../repositories/DogRepo";
import type {Dog} from "../models/Dog";
import { create } from "../models/Task";
import {batch} from "react-redux";
import type {Task} from "../models/Task";

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
    stop: (): void => {
      dispatch(background.cancel("dog"));
    },
    forever: (): void => {
      const createTask = (): Task<void> => {
        const dogss = chunks(DogRepo.forever(), 10);
        const action = () => new Promise(async resolve => {
          for await (const dogs of dogss) {
            batch(() => {
              for (const dog of dogs) {
                dispatch(actions.append(dog));
              }
            });
        }
          resolve();
        });

        return {
          action,
          cancel: () => { dogss.return() },
        }
      };
      dispatch(background.start("dog", createTask()));
    }
  };
};