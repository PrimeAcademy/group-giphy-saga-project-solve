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

function* fetchFavorites() {
    try {
        const response = yield axios.get('/api/favorite');
        
        yield put({
            type: 'SET_GIF_LIST',
            payload: response.data
        });
    }
    catch (err) {
        console.error('fetchFavorites err', err);
    }
}

function* fetchCategories() {
    try {
        const response = yield axios.get('/api/category');

        yield put({
            type: 'SET_CATEGORY_LIST',
            payload: response.data
        });
    }
    catch (err) {
        console.error('fetchFavorites err', err);
    }
}

function* setCategory(action) {
    try {
        yield axios.put(`/api/favorite/${action.payload.favoriteId}`, {
            categoryId: action.payload.categoryId
        });
    }
    catch (err) {
        console.error('setCategory err', err);
    }
}

// watcher sagas will watch for actions. If they match, they fire off other sagas.
function* watcherSaga() {
    yield takeEvery('SEARCH_FOR_GIFS', searchForGifs)
    yield takeEvery('CREATE_FAVORITE', createFavorite);
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('FETCH_CATEGORIES', fetchCategories);
    yield takeEvery('SET_CATEGORY', setCategory);
}

const gifList = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIF_LIST':
            return action.payload;
        case 'CLEAR_GIF_LIST':
            return [];
    }

    return state;
}

const categoryList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORY_LIST':
            return action.payload;
    }

    return state;
}


const storeInstance = createStore(
    combineReducers({
        gifList,
        categoryList
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
