import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { baseUrl } from '../services/userService';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProductModal = () => {

  const {setShowModal, handleAddToCart, modalProd} = useContext(UserContext)

  return (
   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
  <div className="w-[90%] max-w-6xl max-h-[90vh] rounded bg-white p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
  <button className='absolute top-5 right-5 text-3xl cursor-pointer' onClick={() => setShowModal(false)}>
  <IoIosCloseCircleOutline />
  </button>
    <div className="md:flex items-center justify-evenly -mx-10">
      <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
        <div className="relative">
        <img
              src={`${
                modalProd.image.startsWith("public/images/")
                  ? baseUrl + "/" + modalProd.image
                  : modalProd.image
              }`}
              className="relative z-10 w-full max-h-[155px] min-[320px]:max-h-[225px] min-[390px]:max-h-[250px] sm:max-h-[300px] md:max-h-[400px] mx-auto object-contain"
              alt=""
            />
          <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0" />
        </div>
      </div>
      <div className="w-full md:w-1/2 px-10">
        <div className="mb-10">
          <h1 className="font-bold uppercase text-md min-[425px]:text-xl md:text-2xl mb-5 max-lines-2">{modalProd.title}</h1>
          <p className="text-sm max-lines-3">{modalProd.description} <Link to={`/product/${modalProd._id}`} className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right" /></Link></p>
        </div>
        <div className='flex justify-between md:justify-start items-center'>
          <div className="inline-block align-bottom mr-5">
            <span className="text-2xl leading-none align-baseline">$</span>
            <span className="font-bold text-xl min-[425px]:text-2xl md:text-3xl lg:text-5xl leading-none align-baseline">{modalProd.price}</span>
           
          </div>
          <div className="inline-block align-bottom">
            <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-3 min-[320px]:px-5 min-[425px]:px-8 sm:px-10 py-2 font-semibold" onClick={() => handleAddToCart(modalProd)}><i className="mdi mdi-cart -ml-2 mr-2" /> Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}

export default ProductModal