import React from 'react';
import { Carousel } from 'react-bootstrap';

const Gallery = () => {
  const urls = [
    'https://www.expatkings.com/wp-content/uploads/2017/05/black-guy-doing-push-ups-1-resized.jpg',
    'https://23u0pr24qn4zn4d4qinlmyh8-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/pushups_caro_original_44071.jpg',
    'https://www.ebony.com/wp-content/uploads/2016/07/stretching_caro_original_44251.jpg',
    'https://cdn7.dissolve.com/p/D18_163_002/D18_163_002_0004_600.jpg',
    'http://sosweat-production.s3.amazonaws.com/wp-content/uploads/2018/06/exercise4.jpg'
  ];
  return (
    <Carousel controls={false} indicators={false}>
      {urls.map(url => (
        <Carousel.Item key={url}>
          <img
            className="d-block "
            src={url}
            alt="First slide"
            style={{ maxHeight: '250px', width: 'auto' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Gallery;
