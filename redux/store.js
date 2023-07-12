import { configureStore } from '@reduxjs/toolkit';

import web3Slice from './slice/web3';
import makeRequest from './slice/makeRequest';

const middleware = (getDefaultMiddleware) => {

  return [
    ...getDefaultMiddleware({
      serializableCheck: false,
    })
  ];
};

export const store = configureStore({
  reducer: {
    web3Slice,
    makeRequest,
  },
  // preloadedState: {},
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
});
