import React, { useEffect, useState } from 'react';
import Registration from '../../model/Registration';
import UserForm from './UserForm';
import Credentials from '../../model/Credentials';
import Profile from '../../model/Profile';
import ProfileForm from './ProfileForm';
import { ProfileFormError, RegisterError, UserFormError } from '../../redux/register';
import { validCredentialsObject, validProfileObject } from './Validation';

export interface RegisterProperties {
    onSubmit: (registration: Registration) => void;
    validateEmail: (email: string) => Promise<boolean>;
    error?: RegisterError;
}

const defaultProfile = {
    firstName: '',
    lastName: '',
    profilePicture: undefined,
};

const Register: React.FC<RegisterProperties> = (properties) => {
    const { onSubmit } = properties;

    const [credentials, setCredentials] = useState<Credentials | undefined>(undefined);
    const [profile, setProfile] = useState<Profile | undefined>(undefined);
    const [error, setError] = useState(properties.error);
    const [active, setActive] = useState<'user' | 'profile'>('user');
    const [wentBack, setWentBack] = useState<boolean>(false);

    useEffect(() => {
        if (credentials === undefined || !validCredentialsObject(credentials)) {
            setError({
                cause: 'user', message: 'Incomplete fields',
            });
        } else if (profile === undefined || !validProfileObject(profile)) {
            if (wentBack) {
                // setActive('profile');
            } else {
                setError({
                    cause: 'profile', message: 'Incomplete fields',
                });
            }
        } else {
            onSubmit({
                ...credentials,
                ...profile,
            });
        }
    }, [credentials, profile, wentBack, onSubmit]);

    const resetError = () => setError(undefined);

    const handleCredentials = (data: Credentials) => {
        setCredentials(data);
        setActive('profile');
        resetError();
    };

    const handleProfile = (data: Profile) => {
        setProfile(data);
        resetError();
    };

    const goFromProfileToUser = (savedState: Partial<Profile>) => {
        setProfile({ ...defaultProfile, ...profile, ...savedState });
        setActive('user');
        setWentBack(true);
    };

    if (credentials === undefined || error?.cause === 'user' || active === 'user') {
        return (
            <UserForm
                onSubmit={handleCredentials}
                data={credentials}
                error={error?.childError as UserFormError}/>
        );
    } else {
        return (
            <ProfileForm
                onSubmit={handleProfile}
                data={profile}
                goBack={goFromProfileToUser}
                error={error?.childError as ProfileFormError}/>
        );
    }

};

export default Register;
