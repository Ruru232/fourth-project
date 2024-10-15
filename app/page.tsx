import Categories from './components/Catergories';
import CustomerReviews from './components/Customer';
import FeaturedProducts from './components/Featured';
import Header from './components/Header';
import News from './components/News';

export default function Home() {
  return (
    <main>
      <Header />
      <Categories />
      <FeaturedProducts />
      <CustomerReviews />
      <News />
    </main>
  );
}
