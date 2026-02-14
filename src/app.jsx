import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div>
    <main>App components go here</main>

    <footer className="container-fluid text-center py-3 bg-dark text-white-50">
        <p className="mb-1"> Created by Ethan Collier </p>
        <p className="small">
            View my GitHub repository here:
            <a href="https://github.com/trobarg/startup">Intuassist on GitHub</a>
        </p>
    </footer>
    </div>;
}