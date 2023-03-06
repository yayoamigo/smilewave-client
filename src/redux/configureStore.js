import { configureStore } from '@reduxjs/toolkit';
import postSlice from './ducks/postSlice';
import usersSlice from './ducks/userSlice';
import postUserSlice from './ducks/userPostSlice';
import authSlice from './ducks/authSlice';
import friendsSlice from './ducks/friendsSlice';
import adminSlice from './ducks/adminSlice';

const store = configureStore({
    reducer: {
      post: postSlice.reducer,
      users: usersSlice.reducer,
      postUser: postUserSlice.reducer,
      login: authSlice.reducer,
      friends: friendsSlice.reducer,
      admin: adminSlice.reducer,
    },
  });
  
  export default store;
  