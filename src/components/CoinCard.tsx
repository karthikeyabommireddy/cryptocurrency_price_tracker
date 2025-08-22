import React from 'react';
import { TrendingUp, TrendingDown, Star, StarOff } from 'lucide-react';
import { CryptoCoin } from '../types/crypto';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CoinCardProps {
  coin: CryptoCoin;
  isInWatchlist: boolean;
  onToggleWatchlist: (coinId: string) => void;
  onClick: (coin: CryptoCoin) => void;
}

export const CoinCard: React.FC<CoinCardProps> = ({ 
  coin, 
  isInWatchlist, 
  onToggleWatchlist, 
  onClick 
}) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist(coin.id);
  };

  return (
    <div 
      onClick={() => onClick(coin)}
      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={coin.image} 
            alt={coin.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
              {coin.name}
            </h3>
            <p className="text-gray-400 text-sm uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
            #{coin.market_cap_rank}
          </span>
          <button
            onClick={handleWatchlistClick}
            className={`p-2 rounded-full transition-colors ${
              isInWatchlist 
                ? 'text-yellow-400 hover:text-yellow-300' 
                : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            {isInWatchlist ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-xl font-bold">
            {formatPrice(coin.current_price)}
          </span>
          <div className={`flex items-center space-x-1 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">
              {formatPercentage(coin.price_change_percentage_24h)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Market Cap</p>
            <p className="text-white font-medium">
              {formatMarketCap(coin.market_cap)}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Volume (24h)</p>
            <p className="text-white font-medium">
              {formatMarketCap(coin.total_volume)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">High (24h)</p>
            <p className="text-green-400 font-medium">
              {formatPrice(coin.high_24h)}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Low (24h)</p>
            <p className="text-red-400 font-medium">
              {formatPrice(coin.low_24h)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};