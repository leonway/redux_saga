import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const loginPage = props => (
    <Redirect
        to={{
            pathname: '/login',
            state: {
                from: props.location,
                message: 'You need to sign in'
            }
        }}
    />
);

const prmissionDeniedePage = props => (
    <Redirect
        to={{
            pathname: '/403',
            state: {
                from: props.location,
                message: '无权限进入'
            }
        }}
    />
);
const actuatorUserPage = props => (
    <Redirect
        to={{
            pathname: '/actuator',
            state: {
                from: props.location,
                message: '运维'
            }
        }}
    />
);
const Authorized = ({ component: ComposedComponent, ...rest }) => {
    @connect(({ auth, menus }) => ({
        userAuth: auth.auth,
        isLoggedIn: auth.isLoggedIn,
        menus: menus.list,
        menuIsLoading: menus.isLoading
    }))
    class AuthComponent extends React.PureComponent {
        componentRender = props => {
            const { isLoggedIn, menus, userAuth, menuIsLoading } = this.props;
            const pathname = rest.location.pathname;
            const formatMenuUrl = menus.map(m => m.url);
            formatMenuUrl.push(...['/403', '/404', '/apk/create']);
            if (isLoggedIn) {
                if (userAuth === 'ROLE_ACTUATOR') {
                    return actuatorUserPage(props);
                }
                if (menuIsLoading) return null;
                if (formatMenuUrl.indexOf(pathname) === -1) {
                    console.log(pathname);
                    return prmissionDeniedePage(props);
                }
                return <ComposedComponent {...props} />;
            }
            return loginPage(props);
        };

        render() {
            return <Route {...rest} render={this.componentRender} />;
        }
    }
    return <AuthComponent />;
};
Authorized.propTypes = {
    component: PropTypes.func
};
export default Authorized;
