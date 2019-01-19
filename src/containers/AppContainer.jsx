
import React, {Suspense, lazy} from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { store, history } from 'store/configureStore.js';
import Loading from '../components/Loading';
import a from 'styles/index.less';
import { zhCN } from './i18n/zh-CN';
import BasicLayout from './LayoutContainer';

const LoginPage = lazy(() => import('routes/login'));

// const getNavData = (...routers)=>{
//     const { history, location } = routers[0];
//     const pathname = location?
//                         location.pathname:
//                         history?
//                         history.location.pathname:
//                         '/';
//     const params = pathname.split("/",3);
//     const nav1 = params[1];
//     const nav2 = params[2];
//     console.log(routers,pathname,params)       
//     return <BasicLayout {...Object.assign(routers,{nav1,nav2})} />        
// }
console.log(history)
const Container = () => (
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Suspense fallback={<Loading /> }>
                    <Switch>
                        <Route path="/login" component={LoginPage} exact />
                        {/* <Redirect from="/" to="/" exact /> */}
                        <Route path="/" component={BasicLayout} />
                    </Switch>     
                </Suspense>   
            </ConnectedRouter>
        </LocaleProvider>
    </Provider>
);
export default Container;
