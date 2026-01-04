import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, INITIAL_PLAYERS } from './constants';
import { GameState, CategoryId, CategoryDef, Player } from './types';
import { RotateCcw, PenLine, Trophy } from 'lucide-react';
import NameModal from './components/NameModal';

const App: React.FC = () => {
  // Load state from local storage or use default
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('yahtzee_state_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return { players: JSON.parse(JSON.stringify(INITIAL_PLAYERS)) };
  });

  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('yahtzee_state_v1', JSON.stringify(gameState));
  }, [gameState]);

  // Helper to get score safely
  const getScore = (playerIndex: number, categoryId: CategoryId): number => {
    const val = gameState.players[playerIndex].scores[categoryId];
    return val === null || val === undefined ? 0 : val;
  };

  // Helper to check if score is set (for styling)
  const isScoreSet = (playerIndex: number, categoryId: CategoryId): boolean => {
    return gameState.players[playerIndex].scores[categoryId] !== undefined && gameState.players[playerIndex].scores[categoryId] !== null;
  };

  // Calculation Logic
  const calculateTotals = (playerIndex: number) => {
    let upperSum = 0;
    CATEGORIES.filter(c => c.section === 'upper').forEach(c => {
      upperSum += getScore(playerIndex, c.id);
    });

    const bonus = upperSum >= 63 ? 35 : 0;
    const upperTotal = upperSum + bonus;

    let lowerSum = 0;
    CATEGORIES.filter(c => c.section === 'lower').forEach(c => {
      lowerSum += getScore(playerIndex, c.id);
    });

    const grandTotal = upperTotal + lowerSum;

    return { upperSum, bonus, upperTotal, lowerSum, grandTotal };
  };

  const handleScoreChange = (playerIndex: number, categoryId: CategoryId, value: string) => {
    // Basic validation to allow empty string (delete) or numbers
    if (value !== '' && !/^\d+$/.test(value)) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      // Convert to number or null if empty
      const parsedValue = value === '' ? null : parseInt(value, 10);
      
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        scores: {
          ...newPlayers[playerIndex].scores,
          [categoryId]: parsedValue
        }
      };
      return { ...prev, players: newPlayers };
    });
  };

  const resetGame = () => {
    if (confirm('Weet je zeker dat je een nieuw spel wilt starten? Alle scores worden gewist.')) {
      setGameState(prev => ({
        // Keep names, reset scores
        players: prev.players.map(p => ({
            ...p,
            scores: {} as any
        }))
      }));
    }
  };

  const handleNameSave = (newName: string) => {
    if (editingPlayerIndex !== null) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        newPlayers[editingPlayerIndex].name = newName;
        return { ...prev, players: newPlayers };
      });
    }
  };

  const p1Totals = useMemo(() => calculateTotals(0), [gameState.players]);
  const p2Totals = useMemo(() => calculateTotals(1), [gameState.players]);

  return (
    <div className="min-h-screen pb-20 sm:pb-10 max-w-3xl mx-auto bg-white shadow-xl min-w-[350px] relative">
      
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-30">
        {/* Main Header */}
        <header className="bg-teal-600 text-white p-4 sm:p-6 shadow-md relative z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold tracking-tight font-['Montserrat'] leading-none mt-1">
                Yahtzee<span className="font-light">NL</span>
              </h1>
            </div>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 text-xs font-semibold bg-teal-800/40 hover:bg-teal-800/60 px-3 py-2 rounded-full transition-colors border border-teal-500/30"
            >
              <RotateCcw size={14} />
              RESET
            </button>
          </div>
        </header>

        {/* Players Header */}
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 p-3 bg-slate-50 border-b border-slate-200 shadow-sm relative z-10">
          <div className="flex items-end pb-1 text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Categorie
          </div>
          {[0, 1].map(idx => (
            <button 
              key={idx} 
              onClick={() => setEditingPlayerIndex(idx)}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border-2 border-slate-100 shadow-sm active:scale-95 transition-all hover:border-teal-200"
            >
               <div className="flex items-center gap-1 text-teal-600 mb-1 w-full justify-center">
                  <span className="text-xs font-bold truncate max-w-[80px]">{gameState.players[idx].name}</span>
                  <PenLine size={12} className="opacity-50" />
               </div>
               <div className="text-2xl font-bold text-slate-800">
                 {idx === 0 ? p1Totals.grandTotal : p2Totals.grandTotal}
               </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 space-y-8">
        {/* Upper Section Table */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 border-l-4 border-teal-400">Deel 1</h2>
          <div className="space-y-2">
            {CATEGORIES.filter(c => c.section === 'upper').map(cat => (
              <ScoreRow 
                key={cat.id} 
                category={cat} 
                players={gameState.players} 
                onScoreChange={handleScoreChange}
                isSet={isScoreSet}
              />
            ))}
          </div>
          
          {/* Subtotals Upper */}
          <div className="mt-4 grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase">Subtotaal</div>
            <div className="text-center font-mono font-semibold text-slate-600">{p1Totals.upperSum}</div>
            <div className="text-center font-mono font-semibold text-slate-600">{p2Totals.upperSum}</div>

            <div className="text-xs font-bold text-slate-500 uppercase flex flex-col">
              <span>Bonus</span>
              <span className="text-[10px] font-normal text-slate-400">(63+ = 35)</span>
            </div>
            <div className={`text-center font-bold ${p1Totals.bonus > 0 ? 'text-teal-600' : 'text-slate-300'}`}>{p1Totals.bonus}</div>
            <div className={`text-center font-bold ${p2Totals.bonus > 0 ? 'text-teal-600' : 'text-slate-300'}`}>{p2Totals.bonus}</div>
            
            <div className="col-span-3 h-px bg-slate-200 my-1"></div>

            <div className="text-sm font-bold text-slate-700 uppercase">Totaal Deel 1</div>
            <div className="text-center font-bold text-lg text-slate-800">{p1Totals.upperTotal}</div>
            <div className="text-center font-bold text-lg text-slate-800">{p2Totals.upperTotal}</div>
          </div>
        </section>

        {/* Lower Section Table */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 border-l-4 border-orange-400">Deel 2</h2>
          <div className="space-y-2">
            {CATEGORIES.filter(c => c.section === 'lower').map(cat => (
              <ScoreRow 
                key={cat.id} 
                category={cat} 
                players={gameState.players} 
                onScoreChange={handleScoreChange}
                isSet={isScoreSet}
              />
            ))}
          </div>

           {/* Subtotals Lower */}
           <div className="mt-4 grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="text-sm font-bold text-slate-700 uppercase">Totaal Deel 2</div>
            <div className="text-center font-bold text-lg text-slate-800">{p1Totals.lowerSum}</div>
            <div className="text-center font-bold text-lg text-slate-800">{p2Totals.lowerSum}</div>
           </div>
        </section>

        {/* Grand Total Footer */}
        <div className="mt-8 bg-teal-900 rounded-2xl p-6 text-white shadow-xl mb-6">
           <div className="flex items-center justify-center gap-3 mb-6 opacity-80">
             <Trophy size={20} className="text-yellow-400" />
             <span className="uppercase tracking-widest font-bold text-sm">Eindstand</span>
             <Trophy size={20} className="text-yellow-400" />
           </div>
           
           <div className="grid grid-cols-2 gap-8 divide-x divide-teal-800">
             <div className="text-center">
                <div className="text-teal-300 text-sm font-medium mb-1">{gameState.players[0].name}</div>
                <div className="text-5xl font-bold tracking-tight">{p1Totals.grandTotal}</div>
             </div>
             <div className="text-center">
                <div className="text-teal-300 text-sm font-medium mb-1">{gameState.players[1].name}</div>
                <div className="text-5xl font-bold tracking-tight">{p2Totals.grandTotal}</div>
             </div>
           </div>
        </div>
      </div>

      <NameModal 
        isOpen={editingPlayerIndex !== null}
        playerIndex={editingPlayerIndex || 0}
        currentName={editingPlayerIndex !== null ? gameState.players[editingPlayerIndex].name : ''}
        onClose={() => setEditingPlayerIndex(null)}
        onConfirm={handleNameSave}
      />
    </div>
  );
};

// Row Component for Cleaner Code
const ScoreRow: React.FC<{
  category: CategoryDef;
  players: Player[];
  onScoreChange: (pIdx: number, cId: CategoryId, value: string) => void;
  isSet: (pIdx: number, cId: CategoryId) => boolean;
}> = ({ category, players, onScoreChange, isSet }) => {
  return (
    <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 items-center">
      <div className="text-slate-700 font-medium text-sm sm:text-base leading-tight">
        {category.label}
        {category.description && <div className="text-[10px] text-slate-400 font-normal hidden sm:block">{category.description}</div>}
      </div>
      
      {[0, 1].map(idx => {
        const hasScore = isSet(idx, category.id);
        const score = players[idx].scores[category.id];
        
        return (
          <div key={idx} className="relative">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={score ?? ''}
              onChange={(e) => onScoreChange(idx, category.id, e.target.value)}
              onFocus={(e) => e.target.select()} // Auto-select on focus
              className={`
                w-full h-12 sm:h-14 rounded-xl border-2 font-mono text-xl sm:text-2xl text-center outline-none transition-all duration-150
                focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10
                ${hasScore 
                  ? 'bg-white border-teal-500 text-teal-700 font-bold shadow-sm' 
                  : 'bg-slate-100 border-transparent text-slate-700 hover:bg-slate-200 focus:bg-white'
                }
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;