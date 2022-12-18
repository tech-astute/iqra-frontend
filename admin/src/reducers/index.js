import { combineReducers } from 'redux';

import menu from './menu/menu';
import article from './article/article';
import editorial from './editorial/editorial';
import auth from './auth/auth';

import category from './master/category';
import subject from './master/subject';
import medium from './master/medium';
import level from './master/level';

export const reducers = combineReducers({
    menu,
    article,
    editorial,
    auth,
    category,
    subject,
    medium,
    level,
});
