import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="bg-light text-dark">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <img src="/Flag_of_Germany.png" alt="Flag of Germany" className="img-fluid mb-2" style={{ maxHeight: '100px', width: 'auto' }} />
                <h1 className="display-4">Intuassist</h1>
                <p className="lead text-muted">Learn German Noun Genders</p>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-nav me-auto">
                            <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                        </div>
                        <div className="navbar-nav d-flex flex-row gap-2">
                            <NavLink className="btn btn-sm btn-outline-primary" to="/login">Log in</NavLink>
                            <NavLink className="btn btn-sm btn-outline-primary" to="/signup">Sign up</NavLink>
                            <NavLink className="btn btn-sm btn-dark" to="/profile">My Profile</NavLink>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="py-8 my-auto text-center main-action-area">
                    <button id="start-btn" className="btn btn-primary btn-lg p-3 shadow-lg fs-1" onClick={() => navigate("/practice")}>Start Practicing!</button>
                    <div className="mt-4">
                        <button className="btn btn-outline-secondary" onClick={() => navigate("/info")}>Noun gender help & rules</button>
                    </div>
                </div>
            </main>
        </div>
    );
}