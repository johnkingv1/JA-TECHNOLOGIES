
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero3D } from './components/ThreeScene';
import { AIChat } from './components/AIChat';
import { CreditsDashboard } from './components/CreditsDashboard';
import { useStore } from './store';
import { Product } from './types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NOVA X1 HEADPHONES',
    price: 399,
    category: 'AUDIO',
    description: 'Neural-linked active noise cancellation with carbon-weave chassis.',
    image: 'https://picsum.photos/seed/head1/600/800',
    specs: ['90h Battery', 'LDAC Support', 'Haptic Drivers'],
    rarity: 'Exotic'
  },
  {
    id: '2',
    name: 'QUANTON SMARTWATCH',
    price: 599,
    category: 'WEARABLE',
    description: 'Sapphire glass with integrated holographic emitter.',
    image: 'https://picsum.photos/seed/watch1/600/800',
    specs: ['Blood Oxygen', 'GPS-X', 'Bio-Sec'],
    rarity: 'Rare'
  },
  {
    id: '3',
    name: 'NEBULA KEYBOARD',
    price: 250,
    category: 'INPUT',
    description: 'Laser-actuated switches with 1ms response latency.',
    image: 'https://picsum.photos/seed/kb1/600/800',
    specs: ['Hot Swap', 'RGB 16.8M', 'OLED Screen'],
    rarity: 'Common'
  },
  {
    id: '4',
    name: 'STARLIGHT EARBUDS',
    price: 199,
    category: 'AUDIO',
    description: 'Ultra-lightweight buds with ambient transparency mode.',
    image: 'https://picsum.photos/seed/buds1/600/800',
    specs: ['IPX7', 'Wireless Charge', 'Spatial Audio'],
    rarity: 'Common'
  }
];

const ProductCard = ({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-zinc-900 border border-zinc-800 overflow-hidden rounded-sm"
    >
      <div className="relative h-96 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-[8px] font-bold uppercase tracking-widest border ${
            product.rarity === 'Exotic' ? 'border-purple-500 text-purple-400' : 
            product.rarity === 'Rare' ? 'border-blue-500 text-blue-400' : 'border-zinc-700 text-zinc-500'
          }`}>
            {product.rarity}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6 font-mono">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase">
            {product.name}
          </h3>
          <span className="text-sm text-zinc-400">${product.price}</span>
        </div>
        <p className="text-[10px] text-zinc-500 line-clamp-2 mb-4 lowercase">
          {product.description}
        </p>
        <div className="flex gap-2 mb-6">
          {product.specs.map(spec => (
            <span key={spec} className="text-[8px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
              {spec}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => onAdd(product)}
          className="w-full py-3 bg-white text-black text-[10px] font-bold hover:bg-blue-500 hover:text-white transition-all overflow-hidden relative"
        >
          <span className="relative z-10">INITIALIZE PURCHASE</span>
          <motion.div 
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-blue-400/20 skew-x-12"
          />
        </button>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onCartClick, onDashboardClick, cartCount, credits }: any) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-white/5 font-mono">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-black text-xl">N</div>
        <div className="hidden md:block">
          <p className="text-[10px] font-bold text-white leading-none">NEXUS CORE</p>
          <p className="text-[8px] text-blue-500">SECURE_LINK_ACTIVE</p>
        </div>
      </div>
      
      <div className="flex gap-6 items-center">
        <button onClick={onDashboardClick} className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500">TECH_CREDITS</span>
          <span className="text-sm font-bold text-blue-500">{credits} TC</span>
        </button>
        <button onClick={onCartClick} className="relative group">
          <div className="text-[10px] text-zinc-500 mb-1 text-right">CART_DATA</div>
          <div className="px-4 py-1 border border-zinc-700 group-hover:border-white text-xs transition-colors">
            {cartCount} ACCESS_KEYS
          </div>
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const { 
    cart, 
    credits, 
    addToCart, 
    isAIChatOpen, 
    setIsAIChatOpen, 
    isDashboardOpen, 
    setIsDashboardOpen 
  } = useStore();

  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-blue-500/30">
      <Navbar 
        onCartClick={() => {}} 
        onDashboardClick={() => setIsDashboardOpen(true)}
        cartCount={cart.length}
        credits={credits}
      />
      
      <Hero3D />

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-blue-500" />
            <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] font-mono">STOCK_INVENTORY</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">LATEST DEPLOYMENTS</h2>
          <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
            Engineered for the elite. Secure your neural link with the most advanced hardware in the sector.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>

        {/* Futuristic CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 p-12 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-lg text-center"
        >
          <div className="mb-8 font-mono">
            <p className="text-blue-400 text-xs mb-4">AR_PROTOCOLS_READY</p>
            <h3 className="text-3xl font-bold text-white mb-4 italic">SEE THE FUTURE IN YOUR SPACE</h3>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto mb-8">
              Enable your optic sensors to visualize products directly in your physical environment.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white text-[10px] font-bold tracking-widest hover:bg-blue-500 transition-all rounded-sm uppercase">
              ACTIVATE AUGMENTED REALITY
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-zinc-900 p-12 bg-[#020202] font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-blue-500 text-xs font-bold mb-6">NEXUS_CORE</h4>
            <p className="text-[10px] text-zinc-600 leading-relaxed">
              OPERATING IN SECTOR-7B. <br />
              ENCRYPTED TRANSACTIONS ONLY. <br />
              NO REFUNDS ON NEURAL LINKAGES.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-zinc-400 text-xs font-bold mb-4 uppercase">Directives</h4>
            <a href="#" className="text-[10px] text-zinc-600 hover:text-blue-500">PRIVACY_ENCRYPTION</a>
            <a href="#" className="text-[10px] text-zinc-600 hover:text-blue-500">TERMS_OF_SERVICE</a>
            <a href="#" className="text-[10px] text-zinc-600 hover:text-blue-500">LOGISTICS_TRACKING</a>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-800">© 2077 NEXUS_CORP_GLOBAL</span>
          </div>
        </div>
      </footer>

      {/* Floating UI Elements */}
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
      <CreditsDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} credits={credits} />
      
      {/* Floating Action Button for AI Chat */}
      <button 
        onClick={() => setIsAIChatOpen(prev => !prev)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 z-40 group overflow-hidden transition-transform active:scale-90"
      >
        <div className="absolute inset-0 bg-blue-400/30 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}
