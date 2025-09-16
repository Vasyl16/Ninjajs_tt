import React, { useEffect, useState } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store/store';

import { SearchInput } from '../components/SearchInput';
import { SuperheroItems } from '../components/SuperheroItems';
import { PaginationComp } from '../components/Pagination';
import { fetchSuperHeros } from '../store/slices/superheroSlice';
import { selectSuperheroState } from '../store/slices/select';
import { useDebounce } from '../hooks/useDebounce';

export const SuperheroList: React.FC = () => {
  const { getParam, setParam } = useUrlParams();

  const [currentPage, setCurrentPage] = useState(Number(getParam('page') || 1));
  const [searchQuery, setSearchQuery] = useState(getParam('search') || '');

  const { debounceValue: debouncedSearch } = useDebounce(searchQuery, 500);

  const dispatch = useAppDispatch();

  const {
    results: superherosResult = [],
    status,
    total,
  } = useSelector(selectSuperheroState);

  useEffect(() => {
    dispatch(fetchSuperHeros({ page: currentPage, search: debouncedSearch }));
    setParam('page', currentPage);
    setParam('search', searchQuery);
  }, [dispatch, currentPage, debouncedSearch]);

  return (
    <main className="w-full p-[30px_20px]">
      <section>
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-[50px] ">
            <div className="max-w-[700px] w-full">
              <SearchInput
                value={searchQuery}
                onChange={(val: string) => setSearchQuery(val)}
              />
            </div>

            {status === 'error' && <p>Error occurd</p>}

            {status === 'loading' ? (
              <p>Loading</p>
            ) : (
              <div className="">
                <SuperheroItems superheroList={superherosResult} />
              </div>
            )}

            {status === 'success' && superherosResult.length === 0 && (
              <p>Not found Users</p>
            )}

            {total > 1 && (
              <div>
                <PaginationComp
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={total}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
