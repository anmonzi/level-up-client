import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/games">Games</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="navbar__item">
            <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        
        </ul>
    )
}
