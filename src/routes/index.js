import { Route, Switch, Redirect } from 'react-router-dom';
import Authorized from 'components/AuthComponent';
import page404 from 'routes/errors/404';
import page403 from 'routes/errors/403';

const dashboard = asyncComponent(() => import(/* webpackChunkName: "dashboard" */ 'routes/dashboard'));


export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Authorized path="/home" component={dashboard} exact />
                <Route path="/404" component={page404} exact />
                <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
