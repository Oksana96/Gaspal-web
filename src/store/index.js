import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import gaspalReducer from '../reducers/gaspalReducer';

const store = createStore(
    gaspalReducer,
    applyMiddleware(logger),
)

export default store;