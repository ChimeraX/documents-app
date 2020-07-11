import Credentials from '../model/Credentials';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import Error from './Error';
import Registration from '../model/Registration';

type UserFormErrorCause = 'email' | 'password' | 'confirmPassword';
type ProfileFormErrorCause = 'profilePicture' | 'firstName' | 'lastName';
type CodeFormErrorCause = 'code';
type RegisterErrorCause = UserFormErrorCause
    | ProfileFormErrorCause
    | CodeFormErrorCause
    | 'user'
    | 'profile';

export interface UserFormError extends Error<UserFormErrorCause> {
}

export interface ProfileFormError extends Error<ProfileFormErrorCause> {
}

export interface CodeFormError extends Error<CodeFormErrorCause> {
}

export interface RegisterError extends Error<RegisterErrorCause> {
    childError?: UserFormError | ProfileFormError | CodeFormError;
}

export interface RegisterAction extends Action {
    error?: RegisterError;
}

export interface RegisterState {
    error?: RegisterError;
    registration?: Registration;
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
        ).catch(() => {
            setError({ cause: 'profile', message: 'Something unexpected happened' });
        });
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
