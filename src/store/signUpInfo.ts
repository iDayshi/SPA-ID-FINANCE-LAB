import { createSlice } from '@reduxjs/toolkit';

const SignUpInfoSlice = createSlice({
  name: 'signUpInfo',
  initialState: {
    entities: null,
  },
  reducers: {
    SignUpInfoRequested: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: signUpInfoReducer, actions } = SignUpInfoSlice;
const { SignUpInfoRequested } = actions;

export const updateSignUpInfo =
  ({ payload }: { payload: any }) =>
  (dispatch: any) => {
    dispatch(SignUpInfoRequested(payload));
  };

export const getSignUpInfo = () => (state: { signUpInfo: { entities: any } }) =>
  state.signUpInfo.entities;

export default signUpInfoReducer;
