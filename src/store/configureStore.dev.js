import { createStore, applyMiddleware, compose, combineReducers  } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import rootReducers from '../reducers';
import rootSagas from '../sagas';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(rootSagas);
const loggerMiddleware = createLogger({
    collapsed: true,
    timestamp: false,
    level: 'info'
});
console.log(history,"rootReducers",rootReducers,"connectRouter",connectRouter(history))
const configureStore = (initialState => {
    const store = createStore(
        combineReducers({...rootReducers,router:connectRouter(history)}),
        // compose(
        //     connectRouter(history),
        //     combineReducers
        // )({...rootReducers}),
        initialState,
        compose(
            applyMiddleware(
            routerMiddleware(history),
                sagaMiddleware,
                loggerMiddleware
                ),
            window.__REDUX_DEVTOOLS_EXTENSION__  ? window.__REDUX_DEVTOOLS_EXTENSION__ () : fn => fn
        )
    );
    sagaMiddleware.run(rootSagas);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }
    return store;
})();
export { configureStore as store, history };
