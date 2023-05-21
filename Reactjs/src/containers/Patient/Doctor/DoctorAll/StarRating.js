import React, { Component } from 'react';
import './StarRating.scss'

class StarRating extends Component {
  render() {
    const { rating, onRatingChange } = this.props;
    const stars = [1, 2, 3, 4, 5];

    const Star = ({ filled, onClick }) => (
      <span className='star-span'
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        {filled ? '★' : '☆'}
      </span>
    );

    return (
      <div>
        {stars.map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => onRatingChange(star)}
          />
        ))}
      </div>
    );
  }
}

export default StarRating;
