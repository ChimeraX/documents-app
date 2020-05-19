import Document from './Document';

export default interface Profile {
    firstName: string;
    lastName: string;
    profilePicture?: Document;
}

