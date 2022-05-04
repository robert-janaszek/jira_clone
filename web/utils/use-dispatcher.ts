import { useDispatch } from 'react-redux';

export const useDispatcher = <T extends unknown[], R>(action: (...args: T) => R) => {
  const dispatch = useDispatch();
  return (...params: T) => dispatch(action(...params));
}
