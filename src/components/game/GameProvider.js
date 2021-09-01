import React, { useState, createContext } from 'react'

export const GameContext = createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [gameTypes, setGameTypes] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getGames = (sortBy=null) => {
        return fetch(`https://levelup-server.herokuapp.com/games${sortBy === null ? "" : `?sortBy=${sortBy}`}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setGames)
    }

    const getGameTypes = () => {
        return fetch("https://levelup-server.herokuapp.com/gametypes", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(setGameTypes)
    }

    const getGameById = gameId => {
        return fetch(`https://levelup-server.herokuapp.com/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
    }

    const createGame = gameObj => {
        return fetch("https://levelup-server.herokuapp.com/games", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(gameObj)
        })
        .then(getGames)
        .then()
    }

    const editGame = game => {
        return fetch(`https://levelup-server.herokuapp.com/games/${game.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
        })
        .then(getGames)
    }

    const deleteGame = gameId => {
        return fetch(`https://levelup-server.herokuapp.com/games/${gameId}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getGames)
    }


    return (
        <GameContext.Provider value={
            {
                games, getGames, gameTypes,
                getGameTypes, createGame, editGame,
                getGameById, deleteGame, searchTerms, setSearchTerms
            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}