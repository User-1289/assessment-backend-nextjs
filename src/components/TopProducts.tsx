"use client";
import React, { useEffect, useState } from 'react';

interface TopProduct {
  productId: number;
  productName: string;
  price: number;
  salesCount: number;
  totalRevenue: number;
}

const TopProducts: React.FC = () => {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/top-products');
        if (!response.ok) {
          throw new Error('Failed to fetch top products data');
        }
        const data: TopProduct[] = await response.json();
        // Sort products by sales count in descending order
        const sortedProducts = data.sort((a, b) => b.salesCount - a.salesCount);
        setTopProducts(sortedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  const calculatePopularityPercentage = (product: TopProduct, index: number) => {
    if (topProducts.length === 0) return 0;
    const maxSales = Math.max(...topProducts.map(p => p.salesCount));
    return Math.round((product.salesCount / maxSales) * 100);
  };

  const getProgressBarColor = (index: number) => {
    const colors = [
      '#3B82F6', // Blue
      '#22C55E', // Green
      '#8B5CF6', // Purple
      '#F59E0B', // Orange
    ];
    return colors[index % colors.length];
  };

  const getPercentageBadgeColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-600 border-blue-200',
      'bg-green-100 text-green-600 border-green-200',
      'bg-purple-100 text-purple-600 border-purple-200',
      'bg-orange-100 text-orange-600 border-orange-200',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading top products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Top Products</h2>
      
      <div className="overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-6 pb-4 mb-6 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-400">#</div>
          <div className="text-sm font-medium text-gray-400">Name</div>
          <div className="text-sm font-medium text-gray-400">Popularity</div>
          <div className="text-sm font-medium text-gray-400 text-right">Sales</div>
        </div>

        {/* Product Rows */}
        <div className="space-y-6">
          {topProducts.slice(0, 4).map((product, index) => {
            const popularityPercentage = calculatePopularityPercentage(product, index);
            const progressColor = getProgressBarColor(index);
            const badgeColor = getPercentageBadgeColor(index);

            return (
              <div key={product.productId} className="grid grid-cols-4 gap-6 items-center">
                {/* Rank */}
                <div className="text-lg font-medium text-gray-600">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Product Name */}
                <div className="text-base font-medium text-gray-800">
                  {product.productName}
                </div>

                {/* Popularity Bar */}
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: progressColor,
                        width: `${popularityPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Sales Percentage */}
                <div className="flex justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${badgeColor}`}
                  >
                    {popularityPercentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
