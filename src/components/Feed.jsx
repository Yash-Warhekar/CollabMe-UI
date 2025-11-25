import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios'
import UserCard from './userCard';

const Feed = () => {
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true)
  const feed = useSelector((store)=>store.feed);
   const getFeed=async()=>{
     if (feed){
      setLoading(false)
      return;
     }
     
     try {
       const res = await axios.get(BASE_URL + "/feed", {
         withCredentials: true,
       });
       dispatch(addFeed(res.data));
       console.log(res.data);
       
     } catch (err) {
      console.error(err)
     }finally{
      setLoading(false)
     }
   }

   useEffect(()=>{
    getFeed();
   },[])

  if (loading) {
    return (
      <h1 className="flex justify-center my-10">
        <span className="loading loading-dots loading-lg"></span>
      </h1>
      
    );
  }

   if (!feed || feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10">
        Currently No new users Found
      </h1>
    );
  }
  return (
    feed && (
      <div className='flex justify-center my-15'>
      <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed