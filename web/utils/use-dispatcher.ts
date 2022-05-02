import { ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useDispatcher = <T, R>(action: ActionCreatorWithPayload<T, string>) => {
  const dispatch = useDispatch();
  return (param: T) => dispatch(action(param));
}

export const useAsyncDispatcher = <T, R>(action: AsyncThunk<R, T, {}>) => {
  const dispatch = useDispatch();
  return (param: T) => dispatch(action(param));
}