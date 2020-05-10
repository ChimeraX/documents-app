import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';
import { Client } from '../../model/Client';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
    return createStyles({
        profilePicture: {
            height: '100px',
            width: '100px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20%',
        },
    });
});


export interface ClientLogoProperties {
    client?: Client;
}

const ClientLogo: React.FC<ClientLogoProperties> = (properties) => {

    const { client } = properties;

    const classes = useStyles();

    if (client) {
        return (
            <img
                src={client?.logo}
                alt={client?.name}
                unselectable={'on'}
                draggable={false}
                className={classes.profilePicture}
            />
        );
    } else {
        return null;
    }
};

export default ClientLogo;
