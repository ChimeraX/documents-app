import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';
import { createStyles, Grid, Paper } from '@material-ui/core';
import Title from '../widgets/Title';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => createStyles({
    container: {
        height: '100vh',
    },
    imageContainer: {
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        backgroundImage: theme.backgroundImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'inherit',
        backgroundPosition: 'center',
        animation: '$image infinite 10s ease',
        '&::before': {
            display: 'block',
        },
    },
    paper: {
        padding: '128px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 0,
        backgroundColor: theme.palette.primary.dark,
    },
    '@keyframes image': {
        '0%': {},
        '50%': { transform: 'scale(1.1)' },
        '100%': {},
    },
}));


const LandingPage: React.FC = (properties) => {
    const { children } = properties;

    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={false} sm={4} md={7} className={classes.imageContainer}>
                <div className={classes.image}/>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.paper}>
                <Title/>
                {children}
            </Grid>
        </Grid>
    );

};

export default LandingPage;
