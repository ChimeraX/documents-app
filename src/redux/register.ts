import Credentials from '../model/Credentials';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import Error from './Error';

type UserFormErrorCause = 'email' | 'password' | 'confirmPassword';
type ProfileFormErrorCause = 'profilePicture' | 'firstName' | 'lastName';
type RegisterErrorCause = UserFormErrorCause | ProfileFormErrorCause | 'user' | 'profile';

export interface UserFormError extends Error<UserFormErrorCause> {
}

export interface ProfileFormError extends Error<ProfileFormErrorCause> {
}

export interface RegisterError extends Error<RegisterErrorCause> {
    childError?: UserFormError | ProfileFormError;
}

export interface RegisterAction extends Action {
    error?: RegisterError;
}

export interface RegisterState {
    error?: RegisterError;
}

const initialState = {};

const SET_ERROR = 'SET_ERROR';
export const setError = (error: RegisterError) => ({
    type: SET_ERROR,
    error,
});

export const doRegister = (credentials: Credentials) => {
    return (dispatch: any) => {
        return restClient.post(endpoints.registerURL, credentials).then(
            (response: AxiosResponse<{}>) => {
            },
        );
    };
};

const register = (state: RegisterState = initialState, action: RegisterAction) => {
    switch (action.type) {
        case SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default register;
