import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { addToWhishList } from "../redux/features/wishlistSlice";


const UserContext = createContext();


const UserProvider = ({children}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalProd, setModalProd] = useState({});

    const handleAddToCart = (product) => {
 
        dispatch(addToCart(product));
  
    }

    const handleAddToWishlist = (product) => {
        dispatch(addToWhishList(product));
      }

    return (
        <UserContext.Provider value={{showModal, setShowModal, modalProd, setModalProd, handleAddToCart, handleAddToWishlist}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

