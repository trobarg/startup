import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/profile');
    };
    return (
        <div className="bg-light text-dark min-vh-100 d-flex flex-column">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <h1 className="display-6">Sign up for Intuassist</h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <div className="main-action-area p-4 bg-white shadow rounded" style={{ maxWidth: '400px', width: '100%' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>
                        
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">
                                Username <span className="text-muted small">(optional)</span>
                            </label>
                            <input type="text" className="form-control" id="username" name="username" />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" required />
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm-password" name="confirm_password" required />
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="mb-3 small">
                            Already have an account? <NavLink to="/login" className="text-decoration-none">Log in here.</NavLink>
                        </p>
                        <p className="mb-0 x-small text-muted" style={{ fontSize: '0.75rem' }}>
                            Note: We may use <a href="https://www.heybounce.io/" className="text-decoration-none" target="_blank" rel="noopener noreferrer">heybounce</a> to verify your email.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}