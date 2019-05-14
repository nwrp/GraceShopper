import React, { Fragment } from 'react';

const Ratings = ({ rating, starSize }) => {
  const generateStars = () => {
    const stars = [];
    let count = 0;
    while (count < rating) {
      stars.push(true);
      count++;
    }
    while (stars.length < 5) {
      stars.push(false);
    }
    return stars;
  };

  return (
    <Fragment>
      {generateStars().map((star, idx) =>
        (star ? (
          <i
            key={idx}
            className={`fas fa-star ${starSize}`}
            style={{ color: "#f9c914" }}
          />
        ) : (
          <i
            key={idx}
            className={`far fa-star ${starSize}`}
            style={{ color: "#f9c914" }}
          />
        )))}
    </Fragment>
  );
};

export default Ratings;
