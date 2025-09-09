import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../features/user/userSlice';


const rootReducer = combineReducers({
user: userReducer,
});


const persistConfig = {
key: 'root',
storage: AsyncStorage,
whitelist: ['user'],
};


export default persistReducer(persistConfig, rootReducer);