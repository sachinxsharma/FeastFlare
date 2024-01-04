import React, { useState } from 'react';
// import {Link} from "react-router-dom";
import {MdShoppingBasket, MdAdd, MdLogout} from "react-icons/md";
import { motion } from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from './img/logo.png';
import Avatar from './img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from "../context/StateProvider";
import { actionType } from '../context/reducer';


const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{user,cartShow,cartItems},dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)

     const login = async () => {
      if(!user){
        const {
          user: {refreshToken,providerData},} = await signInWithPopup(firebaseAuth, provider);
        dispatch({
          type : actionType.SET_USER,
          user : providerData[0]
        });
        localStorage.setItem('user',JSON.stringify(providerData[0]));
      }else{
          setIsMenu(!isMenu);
      }
     };
     const logout = () =>{
      setIsMenu(false);
      localStorage.clear()

      dispatch({
        type : actionType.SET_USER,
        user : null
      });
     };

     const showCart = () => {
      dispatch({
        type :actionType.SET_CART_SHOW,
        cartShow: !cartShow,
      });
     }
      
     

  return (
    <header className="fixed z-50 w-screen  p-3 px-4 md:p-6 md:px-16 bg-primary">
    {/* desktop & Tablet */}
    <div className="hidden md:flex w-full h-full item-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold ">FeastFlare</p>
        </Link>

       <div className="flex item-center gap-8">
       <motion.ul
        initial={{ opacity:0, x:200 }}
        animate={{ opacity:1, x:0}}
        exit={{ opacity:0, x:200 }}
         className="flex items-center gap-8 ">
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Home</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Menu</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">About Us</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Services</li>
        </motion.ul>


        <div className="relative flex item-center justify-center" onClick={showCart}>
          <MdShoppingBasket className="text-textColor text-2x1 w-6 h-6 cursor-pointer"/>
        {cartItems && cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex item-center justify-center">
            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
          </div>
        )}
        </div>

        <div className="relative">
        <motion.img
         whileTap={{scale:0.6}} // cursor user image p le jaane par :
        src={user ? user.photoURL : Avatar} 
        className="w-6 min-w-[32px] h-6 min-h-[32px] drop-shadow-xl cursor-pointer rounded-full" 
        alt="userprofile"      
        onClick={login}  
        />
        {
          isMenu && (
            <motion.div
             initial={{opacity:0, scale :0.6}}
             animate={{opacity:1, scale :1}}
             exit={{opacity:0, scale :0.6}}
             className="w-40 bg-grey-50 shadow-xl rounded-g flex flex-col absolute top-12 right-0 ">
           {
            user && user.email === "sachin72tech@gmail.com" && (
              <Link to = {'createItem'}>
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer  hover:bg-blue-100 
            transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd /></p>
              </Link>
            )
           }
            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-100
            transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={logout}
            >
            Logout <MdLogout /></p>

        </motion.div>
          )
        }
        </div>
       </div>
    </div>

    {/* Mobile View */}
    <div className="flex item-center justify-between md:hidden w-full h-full">

        <div className="relative flex item-center justify-center" onClick={showCart}>
          <MdShoppingBasket className="text-textColor text-2x1 w-6 h-6 cursor-pointer"/>
          {cartItems && cartItems.length > 0 && (
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex item-center justify-center">
            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
          </div>
        )}
        </div>

        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold ">FeastFlare</p>
        </Link>

        <div className="relative">
        <motion.img
         whileTap={{scale:0.6}} // cursor user image p le jaane par :
        src={user ? user.photoURL : Avatar} 
        className="w-6 min-w-[32px] h-6 min-h-[32px] drop-shadow-xl cursor-pointer rounded-full" 
        alt="userprofile"      
        onClick={login}  
        />
        {
          isMenu && (
            <motion.div
             initial={{opacity:0, scale :0.6}}
             animate={{opacity:1, scale :1}}
             exit={{opacity:0, scale :0.6}}
             className="w-40 bg-grey-50 shadow-xl rounded-g flex flex-col absolute top-12 right-0 ">
           {
            user && user.email === "sachin72tech@gmail.com" && (
              <Link to = {'createItem'}>
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-100 
            transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={() => setIsMenu(false)}
            
            >New Item <MdAdd />
            </p>
              </Link>
            )}
           
           <ul
         className="flex flex-col ">
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-blue-100 px-4 py-2 ">Home</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-blue-100 px-4 py-2">Menu</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-blue-100 px-4 py-2">About Us</li>
          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-blue-100 px-4 py-2">Services</li>
        </ul>
        <p className="m-2 p-2 px-4 py-2 flex item-center gap-3 justify-center rounded-md shadow-md
        cursor-pointer hover:bg-red-400 hover:text-textColor transition-all
        duration-100 ease-in-out text-textColor text-base"
               onClick={logout}   
        >
          Logout <MdLogout/>
        </p>
        </motion.div>
          )
        }
        </div>
    </div>
    </header>
  )
};

export default Header