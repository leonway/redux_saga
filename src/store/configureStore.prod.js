import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducers';
import rootSagas from '../sagas';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(rootSagas);
const configureStore = (initialState => {
    const store = createStore( combineReducers({...rootReducers,router:connectRouter(history)}), initialState, compose(applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
        )));
    sagaMiddleware.run(rootSagas);
    return store;
})();

export { configureStore as store, history };
  