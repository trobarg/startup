import React from 'react';
import { NavLink } from 'react-router-dom';

export function Profile() {
    return (
        <div className="bg-light text-dark d-flex flex-column flex-fill">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <h1 className="display-6">My Intuassist Profile</h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container py-5 flex-grow-1">
                <div className="row g-4 justify-content-center">
                    
                    {/* Account and Stats Column */}
                    <div className="col-md-5">
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-white fw-bold">Account Info</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="text-muted small text-uppercase fw-semibold">Username</span>
                                    <span>anonymous</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="text-muted small text-uppercase fw-semibold">Email</span>
                                    <span>anonymous@example.com</span>
                                </li>
                                <li className="list-group-item bg-light text-center py-3">
                                    <NavLink to="/login" className="btn btn-outline-danger btn-sm w-100">
                                        Log Out
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title mb-3 small">Lifetime Stats</h5>
                                <div className="row">
                                    <div className="col">
                                        <div className="h3 mb-0">685</div>
                                        <div className="small text-muted">Nouns</div>
                                    </div>
                                    <div className="col border-start">
                                        <div className="h3 mb-0 text-success">43.2%</div>
                                        <div className="small text-muted">Accuracy</div>
                                    </div>
                                </div>
                                <NavLink to="/practice" className="btn btn-primary w-100 mt-4">Start Practicing!</NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Settings Column */}
                    <div className="col-md-5">
                        <div className="card shadow-sm p-4 h-100">
                            <h5 className="mb-4 border-bottom pb-2 fw-bold">Practice Settings</h5>
                            
                            <div className="mb-4">
                                <label htmlFor="nouns" className="form-label d-flex justify-content-between">
                                    Noun Dataset Size <span className="badge bg-light text-dark border">100 - 10,000</span>
                                </label>
                                <input type="range" className="form-range" id="nouns" name="nouns" min="100" max="10000" defaultValue="1000" step="100"/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="delay" className="form-label d-flex justify-content-between">
                                    Advance Delay <span className="badge bg-light text-dark border">0.1 - 5s</span>
                                </label>
                                <input type="range" className="form-range" id="delay" name="delay" min="0.1" max="5" defaultValue="1" step="0.1"/>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}