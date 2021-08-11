import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { GameContext } from '../game/GameProvider'
import { EventContext } from './EventProvider'


export const EventForm = () => {
    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)
    const history = useHistory()
    const currentUser = localStorage.getItem("lu_token") // can we even do this still?
    
    const [currentEvent, setCurrentEvent] = useState({
        organizerId: currentUser,
        description: "",
        gameId: 0,
        date: "",
        time: "",
        title: "",
    })

    useEffect(() => {
        getGames()
    }, [])


    const handleUserInput = (event) => {
        const newEventState = {...currentEvent}
        newEventState[event.target.name] = event.target.value
        setCurrentEvent(newEventState)
    }

    const handleSaveEvent = (event) => {
        event.preventDefault()
        
        const newEvent = {
            organizerId: currentUser,
            description: currentEvent.description,
            gameId: currentEvent.gameId,
            date: currentEvent.date,
            time: currentEvent.time,
            title: currentEvent.title
        }
        // Send POST request to your API
        createEvent(newEvent)
            .then(() => history.push("/events"))
    }


    return (
      <div className="eventForm">
        <form className="eventForm-flex">
          <h2 className="eventForm__title">Schedule New Event</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="gameId">Game: </label>
              <select
                name="gameId"
                className="form-control"
                value={currentEvent.gameId}
                onChange={handleUserInput}
              >
                <option value="0">Select a game...</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                required
                autoFocus
                className="form-control"
                value={currentEvent.title}
                onChange={handleUserInput}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Description: </label>
              <textarea
                type="text"
                name="description"
                required
                autoFocus
                className="form-control"
                value={currentEvent.description}
                onChange={handleUserInput}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Date: </label>
              <input
                type="date"
                name="date"
                required
                autoFocus
                className="form-control"
                value={currentEvent.date}
                onChange={handleUserInput}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Time: </label>
              <input
                type="time"
                name="time"
                required
                autoFocus
                className="form-control"
                value={currentEvent.time}
                onChange={handleUserInput}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            onClick={handleSaveEvent}
            className="btn btn-2 btn-sep icon-create"
          >
            Create Event
          </button>
          <button
            onClick={() => history.push("/games")}
            className="btn btn-3 btn-sep icon-create"
          >
            Go Back
          </button>
        </form>
      </div>
    );
}