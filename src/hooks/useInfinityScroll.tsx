import {useCallback, useState} from 'react';

import {getNewServices} from '../store/slices/services/thunks';
import {useAppSelector, useAppDispatch} from './useReduxHooks';

export const useInfinityScroll = () => {
  const {nextPage} = useAppSelector(state => state.service);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (nextPage === '' || isLoading) return;

    dispatch(getNewServices(nextPage));
    setIsLoading(false);
  }, [dispatch, isLoading, nextPage]);

  return {isLoading, loadMore};
};
