import { createSlice } from '@reduxjs/toolkit';
import oceanShema from '../data/schema.json';

const oceansSlice = createSlice({
  name: 'oceans',
  initialState: {
    entities: null,
    isLoading: true,
  },
  reducers: {
    oceansReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: oceansReducer, actions } = oceansSlice;
const { oceansReceved } = actions;

export const loadingOceansList =
  () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(oceansReceved(oceanShema.ocean.oneOf));
  };

export const getOceans = () => (state: { oceans: { entities: any } }) =>
  state.oceans.entities;

export default oceansReducer;
