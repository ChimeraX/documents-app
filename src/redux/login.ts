import Credentials from '../model/Credentials';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { setAuthenticated } from './user';
import { Action } from 'redux';
import Error from './Error';
import { AxiosResponse } from 'axios';

const NodeRSA = require('node-rsa');
let base_key = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyYr0ET8/w9xqfQ+k9sqtL/A55\n" +
    "ra6W0p5lj5Iq8hqA/fZPZw0FkQUNaM72NF/gt+kCRqXCSlMkTttaZCWScYvhDsSm\n" +
    "yXsvFbY3LNDmt4Sa/CRUl9xxQ4sV/t3FaM0O9z0yJeIIkonsdaPqenDybhFwiASg\n" +
    "2eHme46IjO66skdThwIDAQAB\n" +
    "-----END PUBLIC KEY-----";

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

function encryptPassword(password: string, publicKey: string): string {
    const _publicKey = new NodeRSA();
    _publicKey.importKey(base_key, "pkcs8-public-pem");
    return _publicKey.encrypt(password, 'base64');
}


export const doLogin = (credentials: Credentials) => {
    return (dispatch: any) => {
        return restClient.get(endpoints.publicKeyURL).then(
            (response: AxiosResponse<string>) => {
                credentials.password = encryptPassword(credentials.password, response.data);
                dispatch(doRealLogin(credentials));
            },
        );
    };
};

export const doRealLogin = (credentials: Credentials) => {
    return (dispatch: any) => {
        return restClient.post(endpoints.authenticateURL, credentials).then(
            (response: AxiosResponse<string>) => {
                document.cookie = `token=${response.data}`;
                restClient.setHeader('Authorization', `Bearer ${response.data}`);
                dispatch(setAuthenticated(true));
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
