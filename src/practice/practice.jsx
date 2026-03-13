import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { NOUNS } from '../data/nouns';

function buildPool(datasetSize, allNouns) {
    // Divide by 20 to scale the slider range to the actual noun count
    const effectiveSize = Math.floor(datasetSize / 20);
    const cap = Math.min(Math.max(effectiveSize, 1), allNouns.length);
    const copy = [...allNouns];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, cap);
}

export function Practice() {
    const { user, settings, recordAnswer, syncStats } = useApp();

    // Flush accumulated stats when the user navigates away
    useEffect(() => { return () => { syncStats(); }; }, []);

    const [pool, setPool] = useState([]);
    const [poolIndex, setPoolIndex] = useState(0);
    const [nounCount, setNounCount] = useState(0);
    // feedback: null | { correct: 'der'|'die'|'das', clicked: 'der'|'die'|'das' }
    const [feedback, setFeedback] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    useEffect(() => {
        setPool(buildPool(settings.datasetSize, NOUNS));
        setPoolIndex(0);
    }, []);

    const currentNoun = pool.length > 0 ? pool[poolIndex] : null;

    function getButtonClass(gender) {
        if (!feedback) return '';
        if (gender === feedback.correct) return 'feedback-correct';
        if (gender === feedback.clicked) return 'feedback-wrong';
        return 'feedback-dim';
    }

    function handleAnswer(clickedGender) {
        if (buttonsDisabled || !currentNoun) return;

        const isCorrect = clickedGender === currentNoun.gender;
        setButtonsDisabled(true);
        setFeedback({ correct: currentNoun.gender, clicked: clickedGender });
        if (user) recordAnswer(isCorrect);
        setNounCount((n) => n + 1);

        setTimeout(() => {
            const nextIndex = poolIndex + 1;
            if (nextIndex >= pool.length) {
                setPool(buildPool(settings.datasetSize, NOUNS));
                setPoolIndex(0);
            } else {
                setPoolIndex(nextIndex);
            }
            setFeedback(null);
            setButtonsDisabled(false);
        }, settings.advanceDelay * 1000);
    }

    if (!currentNoun) {
        return (
            <div className="bg-light text-dark d-flex flex-column flex-fill align-items-center justify-content-center">
                <div className="text-center py-5 text-muted">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-light text-dark d-flex flex-column flex-fill">
            <header className="container-fluid text-center py-2 bg-white border-bottom">
                <h1 className="display-6">Intuassist Practice</h1>
            </header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav me-auto">
                        <NavLink className="btn btn-outline-dark btn-sm" to="/">Home</NavLink>
                    </div>
                    <div className="navbar-nav d-flex flex-row gap-2">
                        {user && (
                            <NavLink className="btn btn-sm btn-dark" to="/profile">My Profile</NavLink>
                        )}
                    </div>
                </div>
            </nav>
            <main className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
                <div className="main-centered-content">
                    <div className="mb-4">
                        <p>Nouns so far this session: {nounCount}</p>
                    </div>
                    <div className="word-display">
                        <h2 className="display-1 fw-bold mb-4">{currentNoun.word}</h2>
                    </div>
                    <div className="d-flex gap-3 justify-content-center mb-5">
                        {[
                            { gender: 'der', id: 'masculine-btn' },
                            { gender: 'die', id: 'feminine-btn'  },
                            { gender: 'das', id: 'neuter-btn'    },
                        ].map(({ gender, id }) => (
                            <div key={gender} className="d-flex flex-column align-items-center">
                                <button
                                    type="button"
                                    id={id}
                                    className={`btn btn-lg shadow-sm px-4 fs-3 text-white ${getButtonClass(gender)}`}
                                    onClick={() => handleAnswer(gender)}
                                    disabled={buttonsDisabled}
                                >
                                    {gender}
                                </button>
                                <div className="feedback-indicator mt-2">
                                    {feedback && feedback.correct === gender && (
                                        <span className="feedback-check">✓</span>
                                    )}
                                    {feedback && feedback.clicked === gender && feedback.clicked !== feedback.correct && (
                                        <span className="feedback-x">✗</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="alert alert-light border mb-4">
                        <small className="text-muted">2 other users practicing right now!</small>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <NavLink to="/info" className="btn btn-sm btn-outline-secondary">Noun gender help</NavLink>
                    <NavLink to="/"    className="btn btn-sm btn-outline-danger">Quit Session</NavLink>
                </div>
            </main>
        </div>
    );
}
