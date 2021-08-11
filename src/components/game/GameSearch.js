import React, { useContext } from 'react'
import { GameContext } from './GameProvider'
import "./Game.css"


export const GameSearch = () => {
    const { setSearchTerms } = useContext(GameContext)

    return (
        <div className="searchBar">
            <div>
                <h4 className="searchBar__title">Search for a Game:</h4>
                <input type="text"
                  className="input--wide"
                  onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
                  placeholder="Type Game Name Here"/>
            </div>
        </div>
    )
}