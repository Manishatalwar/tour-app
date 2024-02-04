import React from 'react';
import '../styles/TourCard.css'; // Import your CSS file

const TourCard = () => {
  return (
    <div className="wrap-cards">
      {[...Array(6).keys()].map((index) => (
        <Card key={index} index={index} />
      ))}
    </div>
  );
};

const Card = ({ index }) => {
  const getSvgPoints = (index) => {
    // Add logic to determine the SVG points based on the index
    // You may need to adjust this logic to match the desired pattern
    // For now, I'm just returning a default value
    return "0,100 100,100 100,0";
  };

  const getSvgPath = (index) => {
    // Add logic to determine the SVG path based on the index
    // You may need to adjust this logic to match the desired pattern
    // For now, I'm just returning a default value
    return "M 0 560 Q 66.018 533.115 153.816 571.235 C 241.613 609.355 293.526 571.416 310 560 C 346.774 534.516 402.903 510.645 450 560 Q 497.097 609.355 600 560 L 600 600 L 0 600 L 0 560 Z";
  };

  return (
    <div className="card" style={{ width: '32%', maxWidth: '100%', marginBottom: '4rem' }}>
      <div className="wrap-image">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148703/dog-skateboard.jpg"
          alt="animals pictures"
        />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points={getSvgPoints(index)} />
        </svg>
      </div>
      <div className="contents">
        <h3>Lorem Ipsum Dolor sit amet</h3>
        <div className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
        </div>
      </div>
    </div>
  );
};

export default TourCard;
