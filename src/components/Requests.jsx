import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import axios from "axios";
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
      if (!res) {
        return <h1>Currently no requests</h1>;
      }
    }catch (err) {
      // Handle 404 cleanly
      
      if (err.response && err.response.status === 404) {
       console.error(err.response.data.message);
        dispatch(addRequests([]));  // set empty array
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

   if (loading) {
    return (
      <h1 className="flex justify-center my-10">
        <span className="loading loading-dots loading-lg"></span>
      </h1>
      
    );
  }


 if (!requests || requests.length === 0) {
    return (
      <h1 className="flex justify-center my-10">
        No Requests Found
      </h1>
    );
  }

  return (
    <div className="w-1/2 justify-center m-auto my-3.5">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
          Your's Requests
        </li>
        {requests.map((request) => {
          const { firstName, lastName, age, gender, about, profile } =
            request.fromUserId;
          console.log(request.fromUserId.gender);
          console.log(request);
          return (
            <li key={request._id} className="list-row">
              <div>
                <img className="size-10 rounded-box" src={profile} />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                {
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {gender?gender:'Na' + " " + age?age:'Na'}
                  </div>
                }
              </div>
              <p className="list-col-wrap text-xs">{about}</p>
              <div className=" flex gap-5">
                <button className="btn btn-soft btn-info">View Profile</button>
                <button
                  className="btn btn-soft btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-soft btn-info"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
