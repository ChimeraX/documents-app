import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import user from './user';
import login from './login';
import authorize from './authorize';
import client from './client';

const reducer = combineReducers({
    user, login, authorize, client
});

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
