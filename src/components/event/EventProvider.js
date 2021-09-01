import React, { useState, createContext } from 'react'

export const EventContext = createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("https://levelup-server.herokuapp.com/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setEvents)
    }

    const createEvent = eventObj => {
        return fetch("https://levelup-server.herokuapp.com/events", {
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
        return fetch(`https://levelup-server.herokuapp.com/events/${ eventId }/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getEvents)
    }

    const leaveEvent = eventId => {
        return fetch(`https://levelup-server.herokuapp.com/events/${ eventId }/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getEvents)
    }

    const deleteEvent = eventId => {
        return fetch(`https://levelup-server.herokuapp.com/events/${eventId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getEvents)
    }


    return (
        <EventContext.Provider value={
            {
                events, getEvents,
                createEvent, joinEvent,
                leaveEvent, deleteEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}