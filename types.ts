export enum Difficulty {
  EASY = 'Easy',
  MODERATE = 'Moderate',
  HARD = 'Hard',
  EXTREME = 'Extreme'
}

export interface Vendor {
  id: string;
  name: string;
  avatarUrl: string;
  joinedDate: string;
  rating: number;
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  difficulty: Difficulty;
  duration: string;
  vendor: Vendor;
  coordinates: { lat: number; lng: number };
  amenities: string[];
  maxGuests: number;
}

export interface Booking {
  id: string;
  activityId: string;
  activityTitle: string;
  activityImage: string;
  date: string; // ISO date string
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}