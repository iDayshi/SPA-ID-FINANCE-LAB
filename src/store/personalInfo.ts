import { createSlice } from '@reduxjs/toolkit';

const PersonalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState: {
    entities: null,
  },
  reducers: {
    PersonalInfoRequested: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: personalInfoReducer, actions } = PersonalInfoSlice;
const { PersonalInfoRequested } = actions;

export const updatePersonalInfo =
  ({ payload }: { payload: any }) =>
  async (dispatch: any) => {
    dispatch(PersonalInfoRequested(payload));
  };

export const getPersonalInfo =
  () => (state: { personalInfo: { entities: any } }) =>
    state.personalInfo.entities;

export default personalInfoReducer;
