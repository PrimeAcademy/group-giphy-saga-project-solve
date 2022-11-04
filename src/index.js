import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects'; 
import axios from 'axios';

// This makes a middleware for us to use.
const sagaMiddleware = createSagaMiddleware();

function* searchForGifs(action) {
    try {
        const response = yield axios.get(`/api/search`, {
            params: {
                query: action.payload
            }
        });
        console.log('search response', response.data);

        // aka "dispatch"
        yield put({
            type: 'SET_GIF_LIST',
            payload: response.data
        });
    }
    catch (err) {
        console.error('search failed', err);
    }
}

function* createFavorite(action) {
    try {
        yield axios.post('/api/favorite', action.payload);
    }
    catch (err) {
        console.error('createFavorite error', err);
    }
}

// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {
    yield takeEvery('SEARCH_FOR_GIFS', searchForGifs)
    yield takeEvery('CREATE_FAVORITE', createFavorite);
}

const gifList = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIF_LIST':
            return action.payload;
    }

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
