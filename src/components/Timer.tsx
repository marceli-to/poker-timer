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
    { smallBlind: 100, bigBlind: 200, duration: 1200 },
    { smallBlind: 150, bigBlind: 300, duration: 1200 },
    { smallBlind: 200, bigBlind: 400, duration: 1200 },
    { smallBlind: 300, bigBlind: 600, duration: 1200 },
    { smallBlind: 400, bigBlind: 800, duration: 1200 },
    { smallBlind: 500, bigBlind: 1000, duration: 1200 },
  ];

  const defaultGameSettings: GameSettings = {
    numberOfPlayers: 6,
    activePlayers: 6,
    entryFee: 10,
    startingStack: 10000,
  };

  const [levels, setLevels] = useState<BlindLevel[]>(defaultLevels);
  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultGameSettings);
  const [activePlayers, setActivePlayers] = useState(gameSettings.numberOfPlayers);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentLevel < levels.length - 1 && !isRunning) {
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

  const handleSaveGameSettings = (newSettings: GameSettings) => {
    setGameSettings(newSettings);
    setActivePlayers(newSettings.numberOfPlayers);
  };

  const calculateAverageStack = () => {
    return gameSettings.startingStack * gameSettings.numberOfPlayers / activePlayers;
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col justify-center">
      <div className="sm:max-w-3xl sm:mx-auto">
        <div className="">
          <div className="text-center">
            <h1 className="text-3xl mb-2">Level {currentLevel + 1} of {levels.length}</h1>
          </div>

          {/* <div className="relative h-4 bg-gray-700 rounded-full mb-8 overflow-hidden">
            <div 
              className="absolute h-full bg-orange-500 transition-all duration-1000"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div> */}

          <TimerDisplay
            timeLeft={timeLeft}
            currentLevel={currentLevel}
            levels={levels}
          />

          <GameInfo 
            settings={gameSettings}
            currentLevel={currentLevel}
            timeLeft={timeLeft}
            activePlayers={activePlayers}
            averageStack={calculateAverageStack()}
          />

          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className="bg-orange-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors"
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
            <button
              onClick={handleFullscreen}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full transition-colors"
            >
              Fullscreen
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
          onSave={handleSaveGameSettings}
          onClose={() => setShowGameSettings(false)}
        />
      )}
    </div>
  );
}