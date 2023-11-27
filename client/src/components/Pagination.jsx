import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Pagination from "react-js-pagination";


const Paginate = ({ activePage, setActivePage, itemsCountPerPage, totalItemsCount }) => {
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="flex justify-center lg:justify-end items-center pb-20 -mt-5">
     
        <Pagination
          innerClass="flex items-center md:gap-6 justify-center"
          activePage={activePage}
          activeClass="text-white bg-[#111821] py-2 px-4 rounded-md shadow-md"
          itemClass="hover:bg-gray-300 py-2 px-4 rounded-md cursor-pointer"
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          prevPageText={
            <button className="flex items-center gap-2">
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </button>
          }
          nextPageText={
            <button className="flex items-center gap-2">
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </button>
          }
           
          disabledClass="opacity-60 !cursor-not-allowed"
        />
    
    </div>
  );
};

export default Paginate;
