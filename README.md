# CryptoTracker Pro

A comprehensive, real-time cryptocurrency tracking application built with React, TypeScript, and Tailwind CSS. Monitor market trends, manage your portfolio, and stay updated with the latest crypto prices.

<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/3eddf17c-d2d9-486d-9f80-f93a8aa96119" />


## 🚀 Live Demo

**[View Live Application](https://cryptopricetrackerbykarthikeya.netlify.app/)**

## ✨ Features

### 📊 Real-Time Market Data
- Live cryptocurrency prices with 30-second auto-refresh
- Market cap, volume, and 24h change tracking
- Price trend indicators with color-coded visualization
- Top 100 cryptocurrencies by market cap

### 🔍 Advanced Search & Filtering
- Real-time search by coin name or symbol
- Sort by market cap, price, or 24h change
- Instant results with responsive filtering

### 💼 Portfolio Management
- Track your cryptocurrency investments
- Add holdings with purchase price and amount
- Real-time profit/loss calculations
- Portfolio value tracking with percentage changes

### ⭐ Watchlist Functionality
- Save favorite cryptocurrencies
- Quick access to monitored coins
- Persistent storage across sessions

### 📱 Detailed Coin Information
- Comprehensive coin statistics
- All-time high/low prices
- Market data including supply information
- Historical price change percentages
- Coin descriptions and key metrics

### 🎨 Modern UI/UX
- Dark theme with gradient accents
- Responsive design for all devices
- Smooth animations and hover effects
- Professional card-based layout
- Glass-morphism design elements

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: CoinGecko API
- **Storage**: Local Storage for persistence
- **Deployment**: Bolt Hosting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <>
   cd cryptocurrency_price_tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CoinCard.tsx    # Individual coin display card
│   ├── CoinDetail.tsx  # Detailed coin modal
│   ├── PortfolioModal.tsx # Portfolio management
│   ├── SearchBar.tsx   # Search functionality
│   └── LoadingSpinner.tsx # Loading states
├── hooks/              # Custom React hooks
│   ├── useCrypto.ts    # Cryptocurrency data management
│   └── usePortfolio.ts # Portfolio state management
├── types/              # TypeScript type definitions
│   └── crypto.ts       # Cryptocurrency interfaces
├── utils/              # Utility functions
│   └── formatters.ts   # Number and currency formatting
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

This application uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch real-time cryptocurrency data:

- **Endpoint**: `https://api.coingecko.com/api/v3/coins/markets`
- **Rate Limit**: No API key required for basic usage
- **Update Frequency**: Every 30 seconds
- **Data Coverage**: Top 100 cryptocurrencies by market cap

## 💾 Data Persistence

- **Portfolio**: Stored in browser's localStorage
- **Watchlist**: Persistent across browser sessions
- **Settings**: Automatically saved user preferences

## 🎯 Key Components

### CoinCard
Displays individual cryptocurrency information with:
- Current price and 24h change
- Market cap and trading volume
- Price range (high/low)
- Watchlist toggle functionality

### Portfolio Management
- Add/remove holdings
- Track purchase prices
- Calculate profit/loss
- Real-time value updates

### Search & Filtering
- Instant search results
- Multiple sorting options
- Responsive filtering

## 🚀 Deployment

The application is deployed on Bolt Hosting and automatically builds from the main branch.

### Build Process
```bash
npm run build
```

### Environment Variables
No environment variables required - the app uses public APIs.

## 🔮 Future Enhancements

- [ ] Price alerts and notifications
- [ ] Historical price charts
- [ ] Multiple currency support
- [ ] Export portfolio data
- [ ] Advanced analytics dashboard
- [ ] Social features and community insights
- [ ] Mobile app version
- [ ] Dark/light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for providing free cryptocurrency API
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Pexels](https://www.pexels.com/) for stock photography

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React and TypeScript**
