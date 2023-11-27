import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/features/cartSlice';
import { baseUrl } from '../services/userService';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState(0);

  const calculateSubTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  }
  const calculateTotal = () => {
    // Calculate the total for items 
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // Add shipping cost
    const totalWithShipping = itemsTotal + shipping;

    return totalWithShipping.toFixed(2);
  };

  useEffect(() => {
    if (calculateTotal() >= 100) {
      setShipping(0);
    } else {
      setShipping(4.99);
    }
  }, [cartItems, shipping]);

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div>
      {cartItems.length === 0 && (
        <div className='flex flex-col gap-6 justify-center items-center h-screen'>
          <h4 className='text-3xl text-blue-950 font-semibold'>No Items Found</h4>
          <Link to='/store' className='text-2xl bg-blue-800 text-white px-5 py-2 rounded'>
            Go Back
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className='py-20'>
          <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
          <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
            <div className='rounded-lg md:w-2/3'>
              {cartItems.map((item) => (
                <div key={item._id} className='mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start gap-5'>
                  <img
                    src={`${item.image?.startsWith('https') ? item.image : baseUrl + '/' + item.image}`}
                    alt='product-image'
                    className='w-56 h-56 mx-auto rounded-lg sm:h-32 sm:w-32'
                  />
                  <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                    <div className='mt-5 sm:mt-0'>
                      <h2 className='text-lg font-bold text-gray-900'>{item.title}</h2>
                      <p className='mt-1 text-xs text-gray-700'>
                        {item.description.length > 200 ? item.description.slice(0, 200) + '...' : item.description}
                      </p>
                    </div>
                    <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                      <div className='flex items-center border-gray-100'>
                        <button
                          className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                          onClick={() => handleDecrementQuantity(item._id)}
                          disabled={item.quantity === 1}
                        >
                          {' '}
                          -{' '}
                        </button>
                        <input
                          className='h-8 w-8 border bg-white text-center text-xs outline-none'
                          type='number'
                          value={item.quantity}
                          min={1}
                        />
                        <button
                          className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
                          onClick={() => handleIncrementQuantity(item._id)}
                          disabled={item.inStock === false}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-sm'>${item.price}</p>
                        <button onClick={() => handleRemoveCart(item._id)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:w-1/3'>
              <div className='mb-2 flex justify-between'>
                <p className='text-gray-700'>Subtotal</p>
                <p className='text-gray-700'>${calculateSubTotal()}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-gray-700'>Shipping</p>
                <p className='text-gray-700'>${shipping.toFixed(2)}</p>
              </div>
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p className='text-lg font-bold'>Total</p>
                <div className='text-right'>
                  <p className='mb-1 text-lg font-bold'>${calculateTotal()} USD</p>
                  <p className='text-sm text-gray-700'>including VAT</p>
                </div>
              </div>
              <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
                Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
