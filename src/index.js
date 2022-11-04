import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// This makes a middleware for us to use.
const sagaMiddleware = createSagaMiddleware();

// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {

}

const gifList = (state = [], action) => {
    return state;
}


const storeInstance = createStore(
    combineReducers({
        gifList,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

// This allows the watcherSaga to start watching for actions
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
