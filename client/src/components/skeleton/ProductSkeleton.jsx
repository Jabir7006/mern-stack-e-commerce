import React from "react";

const ProductSkeleton = () => {
  return (
    
      <div className="animate-pulse hover:border-2 hover:border-yellow-400 transition-all duration-200 p-1 min-[320px]:p-2 min-[420px]:p-3 w-full max-[320px]:h-[320px] max-h-[345px] md:max-w-[300px] text-center overflow-hidden group shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0,_05)_0px_1px_1px_0px] hover:scale-[.99] min-[390px]:hover:scale-[.96] rounded relative">
        <div className="mySwiper">
          <div className="relative overflow-hidden group">
            <div className="w-[150px] h-[150px] bg-gray-200 mx-auto mb-4 rounded" />
            <div className="flex justify-center items-center gap-1 sm:gap-2 absolute left-0 right-0 top-44 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full">
                <div className="h-5 w-5 bg-gray-200" />
              </button>
              <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full">
                <div className="h-5 w-5 bg-gray-200" />
              </button>
              <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full">
                <div className="h-5 w-5 bg-gray-200" />
              </button>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mt-2" />
          <div className="h-4 bg-yellow-600 mt-5 mb-4 mx-auto w-16" />
          <h6 className="font-semibold h-4 bg-gray-200 w-10 rounded mt-1" />
          <div className="bg-yellow-500 h-8 rounded-full mt-2"></div>
        </div>
        <div className="absolute top-0 left-0 h-8 w-16 bg-orange-500 rounded"></div>
     
    </div>
  );
};

export default ProductSkeleton;
