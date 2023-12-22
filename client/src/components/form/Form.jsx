import React, { useState } from "react";

import "./Form.css";
import axios from "axios";

const Form = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePost = async () => {
    if (!formData.title || !formData.description) {
      return;
    }
    await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}post/create`,
      formData
    );
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <div className="form-inner-container">
        <div className="form-header">
          <h2 className="dsv-input-header">Enter the details here</h2>
        </div>
        <div className="form-inputs">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="dsv-input-box"
          />
          <textarea
            rows="4"
            cols="35"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="dsv-input-box"
          />
        </div>
        <div className="form-action">
          <button className="dsv-button form-btn" onClick={handlePost}>
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
