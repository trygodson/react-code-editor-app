import { combineReducers } from 'redux';
import bundleReducer from './bundle-reducer';

import reducer from './cell-reducer';

const reducers = combineReducers({ cells: reducer, bundle: bundleReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
