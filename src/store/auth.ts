import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    authRequested: (state) => {
      state.isLogin = true;
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
const { authRequested } = actions;

export const authStatus = () => (dispatch: any, getState: any) => {
  dispatch(authRequested());
};

export const getAuth = () => (state: { qualities: { auth: boolean } }) =>
  state.qualities.auth;

export default authReducer;
