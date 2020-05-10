import { Client } from '../model/Client';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';
import { Action } from 'redux';

export interface ClientAction extends Action {
    client?: Client;
}

export interface ClientState {
    client?: Client;
}

const initialState = {};

const SET_CLIENT = 'SET_CLIENT';
export const setClient = (client: Client) => ({
    type: SET_CLIENT,
    client,
});

export const fetchClient = (clientId: string) => {
    return (dispatch: any) => {
        return restClient.get(`${endpoints.clientsURL}/${clientId}`).then(
            (response: AxiosResponse<Client>) => {
                dispatch(setClient(response.data));
            });
    };
};

const client = (state: ClientState = initialState, action: ClientAction) => {
    switch (action.type) {
        case SET_CLIENT:
            return { ...state, client: action.client };
        default:
            return state;
    }
};

export default client;
