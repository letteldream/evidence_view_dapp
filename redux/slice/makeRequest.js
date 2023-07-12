import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  detailsMakeRequest: null
};

export const makeRequest = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    makeRequestDetails: (state, action) => {
      state.detailsMakeRequest = action.payload;
    },
  },
});

export const {
  makeRequestDetails
} =
  makeRequest.actions;
export default makeRequest.reducer;
