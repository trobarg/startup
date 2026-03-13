import { createContext, useContext, useState, useEffect, useRef } from 'react';

const DEFAULT_SETTINGS = { datasetSize: 1000, advanceDelay: 1 };
const DEFAULT_STATS    = { totalNouns: 0, correctAnswers: 0 };

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [user, setUser]         = useState(null);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [stats, setStats]       = useState(DEFAULT_STATS);
    const [loading, setLoading]   = useState(true);

    // Refs so sync functions always read the latest values without stale closures
    const userRef        = useRef(user);
    const settingsRef    = useRef(settings);
    const pendingDelta   = useRef({ nounsDelta: 0, correctDelta: 0 });

    useEffect(() => { userRef.current     = user;     }, [user]);
    useEffect(() => { settingsRef.current = settings; }, [settings]);

    // Restore session on page load
    useEffect(() => {
        fetch('/api/user')
            .then((res) => (res.ok ? res.json() : null))
            .then(async (userData) => {
                if (userData) {
                    setUser(userData);
                    const [s, st] = await Promise.all([
                        fetch('/api/user/settings').then((r) => r.json()),
                        fetch('/api/user/stats').then((r) => r.json()),
                    ]);
                    setSettings(s);
                    setStats(st);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    // Flush any unsaved data if the user closes or refreshes the tab
    useEffect(() => {
        const handleUnload = () => {
            if (!userRef.current) return;
            const delta = pendingDelta.current;
            if (delta.nounsDelta > 0) {
                navigator.sendBeacon(
                    '/api/user/stats/record',
                    new Blob([JSON.stringify(delta)], { type: 'application/json' })
                );
                pendingDelta.current = { nounsDelta: 0, correctDelta: 0 };
            }
            navigator.sendBeacon(
                '/api/user/settings',
                new Blob([JSON.stringify(settingsRef.current)], { type: 'application/json' })
            );
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    async function signup(email, username, password) {
        const res = await fetch('/api/auth/create', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, username, password }),
        });
        if (res.status === 409) return { ok: false, error: 'Email already registered' };
        if (!res.ok)            return { ok: false, error: 'Signup failed' };

        const userData = await res.json();
        setUser(userData);
        setSettings(DEFAULT_SETTINGS);
        setStats(DEFAULT_STATS);
        pendingDelta.current = { nounsDelta: 0, correctDelta: 0 };
        return { ok: true };
    }

    async function login(identifier, password) {
        const res = await fetch('/api/auth/login', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ identifier, password }),
        });
        if (!res.ok) return { ok: false, error: 'Invalid username/email or password' };

        const userData = await res.json();
        setUser(userData);
        const [s, st] = await Promise.all([
            fetch('/api/user/settings').then((r) => r.json()),
            fetch('/api/user/stats').then((r) => r.json()),
        ]);
        setSettings(s);
        setStats(st);
        pendingDelta.current = { nounsDelta: 0, correctDelta: 0 };
        return { ok: true };
    }

    async function logout() {
        await syncStats();
        await syncSettings();
        await fetch('/api/auth/logout', { method: 'DELETE' });
        setUser(null);
        setSettings(DEFAULT_SETTINGS);
        setStats(DEFAULT_STATS);
        pendingDelta.current = { nounsDelta: 0, correctDelta: 0 };
    }

    // Local-only — no backend call. Accumulates a delta for the next sync.
    function recordAnswer(isCorrect) {
        pendingDelta.current.nounsDelta  += 1;
        pendingDelta.current.correctDelta += isCorrect ? 1 : 0;
        setStats((prev) => ({
            totalNouns:     prev.totalNouns + 1,
            correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        }));
    }

    // Local-only — no backend call until sync.
    function saveSettings(newSettings) {
        setSettings(newSettings);
        settingsRef.current = newSettings;
    }

    async function syncStats() {
        const delta = pendingDelta.current;
        if (!userRef.current || delta.nounsDelta === 0) return;
        pendingDelta.current = { nounsDelta: 0, correctDelta: 0 };
        await fetch('/api/user/stats/record', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(delta),
        });
    }

    async function syncSettings() {
        if (!userRef.current) return;
        await fetch('/api/user/settings', {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(settingsRef.current),
        });
    }

    return (
        <AppContext.Provider value={{
            user, login, signup, logout,
            settings, saveSettings, syncSettings,
            stats, recordAnswer, syncStats,
            loading,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
