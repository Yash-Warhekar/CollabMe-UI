import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  // console.log("this " +connections)
  // if () return;

  if (!connections || connections.length === 0) {
    return <h1 className="flex justify-center my-10"> No connections found</h1>;
  }
  return (
    <div className="w-1/2 justify-center m-auto my-3.5">
        <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Your's Connections
      </li>
      {connections.map((conn) => {
        return (
          <li key={conn._id} className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={conn.profile}
              />
            </div>
            <div>
              <div>{conn.firstName +" " + conn.lastName}</div>
              {conn.age && conn.gender && <div className="text-xs uppercase font-semibold opacity-60">
                {conn.gender +' '+ conn.age}
              </div>}
            </div>
            <p className="list-col-wrap text-xs">
              {conn.about}
            </p>
           <button className="btn btn-soft btn-info">View Profile</button>
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default Connections;
