import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import appReducer from './reducers/index'

const logger = createLogger({})

const store = createStore(
	appReducer,
	applyMiddleware(
		logger,
		promiseMiddleware
	)
)

export default store