import React, { useState, createContext } from 'react'

export const GameContext = createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setGames)
    }


    return (
        <GameContext.Provider value={
            {
                games, getGames
            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}