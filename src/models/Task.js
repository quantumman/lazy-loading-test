// @flow

export type Task<T> = {
  action: () => Promise<T>,
  cancel: () => void,
}

