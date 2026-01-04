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
  dieValue?: number; // 1-6 for upper section validation
}

export interface Player {
  id: number;
  name: string;
  scores: Record<CategoryId, number | null>;
}

export interface GameState {
  players: Player[];
}