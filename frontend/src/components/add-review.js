import React, { useState } from "react";
import MovieDataService from "../services/movies.js";

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = (props) => {
  let editing = false;
  let initialReviewState = "";

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: props.match.params.id,
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then((res) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((res) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link
            to={"/movies/" + props.match.params.id}
            className="cursor-pointer"
          >
            Back to Movie
          </Link>
        </div>
      ) : (
        <Form style={{ position: "relative", left: "30%", width: "500px" }}>
          <Form.Group>
            <Form.Label className="fw-bold mb-4 mt-3" as="h4">
              {editing ? "Edit" : "Create"} Review
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
              className="mb-4"
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
