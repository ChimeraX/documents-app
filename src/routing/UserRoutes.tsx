import { Redirect, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import React from 'react';
import Main from '../widgets/Main';


const UserRoutes = () => {
    return (
        <Main>
            <Route path="/" exact component={HomePage}/>
            <Redirect path="/**" to="/"/>
        </Main>
    );
};

export default UserRoutes;

