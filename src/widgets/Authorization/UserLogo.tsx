import React from 'react';
import User from '@chimerax/common-web/lib/model/User';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../../theming/ChimeraXAppTheme';

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


export interface UserLogoProperties {
    user?: User;
}

const UserLogo: React.FC<UserLogoProperties> = (properties) => {

    const { user } = properties;

    const classes = useStyles();

    if (user) {
        return (
            <img
                src={user.profilePicture}
                alt={user.firstName}
                unselectable={'on'}
                draggable={false}
                className={classes.profilePicture}
            />
        );
    } else {
        return null;
    }
};

export default UserLogo;
