import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { CryptoCoin, PortfolioItem } from '../types/crypto';
import { formatPrice } from '../utils/formatters';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioItem[];
  coins: CryptoCoin[];
  onAddToPortfolio: (item: PortfolioItem) => void;
  onRemoveFromPortfolio: (index: number) => void;
  selectedCoin?: CryptoCoin | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  coins,
  onAddToPortfolio,
  onRemoveFromPortfolio,
  selectedCoin
}) => {
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCoin || !amount || !purchasePrice) return;

    const portfolioItem: PortfolioItem = {
      coinId: selectedCoin.id,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice),
      purchaseDate: new Date().toISOString()
    };

    onAddToPortfolio(portfolioItem);
    setAmount('');
    setPurchasePrice('');
  };

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const coin = coins.find(c => c.id === item.coinId);
      if (coin) {
        return total + (item.amount * coin.current_price);
      }
      return total;
    }, 0);
  };

  const calculateTotalCost = () => {
    return portfolio.reduce((total, item) => total + (item.amount * item.purchasePrice), 0);
  };

  const totalValue = calculatePortfolioValue();
  const totalCost = calculateTotalCost();
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = totalCost > 0 ? ((totalPnL / totalCost) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Portfolio</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Total Value</h3>
              <p className="text-white text-2xl font-bold">{formatPrice(totalValue)}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Total Cost</h3>
              <p className="text-white text-2xl font-bold">{formatPrice(totalCost)}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Total P&L</h3>
              <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPrice(totalPnL)}
              </p>
              <p className={`text-sm ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Add to Portfolio Form */}
          {selectedCoin && (
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-white text-lg font-semibold mb-4">
                Add {selectedCoin.name} to Portfolio
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="any"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Purchase Price</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder={formatPrice(selectedCoin.current_price)}
                    step="any"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Portfolio</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Portfolio Holdings */}
          <div className="space-y-4">
            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No holdings in your portfolio yet.</p>
                <p className="text-gray-500 text-sm mt-2">Click on a cryptocurrency and add it to get started.</p>
              </div>
            ) : (
              <>
                <h3 className="text-white text-lg font-semibold mb-4">Your Holdings</h3>
                {portfolio.map((item, index) => {
                  const coin = coins.find(c => c.id === item.coinId);
                  if (!coin) return null;

                  const currentValue = item.amount * coin.current_price;
                  const costBasis = item.amount * item.purchasePrice;
                  const pnl = currentValue - costBasis;
                  const pnlPercent = ((pnl / costBasis) * 100);

                  return (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <h4 className="text-white font-medium">{coin.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {item.amount} {item.symbol.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-medium">{formatPrice(currentValue)}</p>
                          <p className={`text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pnl >= 0 ? '+' : ''}{formatPrice(pnl)} ({pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                          </p>
                        </div>
                        
                        <button
                          onClick={() => onRemoveFromPortfolio(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};