// @flow


export interface Dog {
  id: string,
  photoUrl: string,
}

export interface DogRepo {
  retrieve: () => Promise<Dog[]>,
  forever: () => AsyncIterable<Dog>
}