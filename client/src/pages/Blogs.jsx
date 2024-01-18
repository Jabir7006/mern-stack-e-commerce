import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { getBlogsFailure, getBlogsStart, getBlogsSuccess } from "../redux/features/blogSlice";
import { handleGetAllBlogs, handleLikeBlog } from "../services/blogServices";
import { baseUrl } from "../services/userService";
import { toast } from 'react-toastify';
import { BiLike, BiSolidLike } from "react-icons/bi";


const Blogs = () => {
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);



  const dispatch = useDispatch();
  const getAllBlogs = async () => {
    try {
      dispatch(getBlogsStart());
      const response = await handleGetAllBlogs();
      dispatch(getBlogsSuccess(response.payload));
    } catch (error) {
      dispatch(getBlogsFailure(error.response.data.message));
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const likeBlog = async (id) => {
    try {
       const response = await handleLikeBlog(id);
       toast.success(response.message);
      getAllBlogs();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  
  return (
    <>
      {loading && <Loading />}
      <h3 className="text-3xl font-bold text-center pt-12 pb-10 text-blue-950">Our Blogs</h3>
      <section className="flex flex-row flex-wrap mx-auto rounded-md pb-20">
        {/* Card Component */}
        {blogs.map((blog) => (
          <div
            className="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3"
            key={blog._id}
          >
            <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <div className="md:flex-shrink-0">
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={`${
                      blog.thumbnail.startsWith("https")
                        ? blog.thumbnail
                        : baseUrl + "/" + blog.thumbnail
                    }`}
                    className="rounded-md"
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                <span className="text-xs font-medium text-blue-600 uppercase">{blog.category}</span>
                <div className="flex flex-row items-center">
                  <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{blog.views}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <span>25</span>
                  </div>
                  <div className="text-xs font-medium text-gray-500 flex flex-row items-center gap-[2px]">
                  <button onClick={() => likeBlog(blog._id)}>
                  {blog.likedBy.includes(user?._id) ? (
                    <BiSolidLike size={15} />
                  ) : (
                    <BiLike size={15} />
                  )}
                </button>
                    <span>{blog?.totalLikes}</span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
              <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <Link to={`/blog/${blog._id}`} className="hover:underline">
                  <h2 className="text-2xl font-bold tracking-normal text-gray-800">
                    {blog.title}
                  </h2>
                </Link>
              </div>
              <hr className="border-gray-300" />
              <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
                {blog.content.length > 230 ? blog.content.substring(0, 230) + " ..." : blog.content}
              </p>
              <hr className="border-gray-300" />
              <section className="px-4 py-2 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                  <img
                    src={`${
                      blog.author?.image.startsWith("https")
                        ? blog.author.image
                        : baseUrl + "/" + blog.author?.image
                    }`}
                    className="rounded-full w-12 h-12"
                    alt=""
                  />
                    <div className="flex flex-col mx-2">
                      <a href="" className="font-semibold text-gray-700 hover:underline">
                        {blog.author?.firstName + " " + blog.author?.lastName}
                      </a>
                      <span className="mx-1 text-xs text-gray-600">{new Date(blog.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">9 minutes read</p>
                </div>
              </section>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Blogs;
