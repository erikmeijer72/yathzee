export type CategoryId = 
  | 'ones' 
  | 'twos' 
  | 'threes' 
  | 'fours' 
  | 'fives' 
  | 'sixes'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'largeStraight'
  | 'yahtzee'
  | 'chance';

export interface CategoryDef {
  id: CategoryId;
  label: string;
  section: 'upper' | 'lower';
  description?: string;
  fixedScore?: number; // Hint for fixed score categories
}

export interface Player {
  id: number;
  name: string;
  scores: Record<CategoryId, number | null>;
}

export interface GameState {
  players: Player[];
}
