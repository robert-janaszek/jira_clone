import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useDispatcher = <T,>(action: ActionCreatorWithPayload<T, string>) => {
  const dispatch = useDispatch();
  return (param: T) => dispatch(action(param));
}