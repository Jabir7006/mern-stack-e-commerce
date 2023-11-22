import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/userService';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { LuEye } from 'react-icons/lu';
import { IoMdHeartEmpty } from 'react-icons/io';


const OfferProduct = ({products, handleAddToCart}) => {
  const sliceProduct = products.slice(1, 3);

     const [remainingTime, setRemainingTime] = useState({ days: 10, hours: 0, minutes: 0, seconds: 0 });
   
     useEffect(() => {
       const endTime = new Date().getTime() + remainingTime.days * 24 * 60 * 60 * 1000;
       const interval = setInterval(() => {
         const now = new Date().getTime();
         const distance = endTime - now;
   
         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
         setRemainingTime({ days, hours, minutes, seconds });
   
         if (distance <= 0) {
           clearInterval(interval);
         }
       }, 1000);
   
       return () => clearInterval(interval);
     }, [setRemainingTime]);
   
     

  return (
    <div className='py-20'>
      <span className='flex justify-between'>
      <h4 className="font-medium text-xl md:text-[1.5rem] lg:text-2xl mb-5 mt-12">Deals <span className='text-red-600'>Of The Day</span></h4>
       <h4 className="font-medium text-xl md:text-[1.5rem] lg:text-2xl mb-5 mt-12">Electronic & Digital</h4>
      </span>
      <hr className="mb-12" />

      <div className='flex flex-col md:flex-row gap-5'>
      <div className='border-2 border-[#EBEBEB] hover:border-yellow-400 transition-all duration-200 p-5 flex flex-col lg:flex-row lg:w-1/2'>
        <div className='relative'>
        <img src="https://wphix.com/template/topico-prev/topico/assets/img/shop/product/product-24.jpg" alt="image" className='w-full'/>
        <span className='absolute top-0 right-8 bg-red-600 text-white px-2'>-13%</span>
        </div>
        
        <div className='lg:w-[60%]'>
          <Link to="/store" className="font-semibold text-md mb-2 text-blue-700 hover:underline">Samsung J7 Prime Android Mobile Dual Sim Smart Phone</Link>

          <span className='flex gap-8 mt-8 items-center'>
            <p className='font-semibold text-xl text-yellow-500'>$120.00</p>
            <p className='text-gray-400 line-through font-semibold text-xl'>125.00</p>
          </span>
          <p className='mt-5 text-md text-gray-600 leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore nemo et exercitationem mollitia! Minima...</p>

          <p className='mt-5 font-semibold'>Hurry Up! Offer ends in:</p>

          <div className='mt-6 flex flex-wrap gap-5'>
            <span className='flex flex-col items-center bg-[#ececec] w-16 h-16 p-2 rounded-full'>
              <p className='font-semibold'>{remainingTime.days}</p>
              <p className='text-xs text-gray-600 font-medium'>Days</p>
            </span>
            <span className='flex flex-col items-center bg-[#ececec] w-16 h-16 p-2 rounded-full'>
              <p className='font-semibold'>{remainingTime.hours}</p>
              <p className='text-xs text-gray-600 font-medium'>Hours</p>
            </span>
            <span className='flex flex-col items-center bg-[#ececec] w-16 h-16 p-2 rounded-full'>
              <p className='font-semibold'>{remainingTime.minutes}</p>
              <p className='text-xs text-gray-600 font-medium'>Mins</p>
            </span>
            <span className='flex flex-col items-center bg-[#ececec] w-16 h-16 p-2 rounded-full'>
              <p className='font-semibold'>{remainingTime.seconds}</p>
              <p className='text-xs text-gray-600 font-medium'>Secs</p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
       {sliceProduct.map((product) => (
       <div className="border-2 border-[#EBEBEB] hover:border-yellow-400 transition-all duration-200 p-5 w-full h-full md:h-[400px] md:w-[300px] text-center overflow-hidden group" key={product._id}>
       <div className="mySwiper">
         <div className="relative overflow-hidden group">
           <Link to={`/product/${product._id}`} className='relative'>
             <img
               src={`${baseUrl}/${product.image}`}
               className="w-[220px] object-cover mx-auto mb-4"
               alt=""
             />
              <span className='absolute top-0 right-0 bg-red-600 text-white px-2'>-13%</span>
           </Link>
 
           <div className="flex justify-center items-center gap-2 absolute left-0 right-0 top-52 transition-all duration-300 group-hover:top-36">
             <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
               <IoMdHeartEmpty size={26} />
             </button>
             <button
               className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300"
             >
               <LuEye size={26} />
             </button>
             <button className="bg-white border-2 border-[#EBEBEB] shadow-md p-2 rounded-full hover:text-white hover:bg-yellow-400 duration-300">
               <IoGitCompareOutline size={26} />
             </button>
           </div>
         </div>
         <Link
           to={`/product/${product._id}`}
           className="text-blue-700 hover:underline cursor-pointer"
         >
           {product.title}
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
 
         <h6 className="font-semibold">${product.price}.00</h6>
 
         <button
           className="bg-yellow-500 text-white px-7 py-3 rounded-full text-[12px] uppercase hover:bg-black hover:text-white transition-all translate-y-[100px] duration-300 group-hover:translate-y-[-40px]"
           onClick={() => handleAddToCart(product)}
         >
           Add to Cart
         </button>
       </div>
     </div>
       ))}
      </div>
      </div>
    </div>
  )
}

export default OfferProduct