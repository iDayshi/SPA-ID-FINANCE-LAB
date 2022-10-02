import { createSlice } from '@reduxjs/toolkit';

const PersonalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState: {
    isLogin: false,
  },
  reducers: {
    PersonalInfoRequested: (state) => {
      state.isLogin = true;
    },
  },
});

const { reducer: personalInfoReducer, actions } = PersonalInfoSlice;
const { PersonalInfoRequested } = actions;

export const updatePersonalInfo =
  () => async (dispatch: any, getState: any) => {
    dispatch(PersonalInfoRequested());
  };

export default personalInfoReducer;
