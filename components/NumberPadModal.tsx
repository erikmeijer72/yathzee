import React from 'react';
import { X, Check, Delete } from 'lucide-react';
import { CategoryDef } from '../types';

interface NumberPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (val: number) => void;
  category: CategoryDef | null;
  playerName: string;
}

const NumberPadModal: React.FC<NumberPadModalProps> = ({ isOpen, onClose, onConfirm, category, playerName }) => {
  const [currentValue, setCurrentValue] = React.useState<string>('');

  React.useEffect(() => {
    if (isOpen) {
      setCurrentValue('');
    }
  }, [isOpen]);

  if (!isOpen || !category) return null;

  const handleNumClick = (num: number) => {
    if (currentValue.length >= 3) return; // Prevent unreasonable numbers
    setCurrentValue(prev => prev + num.toString());
  };

  const handleDelete = () => {
    setCurrentValue(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    const val = currentValue === '' ? 0 : parseInt(currentValue, 10);
    onConfirm(val);
    onClose();
  };

  // Preset buttons for fixed scores to make it faster
  const renderPresets = () => {
    if (category.fixedScore) {
      return (
        <div className="grid grid-cols-2 gap-3 mb-4">
           <button 
            onClick={() => { onConfirm(0); onClose(); }}
            className="h-14 bg-red-100 text-red-700 font-bold rounded-xl text-xl shadow-sm border-2 border-red-200 active:scale-95 transition-transform"
          >
            0 (Mis)
          </button>
          <button 
            onClick={() => { onConfirm(category.fixedScore!); onClose(); }}
            className="h-14 bg-teal-100 text-teal-800 font-bold rounded-xl text-xl shadow-sm border-2 border-teal-200 active:scale-95 transition-transform"
          >
            {category.fixedScore} (Gelukt)
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full sm:w-[400px] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
          <div>
            <div className="text-teal-100 text-sm font-medium">{playerName}</div>
            <div className="text-2xl font-bold">{category.label}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="p-6 bg-slate-50">
          
          {/* Display */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl h-20 mb-6 flex items-center justify-center relative shadow-inner">
             <span className={`text-5xl font-mono font-semibold tracking-wider ${currentValue ? 'text-slate-800' : 'text-slate-300'}`}>
               {currentValue || '0'}
             </span>
             {currentValue && (
               <button 
                onClick={handleDelete}
                className="absolute right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                 <Delete size={32} />
               </button>
             )}
          </div>

          {/* Presets (Logic aware) */}
          {renderPresets()}

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumClick(num)}
                className="h-16 bg-white text-slate-700 text-2xl font-semibold rounded-xl shadow-sm border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 active:shadow-none transition-all hover:bg-slate-50"
              >
                {num}
              </button>
            ))}
            
            <button
               onClick={() => setCurrentValue('0')}
               className="h-16 bg-red-50 text-red-600 text-xl font-semibold rounded-xl shadow-sm border-b-4 border-red-100 active:border-b-0 active:translate-y-1 transition-all"
            >
              C
            </button>
            
            <button
              onClick={() => handleNumClick(0)}
              className="h-16 bg-white text-slate-700 text-2xl font-semibold rounded-xl shadow-sm border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 active:shadow-none transition-all hover:bg-slate-50"
            >
              0
            </button>

            <button
              onClick={handleConfirm}
              className="h-16 bg-teal-500 text-white text-xl font-bold rounded-xl shadow-md border-b-4 border-teal-700 active:border-b-0 active:translate-y-1 active:shadow-none transition-all hover:bg-teal-600 flex items-center justify-center gap-2"
            >
              <Check size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberPadModal;
