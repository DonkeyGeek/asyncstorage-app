import {createStore, combineReducers, applyMiddleware} from 'redux';
import appReducer from './reducers/appReducer';
import userInfoReducer from './reducers/userInfoReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    users: appReducer,
    infos: userInfoReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;