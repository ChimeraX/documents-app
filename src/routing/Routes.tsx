import history from './history';
import { Router } from 'react-router-dom';
import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import { connect } from 'react-redux';
import { isAuthenticated } from '../redux/user';
import PublicRoutes from './PublicRoutes';

interface RoutesProperties {
    isAuthenticated: boolean;
    fetchAuthenticated: () => void;
}

const Routes: React.FC<RoutesProperties> = (properties) => {
    const { fetchAuthenticated, isAuthenticated } = properties;
    if (!isAuthenticated) {
        fetchAuthenticated();
    }
    return (
        <Router history={history}>
            {isAuthenticated ? <PrivateRoutes/> : <PublicRoutes/>}
        </Router>
    );
};

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        isAuthenticated: state.user.authenticated!!,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAuthenticated: () => dispatch(isAuthenticated()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
