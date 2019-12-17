// @flow

import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import App from "../App"
import type { Dog } from "../models/Dog";
import DogActions from "../action-dispatchers/Dog";
import type {KeyedAsyncGenerator} from "../modules/animals";
import type {Abort} from "../action-dispatchers/Dog";

const useDogs = (): [ Array<KeyedAsyncGenerator<Dog>>, () => Abort, (string) => void ] => {
  const dispatch = useDispatch();
  const dogss = useSelector(state => state.animals.dogss);

  const dog = useMemo(() => DogActions(dispatch, dogss), [dispatch, dogss]);
  const forever = useCallback(() => dog.forever(), [dog]);
  const remove = useCallback((key: string) => {
    dog.remove(key);
  }, [dog]);

  return [dogss, forever, remove];
}

export default React.memo<{}>(() => {
  const [ dogss, forever, remove ] = useDogs();

  useEffect(() => {
    const abort = forever();
    return () => abort();
  }, []);

  return <App dogss={dogss} onClickAdd={() => { forever() }} onClickRemove={remove}/>;
});