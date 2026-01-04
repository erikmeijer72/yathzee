import { CategoryDef } from './types';

export const CATEGORIES: CategoryDef[] = [
  // Upper Section
  { id: 'ones', label: 'Enen', section: 'upper', description: 'Tel alleen de enen' },
  { id: 'twos', label: 'Tweeën', section: 'upper', description: 'Tel alleen de tweeën' },
  { id: 'threes', label: 'Drieën', section: 'upper', description: 'Tel alleen de drieën' },
  { id: 'fours', label: 'Vieren', section: 'upper', description: 'Tel alleen de vieren' },
  { id: 'fives', label: 'Vijven', section: 'upper', description: 'Tel alleen de vijven' },
  { id: 'sixes', label: 'Zessen', section: 'upper', description: 'Tel alleen de zessen' },
  
  // Lower Section
  { id: 'threeOfAKind', label: '3 Gelijke', section: 'lower', description: 'Totaal van alle stenen' },
  { id: 'fourOfAKind', label: 'Carré', section: 'lower', description: 'Totaal van alle stenen' },
  { id: 'fullHouse', label: 'Full House', section: 'lower', fixedScore: 25 },
  { id: 'smallStraight', label: 'Kl. Straat', section: 'lower', fixedScore: 30 },
  { id: 'largeStraight', label: 'Gr. Straat', section: 'lower', fixedScore: 40 },
  { id: 'yahtzee', label: 'Yahtzee', section: 'lower', fixedScore: 50 },
  { id: 'chance', label: 'Kans', section: 'lower', description: 'Totaal van alle stenen' },
];

export const INITIAL_PLAYERS = [
  { id: 0, name: 'Speler 1', scores: {} as any },
  { id: 1, name: 'Speler 2', scores: {} as any },
];
