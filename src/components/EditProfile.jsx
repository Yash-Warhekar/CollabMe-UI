import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    // console.log(user)
    let email=user.emailId
    let [firstName, setFirstName] = useState(user.firstName);
    let [lastName, setLastName] = useState(user.lastName);
    let [profile, setProfile] = useState(user.profile); //profile pic url
    let [age, setAge] = useState(user.age);
    let [gender, setGender] = useState(user.gender);
    let [about,setAbout]=useState(user.about)
    let [skills,setSkills]=useState(user.skills)
    let [error,setError]=useState('')
    const [showToast,setShowToast]=useState(false)
    const dispatch=useDispatch()

    const handleUpdate=async()=>{
        try{
            setError('')
            const res=await axios.patch(BASE_URL+'/profile/edit',{
               firstName,
               lastName,
               age,
               gender,
               profile,
               about,
               skills             
            },{withCredentials:true})
            dispatch(addUser(res?.data?.updatedData))
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            },2000)
        }catch(err){
            setError(err.response.data)
            console.error(err)
        }
    }
  return (
    <>
      <div className="flex my-13 justify-center gap-5">
        <div>
          <div className="flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Firstname</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Lastname</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email Id</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder={email}
                    value={email}
                    disabled
                    // onChange={(e)=>setLastName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={gender}
                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile Pic</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    type="text"
                    className="textarea input-bordered w-full max-w-xs"
                    // placeholder="Type here"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="max upto-6"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </fieldset>
                <p className="text-red-600">{error}</p>
                <div className="card-actions justify-center mt-1.5">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard user={{firstName,lastName,age,gender,about,profile}} />
        </div>
      </div>
      {showToast && (<div>
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default EditProfile