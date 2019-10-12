import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { leaders } from './leaders';
import { comments } from './comments';
import { favorites } from './favorites';
import { promotions } from './promotions';
import storage from 'redux-persist/es/storage';
import { persistStore, persistCombineReducers } from 'redux-persist';

export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            leaders,
            comments,
            favorites,
            promotions
        }),
        applyMiddleware(thunk, logger)
    )

    const persistor = persistStore(store);

    return { persistor, store };
}
