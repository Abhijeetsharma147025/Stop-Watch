import { useState, useEffect, useRef } from 'react';
import './CounterTimer.css';

const CounterTimer = () => {
    const [time, setTime] = useState(0);
    const [isActive, setActive] = useState(false);
    const [isPause, setPause] = useState(false);
    const intervalRef = useRef(null);

    const handleInput = (event) => {
        setTime(parseInt(event.target.value * 60));
    };

    const formatTime = () => {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    const handleStart = () => {
        setActive(true);
        setPause(false);
    };

    const handlePause = () => {
        setPause((prevPause) => !prevPause);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setActive(false);
        setPause(false);
        setTime(0);
    };

    useEffect(() => {
        if (isActive && !isPause && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(intervalRef.current);
            if (isActive) {
                setActive(false);
                alert('Time is up');
            }
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, isPause, time]);

    return (
        <div className="countdown-timer">
            <h1>Countdown Timer</h1>
            <div className="timer-display">
                <input
                    type="number"
                    placeholder="Enter time in minutes"
                    onChange={handleInput}
                    disabled={isActive}
                />
                <div>{formatTime()}</div>
            </div>
            <div className="timer-controls">
                <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
                <button onClick={handlePause} disabled={!isActive || time === 0}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default CounterTimer;
