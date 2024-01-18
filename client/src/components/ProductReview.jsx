// ProductPage.js
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { handleRatingProduct } from "../services/productService";
import { baseUrl } from "../services/userService";



const ProductReview = ({ prodId, setProduct, reviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await handleRatingProduct(rating, prodId, comment);

      const updatedProduct = response.payload;
       setProduct(updatedProduct);
      setLoading(false);
      toast.success(response.message);
      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting review:", error);
      toast.error(error.response.data.message);
    }
  };




  return (

    <section className="bg-gray-100 py-8 lg:py-16 antialiased pt-24 mt-12 px-3 lg:px-8 relative">
    
    {loading && (
       <div id="loading-custom-icon" className="h-full w-full absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999]">
       <div data-te-loading-management-init data-te-parent-selector="#loading-custom-icon" className="flex flex-col items-center gap-2">
         <div data-te-loading-icon-ref className="inline-block h-8 w-8 animate-spin border-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-white" role="status">
           <span className="[&>svg]:w-8">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
             </svg>
           </span>
         </div>
         <span data-te-loading-text-ref className="text-white ">Loading...</span>
       </div>
     </div>
    )}

      <h2 className="text-2xl font-semibold mb-12 border-b-2 border-yellow-500 inline-block pb-1 dark:text-[#1F2937]">
        Customer Reviews ({reviews?.length})
      </h2>
      <div className="max-w-full mx-auto ">
        
        {user ? (
          <>
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-[#1F2937]">
            Write a Review
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <label className="mb-4 flex items-center gap-5 dark:text-[#1F2937]">
            Rating:
            <Rating
              emptySymbol={
                <i>
                  <FaRegStar />
                </i>
              }
              fullSymbol={
                <i>
                  <FaStar />
                </i>
              }
              onChange={(value) => handleRatingChange(value)}
              initialRating={rating}
              fractions={2}
              className="text-yellow-500 text-2xl lg:text-4xl inline-block"
            />
          </label>

          <div className="py-2 px-4 mb-4 shadow-sm bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>

            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a review..."
              required
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post Review
          </button>
        </form>
        </>
        )
        : ( <div className="mb-6"> <Link to="/login" className="text-blue-500 hover:underline dark:underline">Login</Link> <span className="dark:text-[#1F2937]">to write a review</span> </div> )
      }

        {reviews?.map(
          (review) => (
            
            (
              <article
                className="p-6 max-w-5xl text-base bg-white shadow-md rounded-lg dark:bg-gray-900 mb-5"
                key={review._id}
              >
                <footer className="flex flex-col min-[420px]:flex-row justify-between min-[420px]:items-center mb-2 gap-y-3 min-[420px]:gap-y-0">
                  <div className="flex items-center">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={review.postedBy?.image}
                      alt="user profile picture"
                    />
                    <p className="flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      {review.postedBy?.firstName + " " + review.postedBy?.lastName}
                    </p>
                   
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </time>
                    </p>
                    
                  </div>
                <div className="block sm:hidden">
                <Rating emptySymbol={<FaRegStar/>} fullSymbol={<FaStar/>} initialRating={review.star} readonly className="text-yellow-500 hidden sm:block"/>
                </div>
                 
                <div className="hidden sm:block">
                <Rating emptySymbol={<FaRegStar/>} fullSymbol={<FaStar/>} initialRating={review.star} readonly className="text-yellow-500"/>
                </div>
                </footer>
               
                <p className="text-gray-500 dark:text-gray-400">{review.comment}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
            )
          )
        )}
      </div>
    </section>
  );
};

export default ProductReview;
