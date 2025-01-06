import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Settings, RefreshCw, Users } from 'lucide-react';
import { BlindLevel, GameSettings } from '../types/timer';
import TimerDisplay from './TimerDisplay';
import TimerSettings from './TimerSettings';
import GameSettingsModal from './GameSettingsModal';
import GameInfo from './GameInfo';

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showGameSettings, setShowGameSettings] = useState(false);

  const defaultLevels: BlindLevel[] = [
    { smallBlind: 10, bigBlind: 20, duration: 900 },
    { smallBlind: 20, bigBlind: 40, duration: 900 },
    { smallBlind: 50, bigBlind: 100, duration: 900 },
    { smallBlind: 100, bigBlind: 200, duration: 900 },
    { smallBlind: 200, bigBlind: 400, duration: 900 },
    { smallBlind: 500, bigBlind: 1000, duration: 900 },
  ];

  const defaultGameSettings: GameSettings = {
    numberOfPlayers: 6,
    entryFee: 50,
    startingStack: 10000,
  };

  const [levels, setLevels] = useState<BlindLevel[]>(defaultLevels);
  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultGameSettings);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentLevel < levels.length - 1) {
      setCurrentLevel((level) => level + 1);
      setTimeLeft(levels[currentLevel + 1].duration);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentLevel, levels]);

  useEffect(() => {
    setTimeLeft(levels[currentLevel].duration);
  }, [currentLevel, levels]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(levels[currentLevel + 1].duration);
    }
  };

  const resetTimer = () => {
    setCurrentLevel(0);
    setTimeLeft(levels[0].duration);
    setIsRunning(false);
  };

  const calculateProgress = () => {
    const totalSeconds = levels[currentLevel].duration;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const handleSaveSettings = (newLevels: BlindLevel[]) => {
    setLevels(newLevels);
    resetTimer();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Poker Timer</h1>
            <p className="text-gray-400">Level {currentLevel + 1} of {levels.length}</p>
          </div>

          <div className="relative h-4 bg-gray-700 rounded-full mb-8 overflow-hidden">
            <div 
              className="absolute h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>

          <TimerDisplay
            timeLeft={timeLeft}
            currentLevel={currentLevel}
            levels={levels}
          />

          <GameInfo 
            settings={gameSettings}
            currentLevel={currentLevel}
            timeLeft={timeLeft}
          />

          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={nextLevel}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
              disabled={currentLevel === levels.length - 1}
            >
              <SkipForward size={24} />
            </button>
            <button
              onClick={resetTimer}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
            >
              <RefreshCw size={24} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
            >
              <Settings size={24} />
            </button>
            <button
              onClick={() => setShowGameSettings(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
            >
              <Users size={24} />
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <TimerSettings
          levels={levels}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showGameSettings && (
        <GameSettingsModal
          settings={gameSettings}
          onSave={setGameSettings}
          onClose={() => setShowGameSettings(false)}
        />
      )}
    </div>
  );
}