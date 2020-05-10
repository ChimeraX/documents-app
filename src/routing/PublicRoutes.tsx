import { Redirect, Route, Switch } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Recover from '../components/Recover';

const PublicRoutes = () => {
    return (
        <LandingPage>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/recover" exact component={Recover}/>
                <Redirect path="/**" to={'/login'}/>
            </Switch>
        </LandingPage>
    );
};

export default PublicRoutes;
