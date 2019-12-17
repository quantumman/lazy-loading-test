//@flow

import { combineReducers } from 'redux'
import animals from "./animals";
import background from "./background";

export default combineReducers({
  animals,
  background
});