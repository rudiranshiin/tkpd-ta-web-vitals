import React from 'react';
import { useData } from 'react-isomorphic-data';
import { Link } from 'react-router-dom';

import Header from '../../../components/Header';
import RatingReview from '../../../components/RatingReview';
import Footer from '../../../components/Footer';

const productWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: '1em 0',
};

const productCard = {
  width: '40%',
  position: 'relative',
  marginRight: '10px',
  marginBottom: '10px',
  boxShadow: '0 1px 6px 0 rgb(255 255 255 / 0.32)',
  borderRadius: '8px',
	textDecoration: 'none',
	color: '#fff',
	cursor: 'pointer',
};

const productImg = {
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
};

const productInfo = {
  padding: '10px',
  textAlign: 'left',
};

const productName = {
  fontWeight: 'bold',
};

const productPrice = {
	color: '#ff5722',
	fontSize: '14px',
  marginTop: '5px',
};

const { API_URL } = process.env;

function Home() {
  const { data, loading } = useData(`${API_URL}/products`, {}, { method: 'GET' }, { ssr: true });

  return (
    <div className="App" data-testid="home-container">
      <Header />
      <main className="main">
        {!loading && data && (
          <div className="products" style={productWrapper}>
            {data.data.map(item => (
              <Link className="product" style={productCard} key={item.id} to={`/${item.id}`}>
                <img className="product__img" style={productImg} src={item.image} alt={item.name}></img>
                <div style={productInfo}>
                  <div style={productName}>{item.name}</div>
                  <div style={productPrice}>{item.price}</div>
                  <RatingReview ratingCount={item.rating} reviewCount={item.review} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
