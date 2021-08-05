import React, { useState, createContext } from 'react'

export const EventContext = createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8000/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setEvents)
    }

    const createEvent = eventObj => {
        return fetch("http://localhost:8000/events", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(eventObj)
        })
        .then(getEvents)
        .then()
    }


    return (
        <EventContext.Provider value={
            {
                events, getEvents, createEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}