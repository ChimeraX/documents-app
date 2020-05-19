import Credentials from '../../model/Credentials';
import Profile from '../../model/Profile';
import Document from '../../model/Document';

export function validCredentialsObject(credentials: Credentials): boolean {
    const { email, password, confirmPassword } = credentials;
    return validCredentials(email, password, confirmPassword);
}

export function validCredentials(email: string = '',
                                 password: string = '',
                                 confirmPassword: string = ''): boolean {
    return email !== ''
        && password !== ''
        && confirmPassword !== ''
        && password === confirmPassword;
}

export function validProfileObject(profile: Profile): boolean {
    const { firstName, lastName, profilePicture } = profile;
    return validProfile(firstName, lastName, profilePicture);
}

export function validProfile(firstName: string = '',
                             lastName: string = '',
                             profilePicture?: Document): boolean {
    return firstName !== ''
        && lastName !== ''
        && profilePicture !== undefined;
}
