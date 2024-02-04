import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./ExploreMore.css";
import BookingDetails from '../BookingDetails/BookingDetails';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
const ExploreCard = ({ card, onBookClick }) => {
  console.log(card); 
  return (
    <div className="explore-card">
      <img className="card-image" src={card?.imageUrl} alt={card?.title} />

      <div className="card-content">
        <h6 className="card-title">{card?.title}</h6>
        <p className="card-subtitle">{card?.subtitle}</p>
        <p className="card-rating">Rating: {card?.rating}</p>
        <p className="card-price">Price: {card?.price}</p>
        <p className="card-description">{card?.description}</p>
        <p className="card-city">{card?.subDescription}</p>
   
      </div>
    </div>
  );
};

const ExploreMore = () => {
  const location = useLocation();
  const clickedCard = location?.state?.clickedCard;
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);

  const openBookingDetails = (item) => {
    setSelectedItem(item);
    setBookingDetailsOpen(true);
  };

  const closeBookingDetails = () => {
    setSelectedItem(null);
    setBookingDetailsOpen(false);
  };

  return (
    <>
    <h2 className="simple-text">Explore More About The City</h2>
      <Grid container spacing={3}>
        <Grid key={clickedCard?.id} item xs={16} sm={16} md={10}>
          <ExploreCard card={clickedCard} onBookClick={openBookingDetails} />
        </Grid>
      </Grid>
     
    </>
  );
};

export default ExploreMore;
