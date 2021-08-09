import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { EventList } from "./event/EventList"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"


export const ApplicationViews = () => {
    return <>
        <main>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>

                <Route exact path="/games/:gameId(\d+)/edit">
                    <GameForm />
                </Route>
            </GameProvider>

            <EventProvider>
                <GameProvider>
                    <ProfileProvider>
                        <Route exact path="/events">
                            <EventList />
                        </Route>

                        <Route exact path="/events/new">
                            <EventForm />
                        </Route>

                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </ProfileProvider>
                </GameProvider>
            </EventProvider>

        </main>
    </>
}
