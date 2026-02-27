import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function Home() {
    const { user, logout } = useApp();
    const navigate = useNavigate();

    return (
        <div className="bg-light text-dark d-flex flex-column flex-fill">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <img src="/Flag_of_Germany.png" alt="Flag of Germany" className="img-fluid mb-2" style={{ maxHeight: '100px', width: 'auto' }} />
                <h1 className="display-4">Intuassist</h1>
                <p className="lead text-muted">Learn German Noun Genders</p>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                    <div className="navbar-nav d-flex flex-row gap-2">
                        {user ? (
                            <>
                                <NavLink className="btn btn-sm btn-dark" to="/profile">My Profile</NavLink>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => { logout(); navigate('/login'); }}
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink className="btn btn-sm btn-outline-primary" to="/login">Log In</NavLink>
                                <NavLink className="btn btn-sm btn-outline-primary" to="/signup">Sign Up</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="container flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="py-8 text-center main-centered-content">
                    <NavLink to="/practice" id="start-btn" className="btn btn-primary btn-lg p-3 shadow-lg fs-1">Start Practicing!</NavLink>
                    <div className="mt-4">
                        <NavLink to="/info" className="btn btn-outline-secondary">Noun gender help & rules</NavLink>
                    </div>
                </div>
            </main>
        </div>
    );
}