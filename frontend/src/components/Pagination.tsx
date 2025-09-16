import React from 'react';
import ReactPaginate from 'react-paginate';

export type PaginationProps = {
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  totalPages: number;
};

export const PaginationComp: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <ReactPaginate
      className="flex gap-[20px]  justify-center"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(data) => setCurrentPage(data.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel="<"
      previousLinkClassName="px-3 py-1  hover:opacity-50 hover:bg-main-button-bg  cursor-pointer duration-[0.5s] border border-gray-300 rounded "
      nextLinkClassName="px-3 py-1 hover:opacity-50  hover:bg-main-button-bg  cursor-pointer duration-[0.5s] border border-gray-300 rounded "
      pageLinkClassName="px-3 py-1 hover:opacity-50  hover:bg-main-button-bg  cursor-pointer duration-[0.5s] select-none border border-gray-300 rounded "
      activeLinkClassName="pointer-events-none text-white bg-main-button-bg"
      breakLinkClassName="px-3 py-1 text-gray-500"
      disabledLinkClassName="opacity-50 cursor-default pointer-events-none"
    />
  );
};
