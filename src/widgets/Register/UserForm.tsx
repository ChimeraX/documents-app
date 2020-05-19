import React, { useState } from 'react';
import { Button, createStyles, Divider, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PasswordField from '../PasswordField';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Credentials from '../../model/Credentials';
import { Link as RouterLink } from 'react-router-dom';
import FlexGrow from '@chimerax/common-web/lib/widgets/FlexGrow';
import { UserFormError } from '../../redux/register';
import { validCredentials } from './Validation';

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
    link: {
        padding: '0 0 128px'
    }
}));


export interface UserFormProperties {
    onSubmit: (credentials: Credentials) => void;
    data?: Credentials;
    error?: UserFormError;
}

const defaultCredentials: Credentials = {
    email: '',
    password: '',
    confirmPassword: '',
};

const UserForm: React.FC<UserFormProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit, data = defaultCredentials } = properties;

    const [email, setEmail] = useState(data.email);
    const [password, setPassword] = useState(data.password);
    const [confirmPassword, setConfirmPassword] = useState(data.confirmPassword);
    const [error, setError] = useState(properties.error);

    const resetError = () => setError(undefined);

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
        resetError();
    };

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
        resetError();
    };

    const handleChangeConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value);
        resetError();
    };

    const handleSubmit = () => {
        if (email === '') {
            setError({
                cause: 'email',
                message: 'Email is required',
            });
        } else if (password === '') {
            setError({
                cause: 'password',
                message: 'Password is required',
            });
        } else if (confirmPassword === '') {
            setError({
                cause: 'confirmPassword',
                message: 'Confirm your password',
            });
        } else if (password !== confirmPassword) {
            setError({
                cause: 'confirmPassword',
                message: 'The password do not match',
            });
        } else {
            onSubmit({
                email, password, confirmPassword,
            });
        }
    };

    const isSubmitVisible = error === undefined
        && validCredentials(email, password, confirmPassword);

    const Submit = () => (
        <Button
            onClick={handleSubmit}
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}>
            Continue
        </Button>
    );

    return (
        <>
            <form className={classes.form}>
                <TextField
                    onChange={handleChangeEmail}
                    label={'Email'}
                    value={email}
                    variant={'outlined'}
                    margin={'normal'}
                    error={error?.cause === 'email'}
                    helperText={error?.cause === 'email' && error.message}
                    required
                    fullWidth
                />
                <PasswordField
                    onChange={handleChangePassword}
                    label={'Password'}
                    value={password}
                    variant={'outlined'}
                    margin={'normal'}
                    error={error?.cause === 'password'}
                    helperText={error?.cause === 'password' && error.message}
                    required
                    fullWidth
                />
                <PasswordField
                    onChange={handleChangeConfirmPassword}
                    label={'Confirm Password'}
                    value={confirmPassword}
                    variant={'outlined'}
                    margin={'normal'}
                    error={error?.cause === 'confirmPassword'}
                    helperText={error?.cause === 'confirmPassword' && error.message}
                    required
                    fullWidth
                />
                {isSubmitVisible ? <Submit/> : null}
            </form>
            <Divider flexItem/>
            <FlexGrow/>
            <Link className={classes.link} component={RouterLink} to={'/login'} underline={'none'}>
                {'Already have an account?'}
            </Link>
        </>
    );

};

export default UserForm;
