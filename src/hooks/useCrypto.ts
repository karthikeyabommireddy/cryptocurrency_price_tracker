import { useState, useEffect, useCallback } from 'react';
import { CryptoCoin, CoinDetail } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useCrypto = () => {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CryptoCoin[] = await response.json();
      setCoins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cryptocurrency data');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCoinDetail = async (coinId: string): Promise<CoinDetail | null> => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching coin detail:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchCoins();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCoins, 30000);
    
    return () => clearInterval(interval);
  }, [fetchCoins]);

  return {
    coins,
    loading,
    error,
    refetch: fetchCoins,
    fetchCoinDetail
  };
};