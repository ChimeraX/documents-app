export default interface Document {
    name: string;
    type: string;
    data: string;
    size: number;
    folderId?: number;
}

export interface DocumentDetails {
    id: number;
    name: string;
    type: string;
    size: number;
    createdAt: number;
}
