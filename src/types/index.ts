// src/types/index.ts

export type PinStatus = 'visited' | 'wishlist' | 'favorite';

export interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  city?: string;
  status: PinStatus;
  notes: string;
  date?: string;
  photo?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppData {
  pins: Pin[];
  version: string;
  lastBackup: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  autoSave: boolean;
  mapTheme: 'standard' | 'satellite' | 'dark' | 'topographic';
  pinAnimation: boolean;
  autoBackup: boolean;
  backupInterval: number;
  defaultView: 'map' | 'list';
  measurementUnit?: 'km' | 'miles';
}

// Helper function to create a new pin
export const createNewPin = (
  latlng: { lat: number; lng: number }, 
  country: string, 
  name: string = ''
): Pin => ({
  id: '', // Will be generated when saved
  name,
  lat: latlng.lat,
  lng: latlng.lng,
  country,
  city: '',
  status: 'wishlist',
  notes: '',
  date: new Date().toISOString().split('T')[0],
  photo: '',
  rating: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});