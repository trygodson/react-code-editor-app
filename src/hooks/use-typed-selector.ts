import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

export const usedTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
