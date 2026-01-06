
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { obtenerRecomendacionIA } from '../servicios/gemini';
import { MensajeChat } from '../tipos';

interface ChatIAProps {
  estaAbierto: boolean;
  alCerrar: () => void;
}

export const ChatIA: React.FC<ChatIAProps> = ({ estaAbierto, alCerrar }) => {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    { rol: 'modelo', texto: 'TERMINAL JA_TECHNOLOGIES ONLINE. SISTEMAS LISTOS PARA SINCRONIZACIÓN. ¿QUÉ ÁREA DE INGENIERÍA DESEA EXPLORAR?' }
  ]);
  const [entrada, setEntrada] = useState('');
  const [procesando, setProcesando] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!entrada.trim()) return;
    const msgUsuario = entrada;
    setEntrada('');
    setMensajes(prev => [...prev, { rol: 'usuario', texto: msgUsuario }]);
    setProcesando(true);

    const respuesta = await obtenerRecomendacionIA(msgUsuario);
    setMensajes(prev => [...prev, { rol: 'modelo', texto: respuesta.toUpperCase() }]);
    setProcesando(false);
  };

  return (
    <AnimatePresence>
      {estaAbierto && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-28 right-4 md:right-8 w-[350px] md:w-[400px] h-[550px] bg-black/95 backdrop-blur-3xl border border-yellow-500/20 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-50 font-mono"
        >
          <div className="p-5 bg-yellow-500/10 border-b border-yellow-500/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_#facc15]" />
              <span className="text-[10px] font-black text-yellow-500 tracking-[0.2em] uppercase">NEXUS_ASSISTANT_4.0</span>
            </div>
            <button onClick={alCerrar} className="text-zinc-600 hover:text-yellow-500 transition-colors text-xl font-bold">&times;</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {mensajes.map((msg, i) => (
              <div key={i} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-sm text-[10px] leading-relaxed border ${
                  msg.rol === 'usuario' 
                  ? 'bg-yellow-500/5 border-yellow-500/30 text-yellow-100' 
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                }`}>
                  <span className={`block opacity-40 mb-2 font-black tracking-widest ${msg.rol === 'usuario' ? 'text-yellow-500' : 'text-zinc-500'}`}>
                    {msg.rol === 'usuario' ? 'NODE_INPUT_V >' : 'CORE_OUTPUT_V >'}
                  </span>
                  {msg.texto}
                </div>
              </div>
            ))}
            {procesando && (
              <div className="text-yellow-500 text-[9px] animate-pulse font-black tracking-[0.2em] uppercase">Procesando_Query_JA...</div>
            )}
          </div>

          <div className="p-5 bg-black/60 border-t border-zinc-900">
            <div className="flex gap-3">
              <input
                type="text"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                placeholder="Ejecutar consulta JA Tech..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-yellow-500 placeholder-yellow-900 font-bold"
              />
              <button 
                onClick={enviarMensaje}
                className="px-6 py-2 bg-yellow-500 text-black text-[9px] font-black hover:bg-white transition-all uppercase tracking-widest rounded-sm"
              >
                SYNC
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
