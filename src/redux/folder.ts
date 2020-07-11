import Folder, { CreateFolder, SubFolder } from '../model/Folder';
import Document, { DocumentDetails } from '../model/Document';
import { Action } from 'redux';
import restClient from '../rest/restClient';
import * as endpoints from '../rest/endpoints';
import { AxiosResponse } from 'axios';

export type CreateMode = 'folder' | 'document' | undefined;

export interface FolderState {
    path: SubFolder[];
    current?: Folder;
    createMode: CreateMode;
    loading: boolean;
    initialized: boolean;
}

export interface FolderAction extends Action {
    folder?: Folder;
    subFolder?: SubFolder;
    createMode: CreateMode;
    loading?: boolean;
    initialized?: boolean;
}

const GO_TO_FOLDER = 'GO_TO_FOLDER';
export const goToFolder = (subFolder: SubFolder) => ({
    type: GO_TO_FOLDER,
    subFolder,
});

const BACK_TO_FOLDER = 'BACK_TO_FOLDER';
export const backToFolder = (subFolder: SubFolder) => ({
    type: BACK_TO_FOLDER,
    subFolder,
});

const BACK_TO_HOME = 'BACK_TO_HOME';
export const backToHome = () => ({
    type: BACK_TO_HOME,
});

const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER';
export const setCurrent = (folder: Folder) => ({
    type: SET_CURRENT_FOLDER,
    folder,
});

const SET_LOADING = 'SET_LOADING';
export const setLoading = (loading: boolean) => ({
    type: SET_LOADING,
    loading,
});

const SET_INITIALIZED = 'SET_INITIALIZED';
export const setInitialized = (initialized: boolean) => ({
    type: SET_INITIALIZED,
    initialized,
});

const TOGGLE_CREATE_MODE = 'TOGGLE_CREATE_MODE';
export const toggleCreateMode = (createMode: CreateMode) => ({
    type: TOGGLE_CREATE_MODE,
    createMode,
});

export const fetchFolder = (id?: number) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));
        const path = id ? id : 'root';
        return restClient.get(`${endpoints.foldersURL}/${path}`).then(
            (response: AxiosResponse<Folder>) => {
                dispatch(setLoading(false));
                dispatch(setCurrent(response.data));
            });
    };
};

export const saveFolder = (folder: CreateFolder) => {
    return (dispatch: any) => {
        return restClient.post(`${endpoints.foldersURL}`, folder).then(
            () => {
                dispatch(fetchFolder(folder.parentId));
            });
    };
};

export const downloadDocument = (doc: DocumentDetails) => {
    return (dispatch: any) => {
        return restClient.get(`${endpoints.documentsURL}/${doc.id}/download`).then(
            () => {});
    };
};

export const deleteDocument = (doc: DocumentDetails) => {
    return (dispatch: any) => {
        return restClient.delete(`${endpoints.documentsURL}/${doc.id}`).then(
            () => {});
    };
};

export const saveDocument = (document: Document) => {
    return (dispatch: any) => {
        return restClient.post(`${endpoints.documentsURL}`, document).then(
            () => {
                dispatch(fetchFolder(document.folderId));
            });
    };
};

const initialState: FolderState = {
    path: [],
    current: undefined,
    createMode: undefined,
    loading: false,
    initialized: false,
};

const folder = (state: FolderState = initialState, action: FolderAction) => {
    const { path } = state;
    switch (action.type) {
        case GO_TO_FOLDER:
            return {
                ...state, path: [...path, action.subFolder!!],
            };
        case BACK_TO_FOLDER:
            const indexOf = path.indexOf(action.subFolder!!);
            return {
                ...state, path: path.slice(0, indexOf + 1),
            };
        case BACK_TO_HOME:
            return {
                ...state, path: [],
            };
        case SET_CURRENT_FOLDER:
            return {
                ...state,
                current: action.folder,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case TOGGLE_CREATE_MODE:
            return {
                ...state,
                createMode: action.createMode,
            };
        default:
            return state;

    }
};

export default folder;
