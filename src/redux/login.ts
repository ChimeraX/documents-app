import Credentials from '../model/Credentials';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';
import { Authentication } from '../model/Authentication';
import { setAuth } from './user';
import { Action } from 'redux';
import Error from './Error';

type LoginErrorCause = 'email' | 'password' | 'server';

export interface LoginError extends Error<LoginErrorCause> {
}

export interface LoginAction extends Action {
    error?: LoginError;
}

export interface LoginState {
    error?: LoginError;
}

const initialState = {};

const SET_ERROR = 'SET_ERROR';
export const setError = (error: LoginError) => ({
    type: SET_ERROR,
    error,
});

export const doLogin = (credentials: Credentials) => {
    return (dispatch: any) => {
        return restClient.post(endpoints.authenticateURL, credentials).then(
            (response: AxiosResponse<Authentication>) => {
                const { token } = response.data;
                document.cookie = `token=${token}`;
                restClient.setHeader('Authorization', `Bearer ${token}`);
                dispatch(setAuth(token));
            },
        ).catch((error) => {
            const message: string = error.response.data.message;
            let cause = 'server';
            if (message.includes('username')) {
                cause = 'email';
            }
            if (message.includes('password')) {
                cause = 'password';
            }
            dispatch(setError({
                cause,
                message,
            } as LoginError));
        });
    };
};

const login = (state: LoginState = initialState, action: LoginAction) => {
    switch (action.type) {
        case SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default login;
