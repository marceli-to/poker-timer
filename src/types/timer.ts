export interface BlindLevel {
  smallBlind: number;
  bigBlind: number;
  duration: number;
}

export interface TimerSettingsProps {
  levels: BlindLevel[];
  onSave: (levels: BlindLevel[]) => void;
  onClose: () => void;
}

export interface GameSettings {
  numberOfPlayers: number;
  entryFee: number;
  startingStack: number;
}

export interface GameSettingsProps {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onClose: () => void;
}