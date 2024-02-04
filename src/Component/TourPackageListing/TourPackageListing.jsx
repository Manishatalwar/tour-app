
import React, { useState, useEffect, useCallback, useRef } from 'react';
import "./TourPackageListing.css";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import SearchBox from '../SearchBar/SearchBar';
import BookingDetails from '../BookingDetails/BookingDetails';

const items = [
  {
    title: "Westminster Bridge",
    city: "London",
    address: "Westminster Bridge, London, United Kingdom",
    distance: 300,
    price: "$99",
    desc: "Explore the iconic Westminster Bridge and marvel at the breathtaking views of London. A perfect blend of history and modernity awaits you.",
    photo: "https://images.unsplash.com/photo-1706689071171-17f3cfe51a51?q=80&w=1785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true
  },
  {
    title: "Bali, Indonesia",
    city: "Bali",
    address: "Ubud, Gianyar, Bali, Indonesia",
    distance: 400,
    price: "$99",
    desc: "Embark on a magical journey through the enchanting landscapes of Bali, Indonesia. Immerse yourself in the vibrant culture and stunning natural beauty.",
    photo: "https://media.istockphoto.com/id/1047800728/photo/mother-and-kids-sightseeing-city-of-siena-tuscany-italy.jpg?s=2048x2048&w=is&k=20&c=DhwPhJYK-EUORU2It7Gh6dAQg6fByK_5qpbrAA42N9A=",
    featured: true
  },
  {
    title: "Snowy Mountains, Thailand",
    city: "Bangkok",
    address: "Doi Inthanon, Chom Thong District, Chiang Mai, Thailand",
    distance: 500,
    price: "$99",
    desc: "Experience the serenity of the Snowy Mountains in Thailand. Discover the beauty of Doi Inthanon and embrace the tranquility of nature.",
    photo: "https://media.istockphoto.com/id/1325633352/photo/mohenjo-daro-stupa-remains-and-ruins-of-ancient-city-of-indus-valley-civilisation.jpg?s=2048x2048&w=is&k=20&c=scidLqUn_cBsL0O8wH371IxNiDRbyjQZmxC3jJDPGR8=",
    featured: true
  },
  {
    title: "Beautiful Sunset, Santorini",
    city: "Santorini",
    address: "Oia, Santorini, Greece",
    distance: 600,
    price: "$129",
    desc: "Witness the enchanting sunset at Oia, Santorini. Lose yourself in the captivating beauty of the Aegean Sea and the charming streets of the island.",
    photo: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    title: "Northern Lights, Iceland",
    city: "Reykjavik",
    address: "Somewhere in Iceland",
    distance: 700,
    price: "$149",
    desc: "Embark on a journey to witness the mesmerizing Northern Lights in Reykjavik, Iceland. A celestial spectacle awaits you under the Arctic sky.",
    photo: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    featured: false
  },
  {
    title: "Grand Canyon Adventure",
    city: "Arizona",
    address: "Somewhere in Arizona",
    distance: 800,
    price: "$169",
    desc: "Embark on an adventurous journey to explore the wonders of the Grand Canyon in Arizona. A breathtaking experience awaits you in the heart of nature.",
    photo: "https://media.istockphoto.com/id/1089327490/photo/man-on-top-of-horseshoe-bend.jpg?s=2048x2048&w=is&k=20&c=hL5rjngNtRASKMytbPjsNebxQI_Egapnhv-TKB5RU1s=",
    featured: false
  },
  {
    title: "Great Wall Expedition",
    city: "Beijing",
    address: "Somewhere in Beijing",
    distance: 900,
    price: "$189",
    desc: "Embark on a historical expedition along the Great Wall of China in Beijing. Discover the architectural marvel and rich history of this iconic structure.",
    photo: "https://media.istockphoto.com/id/483375208/photo/jetty-to-the-world-monuments.jpg?s=2048x2048&w=is&k=20&c=gYUSlq5MXuPzNVFlzIAtTsrxJIh9Fq0TnZMMzm2olMQ=",
    featured: false
  },
  {
    title: "Amazon Rainforest Trek",
    city: "Manaus",
    address: "Somewhere in Brazil",
    distance: 1000,
    price: "$209",
    desc: "Embark on an exhilarating trek through the Amazon Rainforest in Manaus, Brazil. Immerse yourself in the biodiversity and natural wonders of the jungle.",
    photo: "https://media.istockphoto.com/id/1958066151/photo/humayuns-tomb-is-located-in-new-delhi-india.jpg?s=2048x2048&w=is&k=20&c=oEe4Xr-ozy6jLmxeJlPyMh0oCD4_D74A01boY74VKro=",
    featured: false
  },
  {
    title: "Mystical Machu Picchu",
    city: "Cusco",
    address: "Somewhere in Peru",
    distance: 1100,
    price: "$229",
    desc: "Embark on a mystical journey to Machu Picchu in Cusco, Peru. Discover the ancient ruins and breathtaking landscapes of this UNESCO World Heritage site.",
    photo: "https://media.istockphoto.com/id/177079695/photo/hawa-mahals-balcony.jpg?s=2048x2048&w=is&k=20&c=G3FkJyxfpEQA9VC5LAQ4nNw4UkX8ZS--NxsJ14Nnmy0=",
    featured: false
  },
  {
    title: "Sydney Harbor Cruise",
    city: "Sydney",
    address: "Somewhere in Australia",
    distance: 1200,
    price: "$249",
    desc: "Embark on a scenic cruise through the iconicSydney Harbor in Australia. Witness the breathtaking views of the Opera House and Harbour Bridge as you cruise along the pristine waters.",
    photo: "https://media.istockphoto.com/id/92131520/photo/deck-with-a-view.webp?b=1&s=170667a&w=0&k=20&c=UNo_TQdJN3iwfz326jEX_aLIeFNWgSxKb6_Kn_KkbN8=",
    featured: false
  },
  {
    title: "Tokyo City Lights",
    city: "Tokyo",
    address: "Somewhere in Tokyo",
    distance: 1300,
    price: "$269",
    desc: "Experience the vibrant nightlife and dazzling city lights of Tokyo. Explore the bustling streets and witness the modern charm of Japan's capital.",
    photo: "https://media.istockphoto.com/id/990790360/photo/kabukicho-district.jpg?s=2048x2048&w=is&k=20&c=JwPrcWI4FRj_OBxFec4ycOoGDRZ1FCAgSlgNcrC4ZsI=",
    featured: false
  },
  {
    title: "Aurora Borealis, Norway",
    city: "Oslo",
    address: "Somewhere in Norway",
    distance: 1400,
    price: "$289",
    desc: "Chase the mesmerizing Aurora Borealis in Norway. Witness the dancing lights in the night sky and immerse yourself in the magical atmosphere.",
    photo: "https://media.istockphoto.com/id/614127332/photo/aurora-borealis.jpg?s=2048x2048&w=is&k=20&c=fCE03h56hBELmIpYuIfq3abDjbK6c4U1SwLgkSaUGCI=",
    featured: false
  },
  {
    title: "Venice Canals",
    city: "Venice",
    address: "Somewhere in Venice",
    distance: 1500,
    price: "$299",
    desc: "Embark on a romantic gondola ride through the enchanting canals of Venice. Experience the timeless beauty and charm of this iconic Italian city.",
    photo:"https://media.istockphoto.com/id/1475268443/photo/sydney-skyline-from-the-harbour-bridge-in-australia.jpg?s=2048x2048&w=is&k=20&c=ow-UIJGlfNPPFGvgCczSD9NmmpKzWelQQxz_3ZxYRL8=",
    featured: false
  },
  {
    title: "New York City Skyline",
    city: "New York",
    address: "Somewhere in New York",
    distance: 1600,
    price: "$309",
    desc: "Admire the iconic skyline of New York City. Take in the breathtaking views of skyscrapers and landmarks that define the city that never sleeps.",
    photo: "https://media.istockphoto.com/id/538811669/photo/manhattan-panorama-with-its-skyscrapers-illuminated-at-dusk-new-york.jpg?s=2048x2048&w=is&k=20&c=A23Ek2HSVBj5nXFQ7zGdGdc8XtQF0tskm_G-_KPMmZ4=",
    featured: false
  }
];





const TourPackageListing = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDistance, setSearchDistance] = useState('');
  const [searchError, setSearchError] = useState('');
  const [data, setData] = useState([]);

  const openBookingDetails = (item) => {
    setSelectedItem(item);
    setBookingDetailsOpen(true);
  };

  const closeBookingDetails = () => {
    setSelectedItem(null);
    setBookingDetailsOpen(false);
  };

  const filterItems = useCallback(() => {
    console.log("Filtering items");
    return items.filter(item => {
      const locationMatch = item?.city?.toLowerCase().includes(searchLocation?.toLowerCase());
      const distanceMatch = searchDistance === '' || item.distance <= parseFloat(searchDistance);
      return locationMatch && distanceMatch;
    });
  }, [searchLocation, searchDistance]);

  const handleSearch = () => {
    if (searchLocation && searchDistance) {
      const filteredItems = filterItems();
      setData(filteredItems);
    } 
   else if (!searchLocation && !searchDistance && filterItems) {
      
      setData(items);
    } 

    else {
      console.log("searchLocation",searchLocation);
      console.log("searchDistance",searchDistance);
     
      setSearchError('Both fields are required for search.');
    }
  };

  useEffect(() => {
    
    // Reset data when the component mounts
    setData(items);
  }, []);

  return (
    <div className='sub-container'>
      <SearchBox
        onLocationChange={(e) => setSearchLocation(e.target.value)}
        onDistanceChange={(e) => setSearchDistance(e.target.value)}
        onSearchClick={handleSearch}
       
      />
      {searchError && <div className="err-message">{searchError}</div>}
      <Grid container spacing={3}>

        {data && data.length > 0 ? data.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} >
            <Card style={{ height: '530px' }}>
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
        )) : null}
      </Grid>
      <BookingDetails open={bookingDetailsOpen} onClose={closeBookingDetails} item={selectedItem} />
    </div>
  );
};

export default TourPackageListing;
