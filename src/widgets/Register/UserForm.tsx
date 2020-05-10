import React, { useState } from 'react';
import { Button, createStyles, Divider, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PasswordField from '../PasswordField';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Credentials from '../../model/Credentials';
import { Link as RouterLink } from 'react-router-dom';
import FlexGrow from '@chimerax/common-web/lib/widgets/FlexGrow';

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


export interface UserFormProperties {
    onSubmit: (credentials: Credentials) => void;
}

const UserForm: React.FC<UserFormProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit } = properties;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (password === confirmPassword) {
            onSubmit({
                username: email, password,
            });
        }
    };

    return (
        <>
            <form className={classes.form}>
                <TextField
                    onChange={handleChangeEmail}
                    label={'Email'}
                    variant={'outlined'}
                    margin={'normal'}
                    required
                    fullWidth
                />
                <PasswordField
                    onChange={handleChangePassword}
                    label={'Password'}
                    variant={'outlined'}
                    margin={'normal'}
                    required
                    fullWidth
                />
                <PasswordField
                    onChange={handleChangeConfirmPassword}
                    label={'Confirm Password'}
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
                    Continue
                </Button>
            </form>
            <Divider flexItem/>
            <FlexGrow/>
            <Link component={RouterLink} to={'/login'} underline={'none'}>
                {'Already have an account?'}
            </Link>
        </>
    );

};

export default UserForm;
