import { createSlice } from '@reduxjs/toolkit';
import shema from '../data/schema.json';

const hobbiesSlice = createSlice({
  name: 'hobbies',
  initialState: {
    entities: shema.hobby.anyOf,
  },
  reducers: {
    hobbiesReceved: (state, action) => {
      state.entities = action.payload;
          },
  },
});

const { reducer: hobbiesReducer, actions } = hobbiesSlice;
const { hobbiesReceved } = actions;

export const loadingHobbiesList =
  () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(hobbiesReceved(shema.hobby.anyOf));
  };

export const getHobbies = () => (state: { hobbies: { entities: any } }) =>
  state.hobbies.entities;

export default hobbiesReducer;
