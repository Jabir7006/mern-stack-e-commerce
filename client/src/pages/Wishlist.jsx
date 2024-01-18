import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/userService';
import { removeFromWhishList } from '../redux/features/wishlistSlice';
import { addToCart } from '../redux/features/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const {whishListItems} = useSelector((state) => state.whishList);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWhishList(id));
  }


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
};
  return (
    <div className="container mx-auto mt-10 max-w-6xl">
 {whishListItems.length > 0 ? (
    <div className="flex shadow-md my-10">
    <div className="w-full bg-white px-8 sm:px-10 py-10">
      <div className="">
        <h1 className="font-semibold text-5xl pb-8 text-center text-[#404040]">My Wishlist</h1>
      </div>
      <div className="flex mt-10 mb-5">
        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 hidden sm:block">Quantity</h3>
        <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
        
      </div>

      
   {whishListItems && whishListItems.map((product) => (
        <div className="flex items-center justify-between hover:bg-gray-100 -mx-8 px-6 py-5" key={product._id}>
        <div className="flex w-2/5"> 
          <div className="">
            <img className="max-w-52 max-h-52 object-" src={product.image} alt="" />
          </div>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm max-lines-1">{product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}</span>
            <span className="text-red-500 text-xs">{product.brand}</span>
            <button className="font-semibold hover:text-red-500 text-gray-500 text-xs inline-flex" onClick={() => handleRemoveFromWishlist(product._id)}>Remove</button>
          </div>
        </div>
        <div className="flex justify-between sm:w-1/5">
         
          <input className="mx-2 border text-center w-8 hidden sm:block" type="text" defaultValue={1} disabled/>
         
        </div>
        <span className="text-center w-1/5 font-medium sm:font-semibold text-sm">${product.price}</span>
        <button className="text-center sm:w-1/5 font-semibold text-sm bg-[#111821] text-white py-2 px-3 sm:py-3 sm:px-5 rounded-md hover:bg-yellow-500 duration-200" onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
     
   ))}
     
      <Link to="/store" className="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
        Continue Shopping
      </Link>
    </div>
  
  </div>
 )
: (
  <h5 className='text-3xl flex justify-center items-center h-[80vh]'>No products in wishlist</h5>
)
}
</div>

  )
}

export default Wishlist