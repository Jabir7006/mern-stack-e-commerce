import React, { useEffect, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { handleGetAllCategories } from "../services/productService";

const Filter = ({ setCategory, selectedCat, setSelectedCat, selectedBrand, setSelectedBrand, selectedPriceRange, setSelectedPriceRange, products }) => {

  const [loadMore, setLoadMore] = useState(6);
  const [loadMoreBrands, setLoadMoreBrands] = useState(6);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await handleGetAllCategories();
        setCategories(response.payload.categories);
        setBrands(response.payload.brands);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCategories();
  }, [products]);

  const priceOptions = [
    { label: "All", name: "price", min: 0, max: Infinity },
    { label: "$0 - $25", name: "price", min: 0, max: 25 },
    { label: "$25 - $50", name: "price", min: 25, max: 50 },
    { label: "$50 - $75", name: "price", min: 50, max: 75 },
    { label: "$75 - $100", name: "price", min: 75, max: 100 },
    { label: "$100+", name: "price", min: 100, max: Infinity },
  ];


  const handleFilterByCategory = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.value;

    // Check if the category is already selected
    const categoryIndex = selectedCat.indexOf(selectedCategory);

    if (categoryIndex === -1) {
      // If not selected, add it to the array
      setSelectedCat((prevCategories) => [...prevCategories, selectedCategory]);
    } else {
      // If already selected, remove it from the array
      setSelectedCat((prevCategories) => [
        ...prevCategories.slice(0, categoryIndex),
        ...prevCategories.slice(categoryIndex + 1),
      ]);
    }
  };

  const handleFilterByBrand = (e) => {
    e.preventDefault();
    const selectedBrands = e.target.value;

    // Check if the category is already selected
    const brandIndex = selectedBrand.indexOf(selectedBrands);

    if (brandIndex === -1) {
      // If not selected, add it to the array
      setSelectedBrand((prevBrand) => [...prevBrand, selectedBrands]);
    } else {
      // If already selected, remove it from the array
      setSelectedBrand((prevBrand) => [
        ...prevBrand.slice(0, brandIndex),
        ...prevBrand.slice(brandIndex + 1),
      ]);
    }
  };

  const handleFilterByPrice = (e) => {
    const selectedPriceLabel = e.target.value;
    const selectedPrice = priceOptions.find((price) => price.label === selectedPriceLabel);

    if (selectedPrice) {
      setSelectedPriceRange([selectedPrice.min, selectedPrice.max]);
    }
  };

  return (
    <>
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        <li>
          <button
            value=""
            onClick={(e) => {
              e.preventDefault();
              setCategory("");
            }}
          >
            All
          </button>
        </li>
        {categories.slice(0, 5)?.map((category) => (
          <li key={category}>
            <button
              className="hover:border-b duration-300 border-yellow-500 capitalize"
              value={category}
              onClick={(e) => {
                e.preventDefault();
                setCategory(e.target.value);
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* //category Filter// */}

      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Category</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {categories.slice(0, loadMore).map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={category}
                      name={category}
                      value={category}
                      onChange={handleFilterByCategory}
                      type="checkbox"
                      checked={selectedCat.includes(category)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={category} className="ml-3 text-sm text-gray-600 capitalize">
                      {category}
                    </label>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  {categories.length > loadMore && (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => setLoadMore((prev) => prev + 5)}
                    >
                      Load More
                    </button>
                  )}
                  {selectedCat?.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCat([]);
                      }}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      reset
                    </button>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* //brands filter// */}

      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-all ">
                <span className="font-medium text-gray-900">Brands</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {brands.slice(0, loadMoreBrands).map((brand, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={brand}
                      name={brand}
                      value={brand}
                      onChange={handleFilterByBrand}
                      type="checkbox"
                      checked={selectedBrand.includes(brand)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={brand} className="ml-3 text-sm text-gray-600 capitalize">
                      {brand}
                    </label>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  {brands?.length > loadMoreBrands ? (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => setLoadMoreBrands((prev) => prev + 5)}
                    >
                      Load More
                    </button>
                  ) : null}
                  {selectedBrand.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedBrand([]);
                      }}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      reset
                    </button>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* //Price filter// */}

      <Disclosure as="div" className="border-b border-gray-200 py-6" defaultOpen={true}>
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-all ">
                <span className="font-medium text-gray-900">Price</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4 border-b pb-8">
                {priceOptions.map((price, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={price.label}
                      name={price.name}
                      value={price.label}
                      onChange={handleFilterByPrice}
                      checked={ 
                        selectedPriceRange[0] === 0 && selectedPriceRange[1] === "Infinity"
                          ? true
                          : selectedPriceRange[0] === price.min &&
                            selectedPriceRange[1] === price.max
                      }
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <label htmlFor={price.label} className="ml-3 text-sm text-gray-600 capitalize">
                      {price.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <input
                  type="number"
                  name="min"
                  id="min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="min"
                  className="border border-gray-400 rounded-md px-2 w-[30%] focus:outline-none"
                  min={0}
                />
                <input
                  type="number"
                  name="max"
                  id="max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="max"
                  className="border border-gray-400 rounded-md px-2 w-[30%] focus:outline-none"
                  min={1}
                />

                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPriceRange([
                      minPrice ? minPrice : 0,
                      maxPrice ? maxPrice : "Infinity",
                    ]);
                  }}
                >
                  Apply
                </button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Filter;
