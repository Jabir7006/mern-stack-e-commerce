import { Dialog, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import React, { Fragment, useContext, useEffect, useState, lazy, Suspense } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import Paginate from "../components/Pagination";
import { UserContext } from "../context/userContext";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../redux/features/productSlice";
import { handleGetProducts } from "../services/productService";
const ProductModal = lazy(() => import("../components/ProductModal"));

const sortOptions = [
  { name: "Most Popular", value: "popularity", current: true },
  { name: "Best Rating", value: "-totalRatings", current: false },
  { name: "Newest", value: "createdAt", current: false },
  { name: "Price: Low to High", value: "price", current: false },
  { name: "Price: High to Low", value: "-price", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Store() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { loading, products, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(12);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const [category, setCategory] = useState("");

  const [selectedCat, setSelectedCat] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);

  const [sort, setSort] = useState("");

  const { handleAddToCart, handleAddToWishlist, showModal, setShowModal, setModalProd } =
    useContext(UserContext);

  const getAllProducts = async () => {
    try {
      dispatch(getProductStart());
      const response = await handleGetProducts({
        category: category ? category : selectedCat.join(","),
        brand: selectedBrand.join(","),
        price: selectedPriceRange,
        limit: itemsCountPerPage,
        page: activePage,
        sort: sort,
      });
      dispatch(getProductSuccess(response.payload.products));
      setTotalItemsCount(response.payload.total);
    } catch (error) {
      dispatch(getProductFailure(error.response.data.message));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [
    activePage,
    itemsCountPerPage,
    category,
    selectedCat,
    selectedBrand,
    selectedPriceRange,
    sort,
  ]);

  const handleSorting = (e) => {
    e.preventDefault();
    setSort(e.target.value);
    sortOptions.forEach((option) => {
      if (option.value === e.target.value) {
        option.current = true;
      } else {
        option.current = false;
      }
    });
  };

  return (
    <div className="px-3 md:px-4 lg:px-8 overflow-x-hidden">
      <AnimatePresence>
        <Suspense
          fallback={<div className="text-center animate-pulse font-medium">Loading...</div>}
        >
          {showModal && <ProductModal />}
        </Suspense>
      </AnimatePresence>

      <h1 className="text-center max-[350px]:hidden text-[#2b2c2c] min-[350px]:block text-2xl md:text-3xl font-bold pt-8 md:-mb-4">
        Our Store
      </h1>
      {loading && <Loading />}
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <Filter />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 py-5">
            <h1 className="text-[1.1rem] sm:text-[1.3rem] md:text-2xl font-semibold tracking-tight text-gray-900">
              Filters
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              value={option.value}
                              onClick={handleSorting}
                              className={classNames(
                                option.current ? "font-medium text-gray-900" : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <form className="hidden lg:block">
                <Filter
                  setCategory={setCategory}
                  selectedCat={selectedCat}
                  setSelectedCat={setSelectedCat}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  products={products}
                />
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 sm:px-3">
                {!error ? (
                  <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4 justify-center">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="hover:border-2 hover:border-yellow-400 transition-all duration-200 p-1 min-[320px]:p-2 min-[420px]:p-3 w-full max-[320px]:h-[320px] h-[345px] md:max-w-md text-center overflow-hidden group shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:scale-[.99] rounded"
                      >
                        <div className="mySwiper">
                          <div className="relative overflow-hidden group">
                            <Link to={`/product/${product._id}`}>
                              <img
                                src={product.image}
                                className="w-[150px] h-[150px] object-contain mx-auto mb-4"
                                alt={product.title}
                                loading="lazy"
                              />
                            </Link>

                            <div className="flex justify-center items-center gap-1 sm:gap-2 absolute left-0 right-0 top-44 transition-all duration-300 group-hover:top-28">
                              <button
                                className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300"
                                onClick={() => handleAddToWishlist(product)}
                              >
                                <IoMdHeartEmpty className="text-[17px] sm:text-[20px] md:text-[24px]" />
                              </button>
                              <button
                                className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300"
                                onClick={() => {
                                  setShowModal(true);
                                  setModalProd(product);
                                }}
                              >
                                <LuEye className="text-[15px] min-[320px]:text-[17px] sm:text-[20px] md:text-[24px]" />
                              </button>
                              <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
                                <IoGitCompareOutline className="text-[17px] sm:text-[20px] md:text-[24px]" />
                              </button>
                            </div>
                          </div>
                          <Link
                            to={`/product/${product._id}`}
                            className="text-blue-700 hover:underline cursor-pointer text-[.85rem] min-[320px]:text-[.88rem] min-[420px]:text-[.9rem] sm:text-[.97rem] max-lines-2 overflow-hidden"
                          >
                            {product.title.length > 40 ? (
                              <>
                                <span>{product.title.substring(0, 40)}</span>
                                <span style={{ display: "block" }}>
                                  {product.title.substring(40) + "..."}
                                </span>
                              </>
                            ) : (
                              product.title
                            )}
                          </Link>

                          <p className="text-yellow-600 mt-5 mb-4">
                            <Rating
                              initialRating={product.totalRatings}
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
                              readonly
                            />
                          </p>

                          <h6 className="font-semibold">${product.price}</h6>

                          <button
                            className="bg-yellow-500 text-white px-4 py-3 sm:px-7 sm:py-3 rounded-full text-[12px] uppercase hover:bg-black hover:text-white transition-all translate-y-[100px] duration-300 group-hover:translate-y-[-40px]"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <h3 className="text-3xl">{error}</h3>
                  </div>
                )}
              </div>
            </div>
          </section>
          <Paginate
            activePage={activePage}
            setActivePage={setActivePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
          />
        </main>
      </div>
    </div>
  );
}
