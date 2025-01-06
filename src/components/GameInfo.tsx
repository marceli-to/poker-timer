import { GameSettings } from '../types/timer';

interface GameInfoProps {
  settings: GameSettings;
  currentLevel: number;
  timeLeft: number;
}

export default function GameInfo({ settings, currentLevel }: GameInfoProps) {
  const totalChips = settings.numberOfPlayers * settings.startingStack;
  const averageStack = Math.round(totalChips / settings.numberOfPlayers);
  const totalPrizePool = settings.numberOfPlayers * settings.entryFee;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400">Players</h3>
        <p className="text-xl font-bold">{settings.numberOfPlayers}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400">Prize Pool</h3>
        <p className="text-xl font-bold">${totalPrizePool}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400">Starting Stack</h3>
        <p className="text-xl font-bold">{settings.startingStack}</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400">Average Stack</h3>
        <p className="text-xl font-bold">{averageStack}</p>
      </div>
    </div>
  );
}