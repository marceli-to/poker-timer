import { useState } from 'react';
import { GameSettings } from '../types/timer';
import { Save, X } from 'lucide-react';

interface GameSettingsModalProps {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onClose: () => void;
}

export default function GameSettingsModal({ settings, onSave, onClose }: GameSettingsModalProps) {
  const [editedSettings, setEditedSettings] = useState<GameSettings>(settings);

  const handleSave = () => {
    onSave(editedSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Game Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Number of Players</label>
            <input
              type="number"
              value={editedSettings.numberOfPlayers}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                numberOfPlayers: Math.max(2, parseInt(e.target.value) || 2)
              })}
              className="w-full bg-gray-700 rounded p-2 text-white"
              min="2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Entry Fee ($)</label>
            <input
              type="number"
              value={editedSettings.entryFee}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                entryFee: Math.max(0, parseInt(e.target.value) || 0)
              })}
              className="w-full bg-gray-700 rounded p-2 text-white"
              min="0"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Starting Stack</label>
            <input
              type="number"
              value={editedSettings.startingStack}
              onChange={(e) => setEditedSettings({
                ...editedSettings,
                startingStack: Math.max(1, parseInt(e.target.value) || 1)
              })}
              className="w-full bg-gray-700 rounded p-2 text-white"
              min="1"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}