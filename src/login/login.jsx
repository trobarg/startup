import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/profile');
    };
    return (
        <div className="bg-light text-dark d-flex flex-column flex-fill">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <h1 className="display-6">Log in to Intuassist</h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <div className="main-centered-content p-4 bg-white shadow rounded" style={{ maxWidth: '400px', width: '100%' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="identifying" className="form-label">Username or email</label>
                            <input type="text" className="form-control" id="identifying" name="identifying" required/>
                        </div>
                        <div className="mb-3 text-start">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                            <input type="password" className="form-control" id="password" name="password" required/>
                        </div>
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="mb-0 small">
                            Don't have an account? <NavLink to="/signup" className="text-decoration-none">Sign up here.</NavLink>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}