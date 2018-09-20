import { ITEMS_IS_LOADING, RECEIVE_FILMS, ITEMS_HAS_ERRORED } from '../actions';

export const itemsHasErrored = (state = false, action) => {
    switch (action.type) {
        case ITEMS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
};

export const itemsIsLoading = (state = false, action) => {
    switch (action.type) {
        case ITEMS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
};

export const items = (state = [], action) => {
    if (action && action.type) {
        switch (action.type) {
            case RECEIVE_FILMS:
                return action.items;
            default:
                return state;
        }
    } else {
        return state;
    }
};
