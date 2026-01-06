
export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  imagen: string;
  link?: string;
  destacado: boolean;
}

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface Competencia {
  nombre: string;
  nivel: number; // 0-100
}

export interface MensajeChat {
  rol: 'usuario' | 'modelo';
  texto: string;
}

// Fixed missing interface for Producto used in estado.ts
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  specs: string[];
  rareza: 'Común' | 'Raro' | 'Exótico';
}

// Fixed missing interface for ItemCarrito used in estado.ts
export interface ItemCarrito extends Producto {
  cantidad: number;
}
