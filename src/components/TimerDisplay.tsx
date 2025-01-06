import { formatTime } from '../utils/timeUtils';
import { BlindLevel } from '../types/timer';

interface TimerDisplayProps {
  timeLeft: number;
  currentLevel: number;
  levels: BlindLevel[];
}

export default function TimerDisplay({ timeLeft, currentLevel, levels }: TimerDisplayProps) {
  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-bold mb-4 font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="text-2xl text-gray-300 mb-2">
        Blinds: {levels[currentLevel].smallBlind}/{levels[currentLevel].bigBlind}
      </div>
      {currentLevel < levels.length - 1 && (
        <div className="text-sm text-gray-400">
          Next: {levels[currentLevel + 1].smallBlind}/{levels[currentLevel + 1].bigBlind}
        </div>
      )}
    </div>
  );
}