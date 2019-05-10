import React, { Fragment } from 'react';

const Ratings = ({ rating, starSize }) => {
  const generateStars = () => {
    const generatedStars = [];
    let count = 0;
    while (count < rating) {
      generatedStars.push('s');
      count++;
    }
    return generatedStars;
  };

  return (
    <Fragment>
      {generateStars().map((str, idx) => (
        <i
          key={idx}
          className={`fas fa-star ${starSize}`}
          style={{ color: 'yellow' }}
        />
      ))}
    </Fragment>
  );
};

export default Ratings;
