import { Action } from 'redux';
import User from '@chimerax/common-web/lib/model/User';
import * as endpoints from '../rest/endpoints';
import restClient from '../rest/restClient';
import { AxiosResponse } from 'axios';
import { getCookies } from '@chimerax/common-web/lib/util/cookies';

export interface LoginError {
    cause: 'username' | 'password' | 'server';
    message: string;
}

export interface UserAction extends Action {
    user?: User;
    auth?: string;
    error?: LoginError;
}

export interface UserState {
    user?: User;
    auth?: string;
    error?: LoginError;
}

const initial: UserState = {
    auth: getCookies().token,
};

const SET_USER = 'SET_USER';
export const setUser = (user: User) => ({
    type: SET_USER,
    user,
});

const SET_AUTH = 'SET_AUTH';
export const setAuth = (auth: string) => ({
    type: SET_AUTH,
    auth,
});

export const fetchUserInfo = () => {
    return (dispatch: any) => {
        return restClient.get(endpoints.userInfoURL)
            .then((response: AxiosResponse<User>) => {
            dispatch(setUser(response.data));
        });
    };
};

const user = (state: UserState = initial, action: UserAction) => {
    switch (action.type) {
        case SET_AUTH:
            return { ...state, auth: action.auth };
        case SET_USER:
            return { ...state, user: action.user };
        default:
            return state;
    }
};

export default user;
