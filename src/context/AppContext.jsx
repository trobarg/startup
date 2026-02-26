import React, { createContext, useContext, useState } from 'react';

const LS_USERS    = 'intuassist_users';
const LS_SESSION  = 'intuassist_session';
const LS_SETTINGS = (username) => `intuassist_settings_${username}`;
const LS_STATS    = (username) => `intuassist_stats_${username}`;

const DEFAULT_SETTINGS = { datasetSize: 1000, advanceDelay: 1 };
const DEFAULT_STATS    = { totalNouns: 0, correctAnswers: 0 };

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [user, setUser] = useState(() => readJSON(LS_SESSION, null));

    const [settings, setSettings] = useState(() => {
        const session = readJSON(LS_SESSION, null);
        if (session) return readJSON(LS_SETTINGS(session.username), DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
    });

    const [stats, setStats] = useState(() => {
        const session = readJSON(LS_SESSION, null);
        if (session) return readJSON(LS_STATS(session.username), DEFAULT_STATS);
        return DEFAULT_STATS;
    });

    function signup(email, username, password) {
        const users = readJSON(LS_USERS, []);
        if (users.some((u) => u.email === email)) {
            return { ok: false, error: 'Email already registered' };
        }
        const finalUsername = username.trim() || email.split('@')[0];
        const newUser = { username: finalUsername, email, password };
        writeJSON(LS_USERS, [...users, newUser]);
        const session = { username: finalUsername, email };
        writeJSON(LS_SESSION, session);
        setUser(session);
        setSettings(DEFAULT_SETTINGS);
        setStats(DEFAULT_STATS);
        return { ok: true };
    }

    function login(identifier, password) {
        const users = readJSON(LS_USERS, []);
        const found = users.find(
            (u) =>
                (u.username === identifier || u.email === identifier) &&
                u.password === password
        );
        if (!found) {
            return { ok: false, error: 'Invalid username/email or password' };
        }
        const session = { username: found.username, email: found.email };
        writeJSON(LS_SESSION, session);
        setUser(session);
        setSettings(readJSON(LS_SETTINGS(found.username), DEFAULT_SETTINGS));
        setStats(readJSON(LS_STATS(found.username), DEFAULT_STATS));
        return { ok: true };
    }

    function logout() {
        localStorage.removeItem(LS_SESSION);
        setUser(null);
        setSettings(DEFAULT_SETTINGS);
        setStats(DEFAULT_STATS);
    }

    function saveSettings(newSettings) {
        setSettings(newSettings);
        if (user) {
            writeJSON(LS_SETTINGS(user.username), newSettings);
        }
    }

    function recordAnswer(isCorrect) {
        setStats((prev) => {
            const newStats = {
                totalNouns: prev.totalNouns + 1,
                correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
            };
            if (user) {
                writeJSON(LS_STATS(user.username), newStats);
            }
            return newStats;
        });
    }

    return (
        <AppContext.Provider value={{ user, login, signup, logout, settings, saveSettings, stats, recordAnswer }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
