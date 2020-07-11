import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import user from './user';
import login from './login';
import authorize from './authorize';
import client from './client';
import register from './register';
import folder from './folder';

const reducer = combineReducers({
    user, login, authorize,
    client, register, folder,
});

// const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
