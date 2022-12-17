import { combineReducers } from 'redux';

import menu from './menu/menu';
import article from './article/article';
import editorial from './editorial/editorial';
import auth from './auth/auth';

export const reducers = combineReducers({
    menu,
    article,
    editorial,
    auth
});
