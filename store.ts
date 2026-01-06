
import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, UserState } from './types';

export const useStore = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Gamification logic: Earn credits over time
  useEffect(() => {
    const interval = setInterval(() => {
      setCredits(prev => prev + 1);
    }, 10000); // 1 credit every 10 seconds active
    return () => clearInterval(interval);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      // Bonus credits for adding to cart
      setCredits(c => c + 50);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  return {
    cart,
    credits,
    addToCart,
    removeFromCart,
    isAIChatOpen,
    setIsAIChatOpen,
    isDashboardOpen,
    setIsDashboardOpen,
    setCredits
  };
};
