import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginReducer from '../Slice/LoginSlice';
import AddTransactionReducer from '../Slice/AddTransactionSlice';
import AddWishlistReducer from '../Slice/AddWishlistSlice';
import EditWishlistReducer from '../Slice/EditWishlistSlice';
import DeleteWishlistReducer from '../Slice/DeleteWishlistSlice';
import GetTransactionReducer from '../Slice/GetTransectionSlice';
import GetWishlistReducer from '../Slice/GetWishlistSlice';
import GetUserDetailsReducer from '../Slice/GetUserDetailsSlice';
import GetFriendsReducer from '../Slice/GetFriendsSlice';
import GetGroupsReducer from '../Slice/GetGroupsSlice';
import AddPaymentLogReducer from '../Slice/AddPaymentLogSlice';
import GetPaymentLogReducer from '../Slice/GetPaymentLogSlice';
import AddFriendReducer from '../Slice/AddFriendSlice';
import AddGroupReducer from '../Slice/AddGroupSlice';

const rootReducer = combineReducers({
  Login: LoginReducer,
  AddTransaction: AddTransactionReducer,
  AddWishlist: AddWishlistReducer,
  Editwishlist: EditWishlistReducer,
  DeleteWishlist: DeleteWishlistReducer,
  GetTransaction: GetTransactionReducer,
  GetWishlist : GetWishlistReducer,
  GetUserDetails : GetUserDetailsReducer,
  GetFriends : GetFriendsReducer,
  GetGroups : GetGroupsReducer,
  AddPaymentLog : AddPaymentLogReducer,
  GetPaymentLog : GetPaymentLogReducer,
  AddFriend : AddFriendReducer,
  AddGroup : AddGroupReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Login', 'AddTransaction', 'AddWishlist', 'Editwishlist'],
  // blacklist: ["QuotationList", "ScheduleList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
