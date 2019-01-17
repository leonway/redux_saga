
import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from 'store/configureStore.js';
// import Loading from '../components/Loading';
import a from 'styles/index.less';
import { zhCN } from './i18n/zh-CN';
// import BasicLayout from './LayoutContainer';

console.log(Loading)
const LoginPage = lazy(() => import('routes/login'));

const Loading = ()=>(<div>loading...</div>)
const Container = () => (
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <BrowserRouter>
                <Suspense fallback={<Loading /> }>
                    <Switch>
                        <Route path="/login" component={LoginPage} exact />
                        {/* <Redirect from="/" to="/" exact /> */}
                        {/* <Route path="/" component={BasicLayout} /> */}
                    </Switch>
                </Suspense>        
            </BrowserRouter>
        </LocaleProvider>
    </Provider>
);
export default Container;
