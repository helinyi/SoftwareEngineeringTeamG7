# Tech Product Comparison Website

A modern, responsive web application that allows users to browse, compare, and review various technology products. This platform enables side-by-side product comparisons, detailed specification viewing, and price comparison across multiple vendors.

![Product Comparison Website Screenshot](./screenshot.png)

## Features

### Search and Discovery
- Responsive product grid with filter sidebar
- Advanced filtering by price range, brand, category, and ratings
- Dynamic price slider with custom range input
- Sort products by relevance, price, rating, and recency

### Product Details
- Comprehensive product information pages
- Quick specifications overview with clean, structured layout
- Detailed specifications organized by categories
- Product reviews with rating breakdown
- Price comparison across multiple vendors

### Product Comparison
- Side-by-side comparison of product specifications
- Intelligent highlighting of superior specifications
- Consistent image presentation with fixed aspect ratios
- Category-based organization of specifications
- Smart recommendations based on features and price

### Responsive Design
- Mobile-optimized interface
- Tablet and desktop layouts
- Consistent user experience across devices
- Touch-friendly controls for mobile users

## Technologies Used

- React.js for component-based UI
- React Router for navigation
- CSS with Grid and Flexbox for responsive layouts
- React Icons for iconography
- React Hooks for state management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tech-product-comparison.git
   cd tech-product-comparison
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Project Structure

```
src/
├── components/        # React components
│   ├── FilterSidebar.js
│   ├── ProductComparison.js
│   ├── ProductDetail.js
│   ├── ProductGrid.js
│   ├── ProductList.js
│   ├── ProductPricing.js
│   ├── ProductReviews.js
│   ├── ProductSpecifications.js
│   └── Sidebar.js
├── styles/            # Component-specific CSS files
├── App.js             # Main application component
└── index.js           # Application entry point
```

## Usage

### Browsing Products
- Navigate to the home page to view all products
- Use the filter sidebar to narrow down products by category, price, brand, or rating
- Click on a product card to view detailed information

### Viewing Product Details
- The product detail page shows comprehensive information about a product
- Switch between tabs to view specifications, pricing, and reviews
- Click "Compare with another product" to initiate a comparison

### Comparing Products
- From a product detail page, click "Compare with another product"
- Select another product from the same category to compare with
- View the side-by-side comparison highlighting the differences
- Use the conclusion section to see recommendations

## Future Enhancements

- User authentication and personalized recommendations
- Save favorite products and comparisons
- Price history tracking with charts
- User-generated reviews and ratings
- Email notifications for price drops

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from major tech comparison websites
- Mock data based on real product specifications
