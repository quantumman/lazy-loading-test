// @flow

import nanoid from "nanoid";
import type {Dog, DogRepo} from "../models/Dog";

const repo: DogRepo = {
  retrieve: async (): Promise<Dog[]> => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const { message } = await response.json();
    return [{ id: nanoid(), photoUrl: message }];
  },
  forever: async function*(): AsyncIterable<Dog> {
    const count = 115;

    for (let i = 0; i < count; i++) {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const { message } = await response.json();
      yield { id: nanoid(), photoUrl: message };
    }
  }
};


export default repo;