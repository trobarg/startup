import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { Practice } from './practice/practice';
import { Info } from './info/info';
import { Home } from './home/home';
import { AppProvider } from './context/AppContext';

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <div className="d-flex flex-column min-vh-100">
                    <div className="flex-grow-1 d-flex flex-column">
                        <Routes>
                            <Route path='/' element={<Home />} exact />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/practice' element={<Practice />} />
                            <Route path='/info' element={<Info />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                    <footer className="container-fluid text-center py-3 bg-dark text-white-50">
                        <p className="mb-1"> Created by Ethan Collier </p>
                        <p className="small">
                            View my GitHub repository here:
                            <a href="https://github.com/trobarg/startup">Intuassist on GitHub</a>
                        </p>
                    </footer>
                </div>
            </BrowserRouter>
        </AppProvider>
    );
}
function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}