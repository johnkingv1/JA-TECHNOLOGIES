
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PanelCreditosProps {
  estaAbierto: boolean;
  alCerrar: () => void;
  creditos: number;
}

const CERTIFICACIONES = [
  'Análisis de requerimientos',
  'Calidad de software (QA)',
  'Gestión de proyectos IT',
  'Inteligencia de negocios',
  'Arquitectura de software',
  'Modelado de datos'
];

export const PanelCreditos: React.FC<PanelCreditosProps> = ({ estaAbierto, alCerrar, creditos }) => {
  return (
    <AnimatePresence>
      {estaAbierto && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-0 right-0 w-full md:w-[480px] h-full bg-[#050505] border-l border-yellow-500/10 z-[60] p-12 font-mono overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-20">
            <h2 className="text-xl font-black tracking-[0.3em] text-yellow-500 italic uppercase">Core_Profile_Data</h2>
            <button onClick={alCerrar} className="text-zinc-600 hover:text-yellow-500 text-3xl font-bold transition-colors">&times;</button>
          </div>

          <div className="space-y-16">
            <div>
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mb-8 font-black border-b border-zinc-900 pb-2">Certificaciones_Eje</h3>
              <div className="grid grid-cols-1 gap-4">
                {CERTIFICACIONES.map((c, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-zinc-900/30 border border-zinc-800 flex items-center gap-5 group hover:border-yellow-500/30 transition-all"
                  >
                    <div className="w-2 h-2 bg-yellow-500 shadow-[0_0_8px_#facc15]" />
                    <span className="text-[10px] text-zinc-400 uppercase font-black group-hover:text-white transition-colors">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mb-8 font-black border-b border-zinc-900 pb-2">Dominios_Estructurales</h3>
              <div className="space-y-6">
                {[
                  { name: 'Full Stack Dev', level: 95 },
                  { name: 'ML & AI Health', level: 85 },
                  { name: 'Architecture Design', level: 90 },
                  { name: 'Project Management', level: 80 }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-3">
                      <span className="text-zinc-400 uppercase font-black tracking-widest">{s.name}</span>
                      <span className="text-yellow-500 font-black">{s.level}%</span>
                    </div>
                    <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-900">
               <motion.button 
                 whileHover={{ scale: 1.02, backgroundColor: '#facc15', color: '#000' }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full py-5 bg-transparent border-2 border-yellow-500 text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm transition-all shadow-[0_0_20px_rgba(250,204,21,0.1)]"
               >
                 Descargar_CV_v4.0
               </motion.button>
               <p className="mt-8 text-[8px] text-zinc-700 text-center uppercase tracking-widest font-bold">
                 Auth_Checksum: DUOC_UC_2025_STABLE
               </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
