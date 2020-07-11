import React, { useEffect, useState } from 'react';
import Registration from '../../model/Registration';
import UserForm from './UserForm';
import Credentials from '../../model/Credentials';
import Profile from '../../model/Profile';
import ProfileForm from './ProfileForm';
import { ProfileFormError, RegisterError, UserFormError } from '../../redux/register';
import { validCredentialsObject, validProfileObject } from './Validation';
import CodeForm from './CodeForm';

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
    const [code, setCode] = useState<string | undefined>(undefined);
    const [error, setError] = useState(properties.error);
    const [active, setActive] = useState<'user' | 'profile' | 'code'>('user');
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
                code,
            });
        }
    }, [credentials, profile, code, wentBack, onSubmit]);

    const resetError = () => setError(undefined);

    const handleCredentials = (data: Credentials) => {
        setCredentials(data);
        setActive('profile');
        resetError();
    };

    const handleProfile = (data: Profile) => {
        setProfile(data);
        setActive('code');
        resetError();
    };

    const handleCode = (data: string) => {
        setCode(data);
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
    } else if (active === 'profile') {
        return (
            <ProfileForm
                onSubmit={handleProfile}
                data={profile}
                goBack={goFromProfileToUser}
                error={error?.childError as ProfileFormError}/>
        );
    } else {
        return (
            <CodeForm onSubmit={handleCode}/>
        );
    }
};

export default Register;
