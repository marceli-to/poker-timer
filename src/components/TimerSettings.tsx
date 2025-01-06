import { useState } from 'react';
import { BlindLevel, TimerSettingsProps } from '../types/timer';
import { Trash2, Plus } from 'lucide-react';

export default function TimerSettings({ levels, onSave, onClose }: TimerSettingsProps) {
  const [editedLevels, setEditedLevels] = useState<BlindLevel[]>(levels);

  const updateLevel = (index: number, field: keyof BlindLevel, value: number) => {
    const newLevels = [...editedLevels];
    newLevels[index] = { ...newLevels[index], [field]: value };
    setEditedLevels(newLevels);
  };

  const addLevel = () => {
    const lastLevel = editedLevels[editedLevels.length - 1];
    const newLevel = {
      smallBlind: lastLevel.smallBlind * 2,
      bigBlind: lastLevel.bigBlind * 2,
      duration: lastLevel.duration,
    };
    setEditedLevels([...editedLevels, newLevel]);
  };

  const removeLevel = (index: number) => {
    if (editedLevels.length > 1) {
      setEditedLevels(editedLevels.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    onSave(editedLevels);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Blind Levels Settings</h2>
        
        <div className="space-y-4">
          {editedLevels.map((level, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center">
              <div>
                <label className="text-sm text-gray-400">Small Blind</label>
                <input
                  type="number"
                  value={level.smallBlind}
                  onChange={(e) => updateLevel(index, 'smallBlind', parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  min="1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Big Blind</label>
                <input
                  type="number"
                  value={level.bigBlind}
                  onChange={(e) => updateLevel(index, 'bigBlind', parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  min="2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Duration (min)</label>
                <input
                  type="number"
                  value={level.duration / 60}
                  onChange={(e) => updateLevel(index, 'duration', (parseInt(e.target.value) || 1) * 60)}
                  className="w-full bg-gray-700 rounded p-2 text-white"
                  min="1"
                />
              </div>
              <button
                onClick={() => removeLevel(index)}
                className="mt-6 p-2 text-red-400 hover:text-red-300"
                disabled={editedLevels.length === 1}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={addLevel}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            <Plus size={20} />
            Add Level
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}