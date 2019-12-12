// @flow

import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import App from "../App"
import type { Dog } from "../models/Dog";
import DogActions from "../action-dispatchers/Dog";


const useDogs = (): [ Dog[], () => Promise<void> ] => {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.animals.dogs);

  const dog = useMemo(() => DogActions(dispatch, dogs), [dispatch, dogs]);
  const forever = useCallback(() => dog.forever(), [dog]);

  return [dogs, forever];
}

export default React.memo<{}>(() => {
  const [ dogs, forever ] = useDogs();

  useEffect(() => {
    forever();
  }, []);

  return <App dogs={dogs} />;
});