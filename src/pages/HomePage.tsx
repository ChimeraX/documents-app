import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Title from '../components/Title';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';
import UserWidget from '../components/UserWidget';
import FlexGrow from '@chimerax/common-web/lib/widgets/FlexGrow';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
    return createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: theme.palette.primary.dark,
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            paddingTop: theme.spacing(8),
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundImage: 'url(\'./images/kitchen_background.jpg\')',
        },
        logout: {
            backgroundColor: 'pink'
        }
    });
});

const LandingPage: React.FC = (properties) => {
    const {children} = properties;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <Title/>
                    <FlexGrow/>
                    <UserWidget/>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
};

export default LandingPage;
