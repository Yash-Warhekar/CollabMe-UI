import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Navbar from './Navbar'
import axios from "axios";
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const userStoreData=useSelector((store)=>store.user.user)
  const fetchUser=async()=>{
    try{
      if (userStoreData){
        return
      }
      //check if user is logged in adn cookie is valid
      const res = await axios.get( BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data))
    }catch(err){
      if(err.status === 401){
        navigate('/login') //if invalid cookie->redirect to login
      }
      
      console.log(err);
    }
  }
  useEffect(()=>{
    // if(!userStoreData){
      fetchUser();
    // }
  },[]);
  return (
    <div> 
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
   
  )
}

export default Body