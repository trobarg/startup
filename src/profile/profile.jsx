import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function Profile() {
    const navigate = useNavigate();
    const { user, logout, settings, saveSettings, stats } = useApp();

    const accuracy = stats.totalNouns === 0
        ? '—'
        : `${((stats.correctAnswers / stats.totalNouns) * 100).toFixed(1)}%`;

    if (!user) {
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
                <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
                    <h4 className="mb-3">Please log in to view your profile.</h4>
                    <div className="d-flex gap-2">
                        <NavLink to="/login" className="btn btn-primary">Log In</NavLink>
                        <NavLink to="/signup" className="btn btn-outline-primary">Sign Up</NavLink>
                    </div>
                </main>
            </div>
        );
    }

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
                                    <span>{user.username}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span className="text-muted small text-uppercase fw-semibold">Email</span>
                                    <span>{user.email}</span>
                                </li>
                                <li className="list-group-item bg-light text-center py-3">
                                    <button
                                        className="btn btn-outline-danger btn-sm w-100"
                                        onClick={() => { logout(); navigate('/login'); }}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title mb-3 small">Lifetime Stats</h5>
                                <div className="row">
                                    <div className="col">
                                        <div className="h3 mb-0">{stats.totalNouns}</div>
                                        <div className="small text-muted">Nouns</div>
                                    </div>
                                    <div className="col border-start">
                                        <div className="h3 mb-0 text-success">{accuracy}</div>
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
                                    Noun Dataset Size
                                    <span className="badge bg-light text-dark border">{settings.datasetSize} nouns</span>
                                </label>
                                <input
                                    type="range"
                                    className="form-range"
                                    id="nouns"
                                    name="nouns"
                                    min="100"
                                    max="10000"
                                    step="100"
                                    value={settings.datasetSize}
                                    onChange={(e) => saveSettings({ ...settings, datasetSize: Number(e.target.value) })}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="delay" className="form-label d-flex justify-content-between">
                                    Advance Delay
                                    <span className="badge bg-light text-dark border">{settings.advanceDelay}s</span>
                                </label>
                                <input
                                    type="range"
                                    className="form-range"
                                    id="delay"
                                    name="delay"
                                    min="0.1"
                                    max="5"
                                    step="0.1"
                                    value={settings.advanceDelay}
                                    onChange={(e) => saveSettings({ ...settings, advanceDelay: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
