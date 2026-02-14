import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    App will display here

    <footer class="container-fluid text-center py-3 bg-dark text-white-50">
        <p class="mb-1"> Created by Ethan Collier </p>
        <p class="small">
            View my GitHub repository here:
            <a href="https://github.com/trobarg/startup">Intuassist on GitHub</a>
        </p>
    </footer>
    </div>;
}