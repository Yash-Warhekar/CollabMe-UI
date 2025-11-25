import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Login = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [emailId, setEmail] = useState("virat@gmail.com");
  let [password, setPassword] = useState("Yash@2003");
  let [isLoggdIn, setIsLoggdIn] = useState(false);

  let [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = { emailId, password };
      const res = await axios.post(BASE_URL + "/login", data, {
        withCredentials: true,
      });

      dispatch(addUser(res.data)); //outlet calling add user
      navigate("/"); //navigate to main page(feed page)
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  const handleSignUp=async()=>{
    try{
      const data={firstName,lastName,emailId,password}
      const res=await axios.post(BASE_URL+'/signup',data,{withCredentials:true});
      dispatch(addUser(res?.data?.newuser))
      navigate("/profile"); 
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center my-13 ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoggdIn ? "Login" : "signUp"}
          </h2>

          {!isLoggdIn && (
            <>
              <label className="input validator m-1">
                <input
                  type="text"
                  // className="input validator"
                  required
                  placeholder="Firstname"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <p className="validator-hint">
                  Must be 3 to 30 characters
                  <br />
                  containing only letters, numbers or dash
                </p>
              </label>
              <label className="input validator m-1">
                <input
                  type="text"
                  // className="input validator"
                  required
                  placeholder="Lastname"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <p className="validator-hint">
                  Must be 3 to 30 characters
                  <br />
                  containing only letters, numbers or dash
                </p>
              </label>{" "}
            </>
          )}
          <label className="input validator m-1">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <div className="card-actions justify-center mt-1.5 my-5">
          <p className="text-red-600">{error}</p>
          <button
            className="btn btn-primary"
            onClick={isLoggdIn ? handleLogin : handleSignUp}
          >
            {isLoggdIn ? "Login" : "Sign Up"}
          </button>
        </div>
        <p className="card-actions justify-center mt-1.5 my-5 cursor-pointer hover:to-blue-500" onClick={()=>setIsLoggdIn((value)=>!value)} >{isLoggdIn?'New user? signup':'old user? login.'}</p>
      </div>
    </div>
  );
};

export default Login;
