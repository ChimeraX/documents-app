import React from 'react';
import { Button, createStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import Authorization from '../../model/Authorization';
import { Client } from '../../model/Client';
import Scope from '../../model/Scope';

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
    clientName: {
        fontWeight: 'bold',
    }
}));


export interface AuthorizeFormProperties {
    client?: Client;
    scopes: Scope[];
    onSubmit: (authorization: Authorization) => void;
}

const AuthorizationForm: React.FC<AuthorizeFormProperties> = (properties) => {
    const classes = useStyles();

    const { onSubmit, client, scopes } = properties;

    if (client === undefined) {
        return null;
    }

    const authorization: Authorization = {
        clientId: client.clientId,
        scope: scopes.map((scope) => scope.authority),
    };

    const handleSubmit = () => {
        onSubmit(authorization);
    };

    return (
        <>
            <div>
                <div className={classes.clientName}>{client?.name}</div>
                is requiring the following permissions:
            </div>
            <List>
                {
                    scopes.map((scope) => (
                        <ListItem key={scope.authority}>
                            <ListItemText
                                primary={scope.name}
                                secondary={scope.description}
                            />
                        </ListItem>
                    ))
                }
            </List>
            <form className={classes.form}>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}>
                    {'Ok'}
                </Button>
            </form>

        </>
    );

};

export default AuthorizationForm;
