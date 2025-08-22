import { useState, useEffect } from 'react';
import { PortfolioItem } from '../types/crypto';

const STORAGE_KEY = 'crypto_portfolio';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    // Load portfolio from localStorage
    const savedPortfolio = localStorage.getItem(STORAGE_KEY);
    const savedWatchlist = localStorage.getItem('crypto_watchlist');
    
    if (savedPortfolio) {
      try {
        setPortfolio(JSON.parse(savedPortfolio));
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    }
    
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    }
  }, []);

  const savePortfolio = (newPortfolio: PortfolioItem[]) => {
    setPortfolio(newPortfolio);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPortfolio));
  };

  const saveWatchlist = (newWatchlist: string[]) => {
    setWatchlist(newWatchlist);
    localStorage.setItem('crypto_watchlist', JSON.stringify(newWatchlist));
  };

  const addToPortfolio = (item: PortfolioItem) => {
    const newPortfolio = [...portfolio, { ...item, purchaseDate: new Date().toISOString() }];
    savePortfolio(newPortfolio);
  };

  const removeFromPortfolio = (index: number) => {
    const newPortfolio = portfolio.filter((_, i) => i !== index);
    savePortfolio(newPortfolio);
  };

  const addToWatchlist = (coinId: string) => {
    if (!watchlist.includes(coinId)) {
      const newWatchlist = [...watchlist, coinId];
      saveWatchlist(newWatchlist);
    }
  };

  const removeFromWatchlist = (coinId: string) => {
    const newWatchlist = watchlist.filter(id => id !== coinId);
    saveWatchlist(newWatchlist);
  };

  const isInWatchlist = (coinId: string) => watchlist.includes(coinId);

  return {
    portfolio,
    watchlist,
    addToPortfolio,
    removeFromPortfolio,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};