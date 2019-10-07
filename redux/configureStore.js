import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from '../shared/dishes';
import { leaders } from '../shared/leaders';
import { comments } from '../shared/comments';
import { promotions } from '../shared/promotions';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders
        }),
        applyMiddleware(thunk, logger)
    )
}