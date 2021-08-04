import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from './GameProvider'
import { useHistory } from 'react-router'


export const GameForm = () => {
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)
    const history = useHistory()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
   const [ currentGame, setCurrentGame ] = useState({
       skill_level: 0,
       number_of_players: 0,
       title: "",
       maker: "",
       game_type_id: 0
   })

   /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
   useEffect(() => {
       getGameTypes()
   }, [])

   const handleUserInput = (event) => {
       const newGameState = {...currentGame}
       newGameState[event.target.name] = event.target.value
       setCurrentGame(newGameState)
   }

   const handleSaveGame = (event) => {
       // Prevent form from being submitted
       event.preventDefault()

       const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: parseInt(currentGame.skill_level),
            game_type_id: parseInt(currentGame.game_type_id)
        }
        // Send POST request to your API
        createGame(game)
            .then(() => history.push("/games"))
   }

   return (
    <form className="gameForm">
        <h2 className="gameForm__title">Register New Game</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" required autoFocus className="form-control"
                    value={currentGame.title}
                    onChange={handleUserInput}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Maker: </label>
                <input type="text" name="maker" required autoFocus className="form-control"
                    value={currentGame.maker}
                    onChange={handleUserInput}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Number of Players: </label>
                <select name="number_of_players" required autoFocus className="form-control" value={currentGame.number_of_players} onChange={handleUserInput}>
                    <option value="0">How many can play?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Skill Level: </label>
                <select name="skill_level" required autoFocus className="form-control" value={currentGame.skill_level} onChange={handleUserInput}>
                    <option value="0">Choose skill level</option>
                    <option value="1">1 -really easy</option>
                    <option value="2">2 -pretty easy</option>
                    <option value="3">3 -moderate</option>
                    <option value="4">4 -make you sweat</option>
                    <option value="5">5 -what are you thinking?</option>
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Type of Game: </label>
                <select name="game_type_id" required autoFocus className="form-control" value={currentGame.game_type_id} onChange={handleUserInput}>
                <option value="0">Select a Game Type</option>
                    {gameTypes.map((game_type) => (
                    <option key={game_type.id} value={game_type.id}>
                        {game_type.label}
                    </option>
                    ))}
                </select>
        
            </div>
        </fieldset>

        

        <button type="submit"
            onClick={handleSaveGame}
            className="btn btn-primary">Create</button>
    </form>
)
}