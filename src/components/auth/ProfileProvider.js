import React, { useState, createContext } from 'react'

export const ProfileContext = createContext()


export const ProfileProvider = (props) => {
    /*
        Must profile a default value for the `events` property
        so that React doesn't throw an error when you try to
        iterate the events array in the view.
    */
   const [profile, setProfile] = useState({ events: [] })

   const getProfile = () => {
       return fetch("http://localhost:8000/profile", {
           headers: {
               "Authorization": `Token ${localStorage.getItem("lu_token")}`
           }
       })
       .then(res => res.json())
       .then(setProfile)
   }


   return (
       <ProfileContext.Provider value={
           {
               profile, getProfile
           }
       }>
           {props.children}
       </ProfileContext.Provider>
   )
}
