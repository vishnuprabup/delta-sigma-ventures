import React from "react";

import "./Card.css";
import { limitWords } from "../../utils/authUtils";

const Card = (props) => {
  const truncatedDescription = limitWords(props.description, 50);
  return (
    <div className="card-container">
      <div className="card-inner-container">
        <div className="card-header">
          <h2>{props.title}</h2>
        </div>
        <div className="card-body">
          <p>{truncatedDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
