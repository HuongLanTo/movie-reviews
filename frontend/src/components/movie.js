import React, { useEffect, useState } from "react";
import MovieDataService from "../services/movies.js";
import moment from "moment";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const getMovie = (id) => {
    MovieDataService.getMovie(id)
      .then((res) => {
        setMovie({
          ...res.data,
          poster: res.data.poster ? res.data.poster : "/images/movie.avif",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then((res) => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container className="text-start">
        <Row>
          <Col className="me-5">
            <Image src={movie.poster} width={"100%"} height={"100%"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h3" className="fw-bold">
                {movie.title}
              </Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h3 className="text-decoration-underline">Reviews:</h3>
            {movie.reviews.map((review, index) => {
              return (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <h5>
                      {review.name + " reviewed on "}{" "}
                      {moment(review.date).format("Do MMM YYYY")}
                    </h5>

                    <p>{review.review}</p>
                    {props.user && props.user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/movies/" + props.match.params.id + "/review",
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
