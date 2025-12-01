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
<<<<<<< HEAD
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginReducer from "../Slice/LoginSlice"
import SignUpReducer from "../Slice/SignUpSlice"
import ForgoteReducer from "../Slice/ForgoteSlice"
 
const rootReducer = combineReducers({
  Login: LoginReducer,
  SignUp: SignUpReducer,
  Forgote: ForgoteReducer
=======
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
>>>>>>> ce5563a5464f3f6ed8bf9a43f6fc41ebbe70a045
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
<<<<<<< HEAD
  whitelist: ['Login', 'SignUp', 'Forgote'],
=======
  whitelist: ['Login', 'AddTransaction', 'AddWishlist', 'Editwishlist'],
>>>>>>> ce5563a5464f3f6ed8bf9a43f6fc41ebbe70a045
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
