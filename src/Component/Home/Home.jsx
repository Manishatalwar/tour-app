import React,{useState} from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Avatar } from '@mui/material';

import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './Home.css';
import avatar1 from "../../assets/images/banner-01.jpg";
import avatar2 from "../../assets/images/banner-02.jpg";
import avatar3 from "../../assets/images/banner-03.jpg";
import FeaturedList from '../FeaturedList/FeaturedList';
import BookingDetails from '../BookingDetails/BookingDetails';
import items from "../../assets/data/data.json";


const Home = () => {
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const openBookingDetails = (item) => {
    if (!isLoggedIn) {
      // Show a SweetAlert2 modal asking the user to sign in
      Swal.fire({
        title: 'Please sign in!',
        html: 'To explore more, please <a href="/sign-in">sign in</a>/<a href="/register">Register</a>.',
        icon: 'warning',
       
        confirmButtonText: 'OK',
      
      });
    } else {
      setSelectedItem(item);
      setBookingDetailsOpen(true);
     }
    
  };

  const closeBookingDetails = () => {
    setSelectedItem(null);
    setBookingDetailsOpen(false);
  };
  


  return (
    <div className="homepage">
          <div className="additional-content">
        <div className="section-content">
        <h1>This Is Our Tour Wonderland </h1>
        <h3 className="section-subcontent">
        Welcome to a mesmerizing journey through our Tour Wonderland. Immerse yourself in the captivating beauty of destinations that tell stories of ancient civilizations and modern wonders. Our curated tours offer an unforgettable experience, blending history, culture, and breathtaking landscapes. Join us as we explore the world, creating memories that last a lifetime. Lorem Ipsum is simply dummy text of the printing and typesetting industry, providing you with a glimpse into the extraordinary adventures that await you. Let the
   magic of travel unfold as you embark on a journey filled with discovery, wonder, and unparalleled moments.
</h3>

        </div>
        
        <div className="rounded-images">
          <img alt="Avatar 1" src={avatar1} className="avatar" />
          <img alt="Avatar 2" src={avatar2} className="avatar" />
          <img alt="Avatar 3" src={avatar3} className="avatar" />
        </div>
      </div>

      <h1 className='text-center'>Explore Top Destinations by Region</h1>
<FeaturedList/>
      {/* <SearchBar/> */}
      <h1 className='text-center'>Explore Our Feature Tour Packages</h1>      <div className='sub-container'>
      <Grid container spacing={3}>
        {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} >
            <Card style={{ height: '540px' }}>
              <CardMedia
                component="img"
                height="300"
                image={item?.photo}
                alt={item?.title}
              />
           <div >
      <div className="card-title">{item.title}</div>
      <div className="city-name">City Name: {item.city}</div>
      <div className="address">Address: {item.address}</div>
      <div className="description">{item.desc}</div>
   
      <button className="button" onClick={() => openBookingDetails(item)}>Book Now</button>
    </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BookingDetails open={bookingDetailsOpen} onClose={closeBookingDetails} item={selectedItem} />
      </div>

    </div>
  );
};

export default Home;
