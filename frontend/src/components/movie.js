import React, { useEffect, useState } from "react";
import MovieDataService from "../services/movies.js";

import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'; 
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

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

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster} width={"500px"} height={"100%"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
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
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
