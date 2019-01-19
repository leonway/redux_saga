import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Authorized from 'components/AuthComponent';
import Loading from 'components/Loading';
import page404 from 'routes/errors/404';
import page403 from 'routes/errors/403';

const dashboard = asyncComponent(() => import(/* webpackChunkName: "dashboard" */ 'routes/dashboard'));


export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Suspense fallback={Loading}>

                </Suspense>
                <Authorized path="/" component={<div>首页</div>} exact />
                <Route path="/404" component={page404} exact />
                <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
