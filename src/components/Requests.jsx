import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import axios from 'axios'
const Requests = () => {
    const requests=useSelector((store)=>store.requests)
    const dispatch=useDispatch()
    const fetchRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+'/user/requests/received',{withCredentials:true})
            console.log(res?.data?.data)
            dispatch(addRequests(res?.data?.data))
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[])
  // console.log("this " +connections)
  if (!requests) return;

  if (requests.length === 0) return <h1> No Requests found</h1>;

  return (
    <div className="w-1/2 justify-center m-auto my-3.5">
        <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Your's Connections
      </li>
      {requests.map((request) => {
        const {firstName,lastName,age,gender,about,profile}=request.fromUserId;
        console.log(firstName)
        return (
          <li key={request._id} className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={profile}
              />
            </div>
            <div>
              <div>{firstName +" " + lastName}</div>
              {age && gender && <div className="text-xs uppercase font-semibold opacity-60">
                {gender +' '+ age}
              </div>}
            </div>
            <p className="list-col-wrap text-xs">
              {about}
            </p>
           <button className="btn btn-soft btn-info">View Profile</button>
          </li>
        );
      })}
    </ul>
    </div>
  );
}

export default Requests