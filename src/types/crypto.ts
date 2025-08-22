export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CoinDetail extends CryptoCoin {
  description?: {
    en: string;
  };
  links?: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
  };
  market_data?: {
    price_change_percentage_7d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_1y?: number;
  };
}

export interface PortfolioItem {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}