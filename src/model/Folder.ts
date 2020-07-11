import { DocumentDetails } from './Document';

export default interface Folder {
    id: number;
    name: string;
    subFolders: SubFolder[];
    documents: DocumentDetails[];
    createdAt: number;
}

export interface SubFolder {
    id: number;
    name: string;
    documents: number;
    subFolders: number;
    createdAt: number;
}

export interface CreateFolder {
    name: string;
    parentId: number;
}
