import React from 'react';
import Page from '@chimerax/common-web/lib/widgets/Page';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    CssBaseline,
    Paper,
} from '@material-ui/core';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';
import AuthorizationForm from '../components/Authorization';
import UserLogo from '../components/Authorization/UserLogo';
import ClientLogo from '../components/Authorization/ClientLogo';
import { useQuery } from '@chimerax/common-web/lib/util/hooks';
import { Redirect } from 'react-router-dom';
import Scope from '../model/Scope';
import mapToScopes from '../rest/scopeMapping';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import { connect } from 'react-redux';
import { fetchClient } from '../redux/client';
import { setRedirect } from '../redux/authorize';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.dark,
            minHeight: '100vh',
            minWidth: '100vh',
        },
        paper: {
            backgroundColor: theme.palette.primary.main,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            alignItems: 'center',
            textAlign: 'center',
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            paddingTop: theme.spacing(8),
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
        },
        logos: {
            display: 'flex',
            padding: '10px 10px 20px',
        },
        spacer: {
            flex: 'auto',
        },
    });
});

function mapURLToScopes(params: URLSearchParams): Scope[] {
    return mapToScopes(params.get('scope')!!.split(','));
}

function isValid(params: URLSearchParams) {
    return params.has('client')
        && params.has('scope')
        && params.has('redirect');
}

interface AuthorizePageProperties {
    fetchClient: (clientId: string) => void;
    setRedirect: (redirect: string) => void;
}

const AuthorizePage: React.FC<AuthorizePageProperties> = (properties) => {
    const { fetchClient, setRedirect } = properties;

    const classes = useStyles();

    const search = useQuery();

    if (!isValid(search)) {
        return (<Redirect to="/"/>);
    }

    const clientId = search.get('client')!!;

    fetchClient(clientId);

    setRedirect(search.get('redirect')!!);

    const scopes = mapURLToScopes(search);

    return (
        <Page>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <CssBaseline/>
                    <div className={classes.content}>
                        <div className={classes.logos}>
                            <ClientLogo/>
                            <div className={classes.spacer}/>
                            <UserLogo/>
                        </div>
                        <AuthorizationForm scopes={scopes}/>
                    </div>
                </Paper>
            </div>
        </Page>
    );
};

const mapStateToProps = (state: ChimeraXAppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    fetchClient: (clientId: string) => dispatch(fetchClient(clientId)),
    setRedirect: (redirect: string) => dispatch(setRedirect(redirect)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizePage);
