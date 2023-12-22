import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-container">
      <div className="card-inner-container">
        <div className="card-header">
          <h2>{props.title}</h2>
        </div>
        <div className="card-body">
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
