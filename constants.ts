import { CategoryDef } from './types';

export const CATEGORIES: CategoryDef[] = [
  // Upper Section
  { id: 'ones', label: 'Enen', section: 'upper', dieValue: 1, description: 'Max 5 punten' },
  { id: 'twos', label: 'Tweeën', section: 'upper', dieValue: 2, description: 'Max 10 punten' },
  { id: 'threes', label: 'Drieën', section: 'upper', dieValue: 3, description: 'Max 15 punten' },
  { id: 'fours', label: 'Vieren', section: 'upper', dieValue: 4, description: 'Max 20 punten' },
  { id: 'fives', label: 'Vijven', section: 'upper', dieValue: 5, description: 'Max 25 punten' },
  { id: 'sixes', label: 'Zessen', section: 'upper', dieValue: 6, description: 'Max 30 punten' },
  
  // Lower Section
  { id: 'threeOfAKind', label: '3 Gelijke', section: 'lower', description: 'Totaal van alle stenen' },
  { id: 'fourOfAKind', label: 'Carré', section: 'lower', description: 'Totaal van alle stenen' },
  { id: 'fullHouse', label: 'Full House', section: 'lower', fixedScore: 25, description: '25 punten' },
  { id: 'smallStraight', label: 'Kl. Straat', section: 'lower', fixedScore: 30, description: '30 punten' },
  { id: 'largeStraight', label: 'Gr. Straat', section: 'lower', fixedScore: 40, description: '40 punten' },
  { id: 'yahtzee', label: 'Yahtzee', section: 'lower', fixedScore: 50, description: '50 punten' },
  { id: 'chance', label: 'Kans', section: 'lower', description: 'Totaal van alle stenen' },
];

export const INITIAL_PLAYERS = [
  { id: 0, name: 'Speler 1', scores: {} as any },
  { id: 1, name: 'Speler 2', scores: {} as any },
];