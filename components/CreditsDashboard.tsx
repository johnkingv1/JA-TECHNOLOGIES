
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
}

export const CreditsDashboard: React.FC<CreditsDashboardProps> = ({ isOpen, onClose, credits }) => {
  const tierProgress = (credits % 1000) / 10;
  const currentTier = credits > 5000 ? 'EXOTIC' : credits > 2000 ? 'RARE' : 'OPERATIVE';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-0 right-0 w-full md:w-80 h-full bg-zinc-950 border-l border-zinc-800 z-[60] p-6 font-mono overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-bold tracking-widest text-blue-500">BIO-DATA_WALLET</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white text-2xl">&times;</button>
          </div>

          <div className="space-y-8">
            {/* Balance */}
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
              <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Available Tech-Credits</p>
              <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                {credits.toLocaleString()}
                <span className="text-xs text-blue-500">TC</span>
              </div>
            </div>

            {/* Tier */}
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>RANK: {currentTier}</span>
                <span>{Math.floor(tierProgress)}% TO NEXT LEVEL</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            {/* Missions */}
            <div className="space-y-4">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Active Missions</p>
              <div className="space-y-2">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded hover:border-blue-500/50 transition-colors group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white">Daily Exploration</span>
                    <span className="text-[10px] text-blue-400">+50 TC</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Spend 5 minutes on the platform.</p>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded opacity-50 cursor-not-allowed">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white">Neural Interaction</span>
                    <span className="text-[10px] text-blue-400">+100 TC</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Click 5 different 3D elements.</p>
                </div>
              </div>
            </div>

            {/* Shop Section */}
            <div className="mt-auto pt-8 border-t border-zinc-800">
               <button className="w-full py-4 bg-transparent border border-blue-500/50 text-blue-400 text-xs font-bold hover:bg-blue-500/10 transition-all rounded">
                 REDEEM REWARDS
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
