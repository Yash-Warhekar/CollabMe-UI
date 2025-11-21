import React from 'react'

const UserCard = ({user}) => {
  const {firstName,lastName,profile,about,age,gender,skills}=user
 
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
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard