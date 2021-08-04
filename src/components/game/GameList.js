import React, { useContext, useEffect } from 'react'
import { GameContext } from './GameProvider'

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    console.log(games)
    return (
        <>
            <header className="events__header">
                <h1>Level Up Games</h1>
            </header>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <br></br>
                        </section>
                    })
                }
            </article>
        </>
    )
}