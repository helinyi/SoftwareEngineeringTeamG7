# Tech Product Comparison Website

A modern web application that allows users to browse, compare, and make informed decisions about technology products. This platform provides detailed product specifications, side-by-side comparisons, and price tracking across multiple vendors.

## Overview

This project is a front-end implementation of a product comparison platform focused on technology products. The application is built with React and features responsive design optimized for desktop displays.

## Features

- **Product Search** - Interactive grid layout with filtering and sorting
- **Product Details** - Comprehensive product information with specifications, pricing, and reviews
- **Product Comparison** - Side-by-side comparison with feature highlighting
- **Responsive UI** - Desktop-optimized interface with consistent design

## Technologies Used

- **React.js** - Front-end UI library
- **React Router** - Navigation and routing
- **CSS** - Custom styling with Grid and Flexbox
- **React Icons** - Icon components
- **React Hooks** - State management
- **JavaScript ES6+** - Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/helinyi/SoftwareEngineeringTeamG7.git
   cd SoftwareEngineeringTeamG7
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
src/
├── components/        # React components
│   ├── Filter.js             # Filtering components
│   ├── FilterSidebar.js      # Sidebar with filters
│   ├── Navbar.js             # Navigation bar
│   ├── ProductCard.js        # Individual product card
│   ├── ProductComparison.js  # Side-by-side comparison
│   ├── ProductDetail.js      # Detailed product view
│   ├── ProductGrid.js        # Grid display of products
│   └── ... other components
├── styles/            # Component-specific CSS files
├── App.js             # Main application component
└── index.js           # Application entry point
```

## Usage

### Search and Filter Products
- Use the filter sidebar to refine by price range, category, brand, or ratings
- Sort products by relevance, price, ratings, or release date
- Click any product card to view its detailed information

### View Product Details
- Navigate through tabbed sections showing specifications, pricing, and reviews
- Compare current product with other similar products

### Compare Products
- Select multiple products to view a side-by-side comparison
- Easily identify superior specifications highlighted automatically
- View organized comparison by categories (specs, features, pricing)

## Implementation Details

### Key Technical Features
- Modular component architecture for maintainability
- CSS fixed aspect ratios for consistent product image display
- Specification-matching algorithm for accurate comparisons
- Mock data implementation simulating database integration

### Responsive Design
- Desktop-first design approach with defined breakpoints
- Accessible interface with keyboard navigation support
- High contrast text and semantic HTML structure

## Future Roadmap

- Back-end integration
- User authentication and accounts
- Price history tracking
- User reviews and ratings
- Mobile optimization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from leading tech comparison websites
- Mock product data based on real specifications
