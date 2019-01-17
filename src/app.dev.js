import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppContainer from './containers/AppContainer';
import { AppContainer as RootContainer } from 'react-hot-loader';

const render = (Component)=>{
    ReactDOM.render(
        <RootContainer>
         <div  className="container-wrapper">
            <AppContainer />
         </div>
        </RootContainer>
        , document.getElementById('root')
    );
}

render(AppContainer)
module.hot.accept('./containers/AppContainer', () => render(AppContainer));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
