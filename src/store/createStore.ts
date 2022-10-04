import { combineReducers, configureStore } from '@reduxjs/toolkit';
import hobbiesReducer from './hobby';
import oceansReducer from './ocean';
import personalInfoReducer from './personalInfo';
import signUpInfoReducer from './signUpInfo';

const rootReeducer = combineReducers({
  personalInfo: personalInfoReducer,
  signUpInfo: signUpInfoReducer,
  hobbies: hobbiesReducer,
  oceans: oceansReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReeducer,
  });
}
