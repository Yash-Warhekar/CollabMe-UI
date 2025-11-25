import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'
const UserCard = ({user}) => {
  const {_id,firstName,lastName,profile,about,age,gender,skills}=user
  const dispatch=useDispatch()
  const handleSendRequest=async(status,userId)=>{
    try{

      const res=await axios.post(BASE_URL+'/request/send/'+ status + '/' + userId,
        {},
        {withCredentials:true}
      );
      dispatch(removeUserFromFeed(userId))

    }catch(err){
      console.error(err)
    }
  }


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={profile}
      alt="Profile Pic" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    <label className='overflow-auto'>{about}</label>
    {age && gender && (<p>{age +", "+gender}</p>)}
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>handleSendRequest('ignore',_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=> handleSendRequest('interested',_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard