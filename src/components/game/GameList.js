import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { GameContext } from './GameProvider'
import "./Game.css"
import marioyoshi from "./marioyoshi.png"

export const GameList = (props) => {
    const { games, getGames, deleteGame } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    
    return (
        <>
            <div className="gameList">
                <div className="gameList-container">
                    <header className="events__header">
                        <h1>Level Up Games</h1>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push("/games/new")
                            }}>Register New Game</button>
                    </header>
                    <br></br>
                    <article className="games">
                        {
                            games.map(game => 
                                <>
                                <section key={`game--${game.id}`} className="game">
                                    <div className="game__title">{game.title}</div>
                                    <div className="game__players">{game.number_of_players} players needed</div>
                                    <div className="game__skillLevel">Skill level is {game.skill_level} out of 5</div>
                                    <div className="game__event_count">
                                        {
                                            game.event_count > 1 || game.event_count === 0
                                            ? <div>{game.event_count} Events scheduled</div>
                                            : <div>{game.event_count} Event scheduled</div>
                                        }
                                    </div>
                                <div className="game__edit">
                                    <button className="btn btn-3"
                                    onClick={() => history.push(`/games/${game.id}/edit`) }>Edit</button>
                                    <button className="btn btn-4"
                                    onClick={() => deleteGame(game.id) }>Delete</button>
                                </div>
                                </section>
                                <br></br>
                                </>
                            )
                        }
                    </article>
                </div>
            </div>
            <img src={marioyoshi} className="mario-flex-right"/>
        </>
    )
}