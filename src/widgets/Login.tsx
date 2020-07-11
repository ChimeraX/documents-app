import React, { useEffect, useState } from 'react';
import { Button, createStyles, Divider, Grid, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import PasswordField from './PasswordField';
import FlexGrow from '@chimerax/common-web/lib/widgets/FlexGrow';
import { LoginError } from '../redux/login';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';
import Credentials from '../model/Credentials';

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
        padding: '0 0 128px',
        backgroundColor: 'transparent',
    },
}));


export interface LoginProperties {
    onSubmit: (credentials: Credentials) => void;
    error?: LoginError;
}

function valid(str: string) {
    let result = true;
    if (str.includes('..')) {
        result = false;
    } else if (/!#\$%\^&\*-\+=/.test(str)) {
        result = false;
    }
    return result;
}

const Login: React.FC<LoginProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit } = properties;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(properties.error);

    useEffect(() => {
        setError(properties.error);
    }, [properties.error]);

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
        if (valid(email)) {
            setError(undefined);
        }
        else {
            setError({cause: 'email', message: 'Invalid characters'})
        }
    };

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
        setError(undefined);
    };

    const handleSubmit = () => {
        onSubmit({ email: email.trim(), password });
    };

    return (
        <>
            <form className={classes.form}>
                <TextField
                    onChange={handleChangeEmail}
                    label={'Email'}
                    variant={'outlined'}
                    margin={'normal'}
                    error={error?.cause === 'email'}
                    helperText={error?.cause === 'email' ? error.message : undefined}
                    required
                    fullWidth/>
                <PasswordField
                    onChange={handleChangePassword}
                    label={'Password'}
                    variant={'outlined'}
                    margin={'normal'}
                    error={error?.cause === 'password'}
                    helperText={error?.cause === 'password' ? error.message : undefined}
                    required
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    {'Sign in'}
                </Button>
            </form>
            <Divider flexItem/>
            <FlexGrow/>
            <Grid container className={classes.link} spacing={5}>
                <Grid item xs>
                    <Link component={RouterLink} to={'/recover'} underline={'none'}>
                        {'Forgot password?'}
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={'/register'} underline={'none'}>
                        {'Register'}
                    </Link>
                </Grid>
            </Grid>
        </>
    );

};

export default Login;
