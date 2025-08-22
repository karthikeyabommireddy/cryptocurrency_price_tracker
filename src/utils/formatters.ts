export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

export const formatVolume = formatMarketCap;

export const formatPercentage = (percentage: number): string => {
  const abs = Math.abs(percentage);
  if (abs < 0.01) {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(4)}%`;
  } else {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  }
};

export const formatSupply = (supply: number): string => {
  if (supply >= 1e9) {
    return `${(supply / 1e9).toFixed(2)}B`;
  } else if (supply >= 1e6) {
    return `${(supply / 1e6).toFixed(2)}M`;
  } else if (supply >= 1e3) {
    return `${(supply / 1e3).toFixed(2)}K`;
  } else {
    return supply.toLocaleString();
  }
};