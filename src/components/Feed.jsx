import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios'
import UserCard from './userCard';

const Feed = () => {
  const dispatch=useDispatch();
  const feed = useSelector((store)=>store.feed);
   const getFeed=async()=>{
    if (feed && feed.length>0) return;
    try{
      const res=await axios.get(BASE_URL+'/feed',{withCredentials:true});
      dispatch(addFeed(res.data));
      console.log(res.data)


    }catch(err){
      console.error(err.message)
    }
   }

   useEffect(()=>{
    getFeed();
   },[])
  return (
    feed && (
      <div className='flex justify-center my-15'>
      <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed