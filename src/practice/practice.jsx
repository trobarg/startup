import React from 'react';
import { NavLink } from 'react-router-dom';

export function Practice() {
    const nounCount = 0;
    const currentWord = "Fahrrad";

    return (
        <div className="bg-light text-dark d-flex flex-column flex-fill">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <h1 className="display-6">Intuassist Practice</h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                    <div className="navbar-nav d-flex flex-row gap-2">
                        <NavLink className="btn btn-sm btn-dark" to="/profile">My Profile</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
                <div className="main-centered-content">
                    <div className="mb-4">
                        <p>Nouns so far this session: {nounCount}</p>
                    </div>

                    <div className="word-display">
                        <h2 className="display-1 fw-bold mb-4">{currentWord}</h2>
                    </div>

                    <div className="d-flex gap-3 justify-content-center mb-5">
                        <button type="button" id="masculine-btn" className="btn btn-lg shadow-sm px-4 fs-3 text-white">der</button>
                        <button type="button" id="feminine-btn" className="btn btn-lg shadow-sm px-4 fs-3 text-white">die</button>
                        <button type="button" id="neuter-btn" className="btn btn-lg shadow-sm px-4 fs-3 text-white">das</button>
                    </div>

                    <div className="alert alert-light border mb-4">
                        <small className="text-muted">2 other users practicing right now!</small>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <NavLink to="/info" className="btn btn-sm btn-outline-secondary">Noun gender help</NavLink>
                    <NavLink to="/" className="btn btn-sm btn-outline-danger">Quit Session</NavLink>
                </div>
            </main>
        </div>
    );
}