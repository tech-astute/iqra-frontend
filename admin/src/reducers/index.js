import { combineReducers } from 'redux';

import menu from './menu/menu';
import article from './article/article';
import editorial from './editorial/editorial';

export const reducers = combineReducers({
    menu,
    article,
    editorial
});
