import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { leaders } from './leaders';
import { comments } from './comments';
import { favorites } from './favorites';
import { promotions } from './promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            leaders,
            comments,
            favorites,
            promotions
        }),
        applyMiddleware(thunk, logger)
    )

    return store;
}
