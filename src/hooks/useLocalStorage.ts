// src/hooks/useLocalStorage.tsx
import { useState, useEffect } from 'react';
import { Pin } from '../types';

interface StorageData {
  pins: Pin[];
  categories: string[];
}

const defaultData: StorageData = {
  pins: [],
  categories: [],
};

export const useLocalStorage = () => {
  const [data, setData] = useState<StorageData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem('pindrop-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate data structure
        if (parsed.pins && Array.isArray(parsed.pins)) {
          setData({
            pins: parsed.pins,
            categories: parsed.categories || [],
          });
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const saveToStorage = (newData: StorageData) => {
    setData(newData);
    localStorage.setItem('pindrop-data', JSON.stringify(newData));
  };

  const addPin = (pinData: Omit<Pin, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPin: Pin = {
      ...pinData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newData = {
      ...data,
      pins: [...data.pins, newPin],
    };
    saveToStorage(newData);
  };

  const updatePin = (id: string, pinData: Partial<Pin>) => {
    const newData = {
      ...data,
      pins: data.pins.map(pin => 
        pin.id === id 
          ? { ...pin, ...pinData, updatedAt: new Date().toISOString() }
          : pin
      ),
    };
    saveToStorage(newData);
  };

  const deletePin = (id: string) => {
    const newData = {
      ...data,
      pins: data.pins.filter(pin => pin.id !== id),
    };
    saveToStorage(newData);
  };

  const exportData = () => {
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonString: string) => {
    try {
      const importedData = JSON.parse(jsonString);
      if (importedData.pins && Array.isArray(importedData.pins)) {
        const newData = {
          pins: importedData.pins,
          categories: importedData.categories || [],
        };
        saveToStorage(newData);
        return true;
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
    return false;
  };

  return {
    data,
    addPin,
    updatePin,
    deletePin,
    exportData,
    importData,
  };
};