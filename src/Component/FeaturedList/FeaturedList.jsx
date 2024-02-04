// FeaturedList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import './FeaturedList.css';
import data from "../../assets/data/featuredData.json"
const ExploreMoreComponent = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
};

const FeaturedList = ({}) => {
  const [selectedReligion, setSelectedReligion] = useState('All');
  const [exploreData, setExploreData] = useState(null);
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const filteredCards =
    selectedReligion === 'All' ? data.cards : data.cards.filter((card) => card.region === selectedReligion);
    const regions = [
      'All','Europe', 'North America', 'Asia', 'Africa', 'South America', 'Australia'
    ];
    
    const handleExploreClick = (clickedCard) => {
      if (!isLoggedIn) {
        Swal.fire({
          title: 'Please sign in!',
          html: 'To explore more, please <a href="/sign-in">sign in</a>/<a href="/register">Register</a>.',
          icon: 'warning',
         
          confirmButtonText: 'OK',
        
        });
      } else {
        // Redirect to the ExploreMoreComponent with specific card data
        navigate(`/explore-more/${clickedCard.id}`, { state: { clickedCard } });
      }
    };

  const Card = ({ id, imageUrl, title, subtitle, rating, price, subDescription,description, city }) => {
    return (
      <div className="featured-card">
        <div className="card-content">
          <img src={imageUrl} alt={title} width="230" height="200" style={{paddingRight: "11px"}}/>
          <span className="rating-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 1l2.4 5.5H18l-4 4.5 1.6 6.5-5-4.2L5.6 17l1.6-6.5-4-4.5H6.6z" />
            </svg>
            {rating}
          </span>
  
          <div className="card-overlay">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <p><strong>Price: </strong>{price}</p>
            <p><strong>Description: </strong>{description}</p>
          
            <button onClick={() => handleExploreClick({ id, title, subtitle, rating, price,subDescription, description, city, imageUrl })}>Explore More</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="featured-list">
      <div className="religion-buttons">
        {regions?.map((religion) => (
          <button
            key={religion}
            className={`religion-button ${selectedReligion === religion ? 'active' : ''}`}
            onClick={() => setSelectedReligion(religion)}
          >
            {religion}
          </button>
        ))}
      </div>

      <div className="card-map">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            subtitle={card.subtitle}
            rating={card.rating}
            description={card.description}
            price={card.price}
            city={card.city}
            subDescription={card.subDescription}
          />
        ))}
      </div>
      {exploreData && <ExploreMoreComponent data={exploreData} />}
    </section>
  );
};

export default FeaturedList;
