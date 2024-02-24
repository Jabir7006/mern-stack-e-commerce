import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="max-w-md w-full mx-auto rounded-md pb-20 px-6">
    
 

    <div className="bg-gray-200 animate-pulse rounded-lg">
      <div className="h-48 rounded-t-lg" />
      <div className="p-5">
        <div className="mb-2 h-6 w-3/4 bg-gray-400 rounded" />
        <div className="mb-3 h-4 w-full bg-gray-400 rounded" />
        <div className="inline-flex items-center px-3 py-2 space-x-2 h-8 w-32 bg-gray-400 rounded-lg">
          <div className="w-16 h-4 bg-gray-400 rounded " />
          <div className="w-3.5 h-3.5 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
    

    
  
    </div>
  );
};

export default BlogSkeleton;
