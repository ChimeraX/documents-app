import React, { useState } from 'react';
import { Button, createStyles, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';

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


export interface RecoverProperties {
    onSubmit: (email: string) => void;
}

const Recover: React.FC<RecoverProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit } = properties;

    const [email, setEmail] = useState('');

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => onSubmit(email);

    return (
        <>
            <form className={classes.form}>
                <TextField
                    onChange={handleChangeEmail}
                    label={'Email'}
                    variant={'outlined'}
                    margin={'normal'}
                    fullWidth/>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    {'Recover'}
                </Button>
            </form>
        </>
    );

};

export default Recover;
