import React, { useState } from 'react';
import { Button, createStyles, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Profile from '../../model/Profile';
import ProfilePicker from './ProfilePicker';
import Document from '../../model/Document';
import { ProfileFormError } from '../../redux/register';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({
    form: {
        width: '100%',
        marginTop: '8px',
        display: 'contents',
    },
    submit: {
        margin: '24px 0 16px',
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    profileError: {
        color: theme.palette.error.main,
    },
}));


export interface ProfileFormProperties {
    onSubmit: (profile: Profile) => void;
    goBack?: (savedState: Partial<Profile>) => void;
    data?: Profile;
    error?: ProfileFormError;
}

const defaultProfile = {
    firstName: '',
    lastName: '',
    profilePicture: undefined,
};

const ProfileForm: React.FC<ProfileFormProperties> = (properties) => {
    const classes = useStyles();

    const { goBack, onSubmit, data = defaultProfile } = properties;

    const [firstName, setFirstName] = useState(data.firstName);
    const [lastName, setLastName] = useState(data.lastName);
    const [profilePicture, setProfilePicture] = useState<Document | undefined>(data.profilePicture);
    const [error, setError] = useState(properties.error);

    const resetError = () => setError(undefined);

    const handleChangeFirstName = (event: any) => {
        setFirstName(event.target.value);
        resetError();
    };

    const handleChangeLastName = (event: any) => {
        setLastName(event.target.value);
        resetError();
    };

    const handleChangeProfilePicture = (document: Document) => {
        setProfilePicture(document);
        resetError();
    };

    const handleGoBack = () => {
        goBack && goBack({
            firstName, lastName, profilePicture
        });
    };

    const handleSubmit = () => {
        if (firstName === '') {
            setError({
                cause: 'firstName',
                message: 'First name is required',
            });
        } else if (lastName === '') {
            setError({
                cause: 'lastName',
                message: 'Last Name is required',
            });
        } else if (profilePicture === undefined) {
            setError({
                cause: 'profilePicture',
                message: 'A profile picture is required',
            });
        } else {
            onSubmit({ firstName, lastName, profilePicture });
        }
    };

    return (
        <>
            <form className={classes.form}>
                <ProfilePicker
                    onUpload={handleChangeProfilePicture}
                    data={profilePicture}
                />
                <TextField
                    onChange={handleChangeFirstName}
                    label={'First name'}
                    variant={'outlined'}
                    value={firstName}
                    margin={'normal'}
                    error={error?.cause === 'firstName'}
                    helperText={error?.cause === 'firstName' && error.message}
                    required
                    fullWidth
                />
                <TextField
                    onChange={handleChangeLastName}
                    label={'Last name'}
                    variant={'outlined'}
                    value={lastName}
                    margin={'normal'}
                    error={error?.cause === 'lastName'}
                    helperText={error?.cause === 'lastName' && error.message}
                    required
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    Register
                </Button>
                <Button
                    onClick={handleGoBack}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    Go back
                </Button>
                <div className={classes.profileError}>
                    {error?.cause === 'profilePicture' && error.message}
                </div>
            </form>
        </>
    );

};

export default ProfileForm;
