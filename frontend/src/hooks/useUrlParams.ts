import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key: string) => searchParams.get(key) || '',
    [searchParams]
  );

  // Set or update param
  const setParam = useCallback(
    (key: string, value: string | number | undefined) => {
      if (value === undefined || value === '') {
        searchParams.delete(key);
      } else {
        searchParams.set(key, String(value));
      }
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return { getParam, setParam, searchParams };
};
