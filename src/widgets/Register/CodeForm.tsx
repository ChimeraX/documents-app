import React, { useState } from 'react';
import { Button, createStyles, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import { CodeFormError } from '../../redux/register';

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
    onSubmit: (code: string) => void;
    error?: CodeFormError;
}

const CodeForm: React.FC<ProfileFormProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit} = properties;

    const [code, setCode] = useState('');
    const [error, setError] = useState(properties.error);

    const resetError = () => setError(undefined);

    const handleChangeCode = (event: any) => {
        setCode(event.target.value);
        resetError();
    };

    const handleSubmit = () => {
        if (code === '') {
            setError({
                cause: 'code',
                message: 'Check your email for a code',
            });
        } else {
            onSubmit(code);
        }
    };

    return (
        <>
            <form className={classes.form}>
                <TextField
                    onChange={handleChangeCode}
                    label={'Code'}
                    variant={'outlined'}
                    value={code}
                    margin={'normal'}
                    error={error?.cause === 'code'}
                    helperText={error?.cause === 'code' && error.message}
                    required
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    Finish registration
                </Button>
                <div className={classes.profileError}>
                    {error?.cause === 'code' && error.message}
                </div>
            </form>
        </>
    );

};

export default CodeForm;
