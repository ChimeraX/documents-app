import React, { useState } from 'react';
import { Button, createStyles, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Profile from '../../model/Profile';
import ProfilePicker from './ProfilePicker';
import Document from '../../model/Document';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({
    form: {
        width: '100%',
        marginTop: '8px',
    },
    submit: {
        margin: '24px 0 16px',
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));


export interface ProfileFormProperties {
    onSubmit: (profile: Profile) => void;
}

const ProfileForm: React.FC<ProfileFormProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit } = properties;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState<Document | null>(null);

    const handleChangeFirstName = (event: any) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: any) => {
        setLastName(event.target.value);
    };

    const handleChangeProfilePicture = (pic: Document) => {
        setProfilePicture(pic);
    };

    const handleSubmit = () => {
        if (profilePicture !== null) {
            onSubmit({ firstName, lastName, profilePicture });
        }
    };

    return (
        <>
            <form className={classes.form}>
                <ProfilePicker onUpload={handleChangeProfilePicture}/>
                <TextField
                    onChange={handleChangeFirstName}
                    label={'First name'}
                    variant={'outlined'}
                    margin={'normal'}
                    required
                    fullWidth
                />
                <TextField
                    onChange={handleChangeLastName}
                    label={'Last name'}
                    variant={'outlined'}
                    margin={'normal'}
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
            </form>
        </>
    );

};

export default ProfileForm;
