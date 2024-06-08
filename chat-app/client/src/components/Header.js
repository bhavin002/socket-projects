import React from 'react'
import "../style/Header.css";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-dark text-light py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h1>Chatapp</h1>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end pt-3">
                        <NavLink to="/visitor" className="headerLink mx-3">Visitors</NavLink>
                        <NavLink to="/publicchat" className="headerLink mx-3">Public Chat</NavLink>
                        <NavLink to="/roomchat" className="headerLink mx-3">Room Chat</NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;