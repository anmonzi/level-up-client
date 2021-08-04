import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { EventList } from "./game/EventList"
import { EventProvider } from "./game/EventProvider"
import { GameForm } from "./game/GameForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
            </EventProvider>

        </main>
    </>
}
