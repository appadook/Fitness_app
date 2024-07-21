import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link }) => {
  return (
    <div className="card">
      <Link to={link} className="card-link">
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
