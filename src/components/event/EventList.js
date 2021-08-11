import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { EventContext } from './EventProvider'
import "./Event.css"
import marioyoshi from '../game/marioyoshi.png'

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent, deleteEvent } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    },[])


    return (
      <div className="eventList">
        <div className="eventList-container">
          <article className="events">
            <header className="events__header">
              <h1>Level Up Events</h1>
              <button
                className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                  history.push("/events/new");
                }}
              >
                Create New Event
              </button>
            </header>
            <br></br>
            {events.map(event => {
              return (
              <>
                <section key={event.id} className="registration">
                  <div className="registration__game">{event.game.title}</div>
                  <div>{event.title}</div>
                  <div>{event.description}</div>
                  <div>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} @ {event.time}
                  </div>
                  <div>Organized by: {event.organizer.user.first_name}</div>
                  <br></br>
                  <div>
                    {
                      event.attendees_count === 1
                      ? <div>{event.attendees_count} Person attending</div>
                      : <div>{event.attendees_count} People attending</div>
                    }
                  </div>
                  {
                    event.joined
                      ? <button className="btn btn-3"
                        onClick={() =>  leaveEvent(event.id)}>Leave</button>
                      : <button className="btn btn-2"
                        onClick={() =>  joinEvent(event.id)}>Join</button>
                  }
                  {
                    event.owner
                    ? <button className="btn btn-4"
                      onClick={() => deleteEvent(event.id)}>Delete</button>
                    : <></>
                  }
                </section>
                <br></br>
              </>)
            })}
          </article>
        </div>
        <img src={marioyoshi} className="mario-flex-right"/>
      </div>
    );
}