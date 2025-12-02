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
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginReducer from "../Slice/LoginSlice"
import SignUpReducer from "../Slice/SignUpSlice"
import ForgoteReducer from "../Slice/ForgoteSlice"
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
import GetVideoReducer from '../Slice/GetVideoSlice';
import GetFounderReducer from '../Slice/GetFounderSlice';
import GetArticleReducer from '../Slice/GetArticleSlice';
import SettleUpReducer from '../Slice/SettleUpSlice';
import HelpAndSupportReducer from '../Slice/HelpAndSupportSlice';
import PrivacyPolicyReducer from '../Slice/PrivacyPolicySlice';
import GetInterestReducer from '../Slice/GetInterestSlice';
import EditProfileReducer from '../Slice/EditProfileSlice';

const rootReducer = combineReducers({
  Login: LoginReducer,
  SignUp: SignUpReducer,
  Forgote: ForgoteReducer,
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
  AddGroup : AddGroupReducer,
  GetVideo : GetVideoReducer,
  GetFounder : GetFounderReducer, 
  GetArticle : GetArticleReducer,
  SettleUp : SettleUpReducer,
  HelpAndSupport : HelpAndSupportReducer,
  PrivacyPolicy : PrivacyPolicyReducer,
  GetInterest : GetInterestReducer,
  EditProfile : EditProfileReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'Login', 
    'SignUp', 
    'Forgote', 
    'AddTransaction', 
    'AddWishlist', 
    'Editwishlist',
    'DeleteWishlist',
    'GetTransaction',
    'GetWishlist',
    'GetUserDetails',
    'GetFriends',
    'GetGroups',
    'AddPaymentLog',
    'GetPaymentLog',    
    'AddFriend',
    'AddGroup',
  ],
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
