import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PriceChart from '../components/PriceChart';
import ProductCard from '../components/ProductCard';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productRes, relatedRes] = await Promise.all([
          axios.get(`/api/products/${id}/`),
          axios.get(`/api/products/${id}/related/`)
        ]);
        
        setProduct(productRes.data);
        setRelatedProducts(relatedRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product data');
        setLoading(false);
        console.error('Error fetching product data:', err);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex text-sm">
          <li className="mr-2">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="mr-2">
            <Link to="/products" className="text-primary hover:underline">
              Products
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-500">{product.name}</li>
        </ol>
      </nav>

      {/* Product info */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="mb-4">
              <span className="text-gray-600">Brand: </span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600">Category: </span>
              <span className="font-medium">{product.category?.name}</span>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Price listings */}
            <h2 className="text-lg font-semibold mb-3">Available at:</h2>
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Retailer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.listings
                    .filter(listing => listing.in_stock)
                    .sort((a, b) => a.current_price - b.current_price)
                    .map(listing => (
                      <tr key={listing.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {listing.retailer_logo ? (
                              <img
                                src={listing.retailer_logo}
                                alt={listing.retailer_name}
                                className="h-6 w-auto mr-2"
                              />
                            ) : null}
                            <span>{listing.retailer_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-primary font-semibold">
                              ${listing.current_price}
                            </span>
                            {listing.discount_percentage > 0 && (
                              <span className="text-gray-500 text-sm line-through">
                                ${listing.original_price}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {listing.discount_percentage > 0 ? (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                              {listing.discount_percentage}% OFF
                            </span>
                          ) : (
                            <span className="text-gray-500 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <a
                            href={listing.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark font-medium text-sm"
                          >
                            Buy Now
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Price History */}
      <div className="mb-10">
        <PriceChart productId={id} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetailPage;