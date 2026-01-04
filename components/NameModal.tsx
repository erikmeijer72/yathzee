import React, { useState, useEffect } from 'react';
import { X, Check, User } from 'lucide-react';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  currentName: string;
  playerIndex: number;
}

const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose, onConfirm, currentName, playerIndex }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
    }
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User size={20} className="text-teal-200" />
            <span className="font-bold text-lg">Naam Speler {playerIndex + 1}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-slate-50">
          <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">
            Nieuwe naam
          </label>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 text-xl font-bold text-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all bg-white mb-6"
            placeholder="Vul naam in..."
            autoFocus
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors"
            >
              Annuleer
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-teal-600 text-white font-bold shadow-md hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameModal;