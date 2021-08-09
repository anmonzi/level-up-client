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

    const joinEvent = eventId => {
        return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
    }


    return (
        <EventContext.Provider value={
            {
                events, getEvents,
                createEvent, joinEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}