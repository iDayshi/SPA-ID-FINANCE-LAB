import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import hobbiesReducer from './hobby';
import oceansReducer from './ocean';
import personalInfoReducer from './personalInfo';
import signUpInfoReducer from './signUpInfo';

const rootReeducer = combineReducers({
  auth: authReducer,
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
