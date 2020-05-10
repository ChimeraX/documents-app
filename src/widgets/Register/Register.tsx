import React, { useState } from 'react';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Registration from '../../model/Registration';
import UserForm from './UserForm';
import Credentials from '../../model/Credentials';
import Profile from '../../model/Profile';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({}));


export interface RegisterProperties {
    onSubmit: (registration: Registration) => void;
    validateEmail: (email: string) => Promise<boolean>;
}

const Register: React.FC<RegisterProperties> = (properties) => {
    const { onSubmit, validateEmail } = properties;

    const classes = useStyles();

    const [credentials, setCredentials] = useState<Credentials | null>(null);

    const handleCredentials = (cred: Credentials) => {
        setCredentials(cred);
    };

    const handleProfile = (profile: Profile) => {
        if (credentials !== null) {
            onSubmit({
                ...credentials,
                ...profile,
            });
        }
    };

    if (credentials === null) {
        return (
            <UserForm onSubmit={handleCredentials}/>
        );
    } else {
        return (
            <ProfileForm onSubmit={handleProfile}/>
        );
    }

};

export default Register;
