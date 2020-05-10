import { Route, Switch } from 'react-router-dom';
import AuthorizePage from '../pages/AuthorizePage';
import React from 'react';
import UserRoutes from './UserRoutes';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import { fetchUserInfo } from '../redux/user';
import { connect } from 'react-redux';

interface PrivateRoutesProperties {
    fetchUser: () => void;
}

const PrivateRoutes: React.FC<PrivateRoutesProperties> = (properties) => {
    const { fetchUser } = properties;
    fetchUser();
    return (
        <Switch>
            <Route path={'/oauth/authorization'} component={AuthorizePage}/>
            <Route path="/" component={UserRoutes}/>
        </Switch>
    );
};

const mapStateToProps = (state: ChimeraXAppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUser: () => dispatch(fetchUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);

