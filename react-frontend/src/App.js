import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DealScout API Backend</h1>
        <p>This is a simple placeholder page for the DealScout frontend.</p>
        <p>The main functionality is implemented through the REST API endpoints.</p>
        <div className="api-links">
          <h2>API Endpoints</h2>
          <ul>
            <li><a href="/api/products/">Products API</a></li>
            <li><a href="/api/featured-deals/">Featured Deals API</a></li>
            <li><a href="/api/trending-products/">Trending Products API</a></li>
            <li><a href="/api/filter-options/">Filter Options API</a></li>
            <li><a href="/api/swagger/">API Documentation (Swagger)</a></li>
            <li><a href="/api/redoc/">API Documentation (ReDoc)</a></li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;