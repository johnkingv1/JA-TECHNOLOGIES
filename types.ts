
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  specs: string[];
  rarity: 'Common' | 'Rare' | 'Exotic';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserState {
  credits: number;
  lastVisit: number;
  tier: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
