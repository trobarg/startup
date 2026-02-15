import React from 'react';
import { NavLink } from 'react-router-dom';

export function Info() {
    return (
        <div className="bg-light text-dark min-vh-100 d-flex flex-column">
            <header className="container-fluid text-center py-3 bg-white border-bottom">
                <h1 className="display-6">Noun Gender Help</h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                    <div className="navbar-nav">
                        <NavLink to="/practice" className="btn btn-sm btn-primary">Return to Practice</NavLink>
                    </div>
                </div>
            </nav>

            <main className="container py-5 flex-grow-1">
                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                    
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h2 className="h5 fw-bold">Typically "Der" (Masculine) Endings:</h2>
                                    <p className="fs-5 font-monospace mb-0">-ant, -ast, -ich, -ig, -ismus, -ling, -or, -us</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h2 className="h5 fw-bold">Typically "Die" (Feminine) Endings:</h2>
                                    <p className="fs-5 font-monospace mb-0">-a, -ei, -enz, -heit, -ie, -ik, -in, -keit, -schaft, -sion, -tät, -tion, -ung, -ur</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h2 className="h5 fw-bold">Typically "Das" (Neuter) Endings:</h2>
                                    <p className="fs-5 font-monospace mb-0">-chen, -lein, -ma, -ment, -sel, -tel, -tum, -um</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}