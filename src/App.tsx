import React, { useState, useMemo } from 'react';
import { TrendingUp, Wallet, RefreshCw, AlertCircle } from 'lucide-react';
import { useCrypto } from './hooks/useCrypto';
import { usePortfolio } from './hooks/usePortfolio';
import { SearchBar } from './components/SearchBar';
import { CoinCard } from './components/CoinCard';
import { CoinDetailModal } from './components/CoinDetail';
import { PortfolioModal } from './components/PortfolioModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CryptoCoin } from './types/crypto';

function App() {
  const { coins, loading, error, refetch } = useCrypto();
  const {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change'>('market_cap');

  const filteredAndSortedCoins = useMemo(() => {
    let filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.current_price - a.current_price;
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });
  }, [coins, searchQuery, sortBy]);

  const handleToggleWatchlist = (coinId: string) => {
    if (isInWatchlist(coinId)) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coinId);
    }
  };

  const handleAddToPortfolio = (coin: CryptoCoin) => {
    setSelectedCoin(coin);
    setShowPortfolio(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CryptoTracker Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPortfolio(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Wallet className="w-4 h-4" />
                <span>Portfolio</span>
                {portfolio.length > 0 && (
                  <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">
                    {portfolio.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={refetch}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-96">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search cryptocurrencies..."
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="market_cap">Market Cap</option>
                <option value="price">Price</option>
                <option value="change">24h Change</option>
              </select>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Total Coins</h3>
            <p className="text-white text-2xl font-bold">{coins.length}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Watchlist</h3>
            <p className="text-blue-400 text-2xl font-bold">{portfolio.length}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Top Gainer (24h)</h3>
            {coins.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-lg font-bold">
                  +{Math.max(...coins.map(c => c.price_change_percentage_24h)).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-gray-400 text-sm mb-2">Top Loser (24h)</h3>
            {coins.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-red-400 text-lg font-bold">
                  {Math.min(...coins.map(c => c.price_change_percentage_24h)).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="text-red-400 font-medium">Failed to load cryptocurrency data</h3>
                <p className="text-red-300 text-sm mt-1">{error}</p>
                <button
                  onClick={refetch}
                  className="mt-2 text-red-400 hover:text-red-300 text-sm underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          /* Coins Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isInWatchlist={isInWatchlist(coin.id)}
                onToggleWatchlist={handleToggleWatchlist}
                onClick={setSelectedCoin}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredAndSortedCoins.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No cryptocurrencies found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-400 hover:text-blue-300 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedCoin && (
        <CoinDetailModal
          coin={selectedCoin}
          isInWatchlist={isInWatchlist(selectedCoin.id)}
          onClose={() => setSelectedCoin(null)}
          onToggleWatchlist={handleToggleWatchlist}
          onAddToPortfolio={handleAddToPortfolio}
        />
      )}

      <PortfolioModal
        isOpen={showPortfolio}
        onClose={() => {
          setShowPortfolio(false);
          setSelectedCoin(null);
        }}
        portfolio={portfolio}
        coins={coins}
        onAddToPortfolio={addToPortfolio}
        onRemoveFromPortfolio={removeFromPortfolio}
        selectedCoin={selectedCoin}
      />
    </div>
  );
}

export default App;