'use client';
import { useState, useEffect } from 'react';
import Products from '../components/Products';
import Loading from '../cart/loading';
import { useSearchParams } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('Sort by:');
  const [filterOption, setFilterOption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const categoryFromURL = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);

      if (categoryFromURL) {
        setFilteredProducts(
          products.filter(
            (product: Product) => product.category === categoryFromURL
          )
        );
        setFilterOption(categoryFromURL);
      } else {
        setFilteredProducts(products);
      }
    };

    fetchProducts();
  }, [categoryFromURL]);

  useEffect(() => {
    let results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOption === 'Sort by:') {
      results.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'name-asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'name-desc') {
      results.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === 'rating-high') {
      results.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === 'rating-low') {
      results.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (sortOption === 'reviews-high') {
      results.sort((a, b) => b.rating.count - a.rating.count);
    } else if (sortOption === 'reviews-low') {
      results.sort((a, b) => a.rating.count - b.rating.count);
    } else if (sortOption === 'price-high') {
      results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'price-low') {
      results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (filterOption) {
      results = results.filter((product) => product.category === filterOption);
    }

    setFilteredProducts(results);
  }, [searchQuery, sortOption, filterOption, products]);

  return (
    <div className="font-jost min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-48">
      <div className=" text-black items-center mb-8 grid xsm:grid-cols-1 lg:grid-cols-3 gap-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg "
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border p-2 rounded-lg "
        >
          <option value="">Filter by:</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men&apos;s Clothing</option>
          <option value="women's clothing">Women&apos;s Clothing</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="Sort by:">Sort by:</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating-high">Rating (High to Low)</option>
          <option value="rating-low">Rating (Low to High)</option>
          <option value="reviews-high">Reviews (Most to Least)</option>
          <option value="reviews-low">Reviews (Least to Most)</option>
        </select>
      </div>
      <>
        {loading ? (
          <div className="flex justify-center items-center h-96 ">
            <Loading />
          </div>
        ) : (
          <div className="text-black grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 xl:gap-x-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => (
                <Products key={product.id} product={product} />
              ))
            ) : (
              <p className="text-xl ml-2">No products found.</p>
            )}
          </div>
        )}
      </>
    </div>
  );
}
