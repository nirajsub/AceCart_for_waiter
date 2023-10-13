import React, { useState } from "react";
import { Link } from "react-router-dom";


function Summary() {
  const [review, setReview] = useState({
    name: "",
    text: "",
    foodRating: "",
    waiterRating: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setReview(prevReview => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Form submitted:", review);
    // Perform any additional logic, such as sending the review to an API
    setReview({
      name: "",
      text: "",
      foodRating: "",
      waiterRating: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
        <h1 className='checkout-heading'>Review Form</h1>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={review.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Food Rating:
        <select
          name="foodRating"
          value={review.foodRating}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label>
        Waiter Rating:
        <select
          name="waiterRating"
          value={review.waiterRating}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label>
        Review:
        <textarea
          name="text"
          value={review.text}
          onChange={handleChange}
          required
        />
      </label>
      <Link to="/">
      <button type="submit">Submit Review</button>
      </Link>
    </form>
  );
}

export default Summary;
