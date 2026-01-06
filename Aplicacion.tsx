
import React from 'react';
import { motion } from 'framer-motion';
import { Hero3D } from './componentes/Escena3D';
import { ChatIA } from './componentes/ChatIA';
import { PanelCreditos } from './componentes/PanelCreditos';
import { usarEstado } from './estado';
import { Proyecto, Servicio } from './tipos';

const SERVICIOS: Servicio[] = [
  { id: 's1', titulo: 'Desarrollo de Sistemas', descripcion: 'Sistemas informáticos a medida con arquitecturas robustas.', icono: '⚡' },
  { id: 's2', titulo: 'Ingeniería TI Salud', descripcion: 'Plataformas clínicas avanzadas con integración de IA.', icono: '🩺' },
  { id: 's3', titulo: 'Arquitectura de Datos', descripcion: 'Estructuración y optimización de flujos críticos.', icono: '📊' },
  { id: 's4', titulo: 'Seguridad Informática', descripcion: 'Blindaje de sistemas y protección de activos.', icono: '🛡️' }
];

export default function Aplicacion() {
  const { 
    creditos, 
    estaChatAbierto, 
    setEstaChatAbierto, 
    estaPanelAbierto, 
    setEstaPanelAbierto 
  } = usarEstado();

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 selection:bg-yellow-500/30">
      {/* Navbar Minimalista Fluor */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 font-mono">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#facc15] rounded-sm flex items-center justify-center font-black text-black text-lg shadow-[0_0_15px_rgba(250,204,21,0.4)]">JA</div>
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-white leading-none tracking-widest uppercase">JA Technologies</p>
            <p className="text-[7px] text-yellow-500 mt-1 uppercase font-bold tracking-[0.2em]">Sistemas & Ingeniería</p>
          </div>
        </div>
        
        <div className="flex gap-8 items-center text-[10px] font-bold text-zinc-500">
          <a href="#sobre-mi" className="hover:text-yellow-500 transition-colors uppercase tracking-widest">Core</a>
          <a href="#proyectos" className="hover:text-yellow-500 transition-colors uppercase tracking-widest">Sistemas</a>
          <button 
            onClick={() => setEstaPanelAbierto(true)} 
            className="flex items-center gap-2 text-yellow-500 border border-yellow-500/30 px-4 py-1.5 rounded-sm hover:bg-yellow-500/10 transition-all font-black uppercase"
          >
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
            Perfil_Tech
          </button>
        </div>
      </nav>

      <Hero3D />

      {/* Sección Empresa */}
      <section id="sobre-mi" className="max-w-6xl mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-12 bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            <span className="text-[10px] font-black text-yellow-500 tracking-[0.4em] font-mono uppercase">Vanguardia_Digital</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter uppercase leading-tight italic">
            Arquitecturas de <br/><span className="text-yellow-500">Próxima Generación.</span>
          </h2>
          <div className="space-y-8 text-zinc-400 font-mono text-sm leading-relaxed">
            <p>
              En <span className="text-yellow-500 font-bold">JA Technologies</span>, redefinimos la ingeniería de software a través de soluciones informáticas de alto rendimiento. Nuestra especialidad reside en la creación de ecosistemas digitales que fusionan la <span className="text-white font-bold">Informática Médica</span> con el desarrollo <span className="text-cyan-400">Full Stack</span>.
            </p>
            <p>
              Diseñamos sistemas que no solo responden a las necesidades actuales, sino que están preparados para la escalabilidad del futuro, garantizando integridad y seguridad en cada línea de código.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-6 items-center">
           {[
             { label: 'Ingeniería', val: 'Sistemas Complejos', color: 'border-yellow-500/30' },
             { label: 'Especialidad', val: 'Full Stack Dev', color: 'border-cyan-500/30' },
             { label: 'Innovación', val: 'Salud & IA', color: 'border-yellow-500/30' },
             { label: 'Sello', val: 'DUOC UC', color: 'border-zinc-800' }
           ].map((item, idx) => (
             <motion.div 
               key={idx} 
               whileHover={{ y: -5, borderColor: '#facc15' }}
               className={`p-8 bg-zinc-950 border ${item.color} rounded-sm transition-all relative overflow-hidden group`}
             >
               <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 blur-[30px] group-hover:bg-yellow-500/20 transition-all" />
               <p className="text-[8px] text-zinc-600 uppercase mb-3 font-mono tracking-widest">{item.label}</p>
               <p className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-yellow-500 transition-colors">{item.val}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* DiagnósticaDoc */}
      <section id="proyectos" className="bg-[#050505] py-40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.03),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-12 bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-[10px] font-black text-yellow-500 tracking-[0.4em] font-mono uppercase">Case_Study_01</span>
              </div>
              <h3 className="text-7xl font-black text-white mb-8 italic tracking-tighter neon-yellow-text">DIAGNÓSTICADOC</h3>
              <p className="text-zinc-400 text-lg mb-12 font-mono leading-relaxed max-w-xl italic">
                La convergencia perfecta entre el análisis médico y la inteligencia artificial. Un sistema diseñado para la precisión absoluta.
              </p>
              <div className="flex flex-wrap gap-4 mb-14">
                {['IA Engine', 'FastAPI', 'React Next', 'Neural Net'].map(t => (
                  <span key={t} className="px-5 py-2 bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
              <button className="px-12 py-5 bg-white text-black text-[10px] font-black hover:bg-yellow-500 transition-all uppercase tracking-[0.3em] rounded-sm shadow-xl">
                Ver Documentación Técnica
              </button>
            </div>
            <div className="lg:col-span-2 relative group">
               <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] -z-10 group-hover:bg-yellow-500/20 transition-all" />
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="p-1 border border-zinc-800 bg-black rounded shadow-2xl relative overflow-hidden"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" 
                   alt="Medical Tech JA" 
                   className="w-full opacity-60 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-6xl mx-auto px-6 py-40">
        <div className="text-center mb-24">
          <p className="text-yellow-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Servicios_Core</p>
          <h2 className="text-3xl font-bold text-white uppercase tracking-[0.1em] italic">Ecosistema de Desarrollo</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICIOS.map(s => (
            <div key={s.id} className="p-10 border border-zinc-900 bg-zinc-950/50 hover:border-yellow-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-yellow-500 group-hover:h-full transition-all duration-500" />
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform filter drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">{s.icono}</div>
              <h4 className="text-white font-black mb-4 uppercase text-[10px] tracking-[0.2em]">{s.titulo}</h4>
              <p className="text-zinc-500 text-[10px] leading-relaxed font-mono font-light">{s.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer JA Technologies */}
      <footer id="contacto" className="bg-black border-t border-white/5 p-24 font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24">
          <div>
            <h4 className="text-yellow-500 text-xs font-black mb-10 uppercase tracking-[0.4em]">JA Technologies</h4>
            <div className="space-y-6">
              <p className="text-white text-sm font-black tracking-tighter italic">INGENIERÍA INFORMÁTICA SUPERIOR</p>
              <p className="text-zinc-600 text-[10px] leading-relaxed uppercase tracking-widest font-light">
                Digital Systems Architecture<br/>
                Bio-Informatics Integration<br/>
                Secure Protocol 2025
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-zinc-500 text-xs font-black mb-10 uppercase tracking-[0.2em]">Sincronización</h4>
            <div className="flex flex-col gap-5">
              <a href="#" className="text-[10px] text-zinc-400 hover:text-yellow-500 transition-colors uppercase font-bold tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-yellow-500" /> LinkedIn_Node
              </a>
              <a href="#" className="text-[10px] text-zinc-400 hover:text-yellow-500 transition-colors uppercase font-bold tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-yellow-500" /> GitHub_Repo
              </a>
              <a href="mailto:contact@jatech.cl" className="text-[10px] text-zinc-400 hover:text-yellow-500 transition-colors uppercase font-bold tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-yellow-500" /> Direct_Mail
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-[10px] text-zinc-800 font-bold mb-2 tracking-widest">© 2025 JA_TECH_SYSTEMS</p>
              <p className="text-[9px] text-yellow-900 tracking-[0.3em] font-black">X_PROTOCOL_4.0_READY</p>
            </div>
            <div className="w-16 h-[2px] bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.5)] mt-8" />
          </div>
        </div>
      </footer>

      <ChatIA estaAbierto={estaChatAbierto} alCerrar={() => setEstaChatAbierto(false)} />
      <PanelCreditos estaAbierto={estaPanelAbierto} alCerrar={() => setEstaPanelAbierto(false)} creditos={creditos} />
      
      <button 
        onClick={() => setEstaChatAbierto(prev => !prev)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#facc15] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] z-40 hover:scale-110 active:scale-95 transition-transform group"
      >
        <div className="absolute inset-0 rounded-full border border-yellow-500 animate-ping opacity-20 group-hover:opacity-40" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}
