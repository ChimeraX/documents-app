import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import Authorization from '../model/Authorization';
import Code from '../model/Code';

export interface AuthorizeAction extends Action {
    redirect?: string;
    code?: string;
}

export interface AuthorizeState {
    redirect?: string;
    code?: string;
}

const initialState = {};

const SET_REDIRECT = 'SET_REDIRECT';
export const setRedirect = (redirect: string) => ({
    type: SET_REDIRECT,
    redirect,
});

const SET_CODE = 'SET_CODE';
export const setCode = (code: string) => ({
    type: SET_CODE,
    code,
});

const DO_REDIRECT = 'DO_REDIRECT';
export const doRedirect = () => ({
    type: DO_REDIRECT,
});

export const doAuthorize = (authorization: Authorization) => {
    return (dispatch: any) => {
        return restClient.post(endpoints.authorizeURL, authorization).then(
            (response: AxiosResponse<Code>) => {
                dispatch(setCode(response.data.code));
                return response.data.code;
            });
    };
};

const authorize = (state: AuthorizeState = initialState, action: AuthorizeAction) => {
    switch (action.type) {
        case SET_REDIRECT:
            return { ...state, redirect: action.redirect };
        case SET_CODE:
            return { ...state, code: action.code };
        case DO_REDIRECT:
            const { redirect, code } = state;
            window.location.href = `${redirect!!}?code=${code!!}`;
            return state;
        default:
            return state;
    }
};

export default authorize;
