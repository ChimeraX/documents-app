import React from 'react';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({
    title: {
        fontFamily: 'Permanent Marker, cursive',
        color: theme.palette.primary.main,
        fontSize: '36px',
    },
}));


const Title = () => {
    const classes = useStyles();

    return (
        <div className={classes.title}>Chimera-X</div>
    );

};

export default Title;
