import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { GameContext } from './GameProvider'
import "./Game.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
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
                                    <div className="game__title">{game.title} by {game.maker}</div>
                                    <div className="game__players">{game.number_of_players} players needed</div>
                                    <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                                <div className="game__edit">
                                    <button className="btn btn-3"
                                    onClick={() => history.push(`/games/${game.id}/edit`) }>Edit</button>
                                </div>
                                </section>
                                <br></br>
                                </>
                            )
                        }
                    </article>
                </div>
            </div>
        </>
    )
}