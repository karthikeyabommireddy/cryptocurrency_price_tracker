import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Star, StarOff, Plus } from 'lucide-react';
import { CryptoCoin, CoinDetail } from '../types/crypto';
import { formatPrice, formatMarketCap, formatPercentage, formatSupply } from '../utils/formatters';
import { useCrypto } from '../hooks/useCrypto';

interface CoinDetailProps {
  coin: CryptoCoin;
  isInWatchlist: boolean;
  onClose: () => void;
  onToggleWatchlist: (coinId: string) => void;
  onAddToPortfolio: (coin: CryptoCoin) => void;
}

export const CoinDetailModal: React.FC<CoinDetailProps> = ({ 
  coin, 
  isInWatchlist, 
  onClose, 
  onToggleWatchlist,
  onAddToPortfolio 
}) => {
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchCoinDetail } = useCrypto();

  useEffect(() => {
    const loadCoinDetail = async () => {
      setLoading(true);
      const detail = await fetchCoinDetail(coin.id);
      setCoinDetail(detail);
      setLoading(false);
    };

    loadCoinDetail();
  }, [coin.id, fetchCoinDetail]);

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
              <p className="text-gray-400 text-lg uppercase">{coin.symbol}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleWatchlist(coin.id)}
              className={`p-2 rounded-full transition-colors ${
                isInWatchlist 
                  ? 'text-yellow-400 hover:text-yellow-300' 
                  : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              {isInWatchlist ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => onAddToPortfolio(coin)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Portfolio</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Price Section */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {formatPrice(coin.current_price)}
                    </h3>
                    <div className={`flex items-center space-x-2 ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      <span className="text-lg font-medium">
                        {formatPercentage(coin.price_change_percentage_24h)}
                      </span>
                      <span className="text-gray-400">
                        ({formatPrice(coin.price_change_24h)} 24h)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Market Cap Rank</p>
                    <p className="text-2xl font-bold text-blue-400">#{coin.market_cap_rank}</p>
                  </div>
                </div>
              </div>

              {/* Market Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-gray-400 text-sm mb-2">Market Cap</h4>
                  <p className="text-white text-xl font-bold">{formatMarketCap(coin.market_cap)}</p>
                  {coin.market_cap_change_percentage_24h && (
                    <p className={`text-sm ${
                      coin.market_cap_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPercentage(coin.market_cap_change_percentage_24h)} (24h)
                    </p>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-gray-400 text-sm mb-2">Trading Volume (24h)</h4>
                  <p className="text-white text-xl font-bold">{formatMarketCap(coin.total_volume)}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-gray-400 text-sm mb-2">Circulating Supply</h4>
                  <p className="text-white text-xl font-bold">{formatSupply(coin.circulating_supply)}</p>
                  <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                </div>

                {coin.total_supply && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-gray-400 text-sm mb-2">Total Supply</h4>
                    <p className="text-white text-xl font-bold">{formatSupply(coin.total_supply)}</p>
                  </div>
                )}

                {coin.max_supply && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-gray-400 text-sm mb-2">Max Supply</h4>
                    <p className="text-white text-xl font-bold">{formatSupply(coin.max_supply)}</p>
                  </div>
                )}

                {coin.fully_diluted_valuation && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-gray-400 text-sm mb-2">Fully Diluted Valuation</h4>
                    <p className="text-white text-xl font-bold">{formatMarketCap(coin.fully_diluted_valuation)}</p>
                  </div>
                )}
              </div>

              {/* Price Ranges */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Price Range (24h)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-red-400 text-sm mb-1">24h Low</p>
                    <p className="text-white text-2xl font-bold">{formatPrice(coin.low_24h)}</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm mb-1">24h High</p>
                    <p className="text-white text-2xl font-bold">{formatPrice(coin.high_24h)}</p>
                  </div>
                </div>
              </div>

              {/* All Time High/Low */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-green-400 text-lg font-semibold mb-3">All Time High</h4>
                  <p className="text-white text-2xl font-bold mb-2">{formatPrice(coin.ath)}</p>
                  <p className={`text-sm ${
                    coin.ath_change_percentage >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatPercentage(coin.ath_change_percentage)} from ATH
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(coin.ath_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-red-400 text-lg font-semibold mb-3">All Time Low</h4>
                  <p className="text-white text-2xl font-bold mb-2">{formatPrice(coin.atl)}</p>
                  <p className={`text-sm ${
                    coin.atl_change_percentage >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatPercentage(coin.atl_change_percentage)} from ATL
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(coin.atl_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              {coinDetail?.description?.en && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">About {coin.name}</h3>
                  <div 
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: coinDetail.description.en.split('. ').slice(0, 3).join('. ') + '.'
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};