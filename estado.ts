
import { useState, useEffect, useCallback } from 'react';
import { Producto, ItemCarrito } from './tipos';

export const usarEstado = () => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [creditos, setCreditos] = useState<number>(0);
  const [estaChatAbierto, setEstaChatAbierto] = useState(false);
  const [estaPanelAbierto, setEstaPanelAbierto] = useState(false);

  // Lógica de gamificación: Gana créditos por tiempo activo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setCreditos(prev => prev + 1);
    }, 10000); // 1 crédito cada 10 segundos
    return () => clearInterval(intervalo);
  }, []);

  const agregarAlCarrito = useCallback((producto: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      // Bonus de créditos por interactuar
      setCreditos(c => c + 50);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const eliminarDelCarrito = useCallback((id: string) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  }, []);

  return {
    carrito,
    creditos,
    agregarAlCarrito,
    eliminarDelCarrito,
    estaChatAbierto,
    setEstaChatAbierto,
    estaPanelAbierto,
    setEstaPanelAbierto,
    setCreditos
  };
};
