import React, { useEffect, useState } from "react";
import MovieDataService from "../services/movies.js";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    getMovies();
    getRatings();
  }, []);

  useEffect(() => {
    getMovies();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  const getMovies = () => {
    setCurrentSearchMode("");
    MovieDataService.getAll(currentPage)
      .then((res) => {
        setMovies(res.data.movies);
        setCurrentPage(res.data.page);
        setEntriesPerPage(res.data.entries_per_page);
      })
      .catch((e) => console.log(e));
  };

  const getRatings = () => {
    MovieDataService.getRatings()
      .then((res) => {
        setRatings(["All Ratings"].concat(res.data));
      })
      .catch((e) => console.log(e));
  };

  const onChangeSearchTitle = (e) => {
    const searchTitleVal = e.target.value;
    setSearchTitle(searchTitleVal);
  };

  const onChangeSearchRating = (e) => {
    const searchRatingVal = e.target.value;
    setSearchRating(searchRatingVal);
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((res) => {
        setMovies(res.data.movies);
      })
      .catch((e) => console.log(e));
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      getMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                className="my-3"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating, index) => {
                    return (
                      <option key={index} value={rating}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                className="my-3"
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {movies.map((movie) => {
            const poster = movie.poster ? movie.poster : "/images/movie.avif";
            return (
              <Col key={movie._id}>
                <Card style={{ width: "18rem" }} className="mx-2 my-4">
                  <Card.Img src={poster} width={"100px"} height={"370px"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <br />
        <p className="mb-1">Showing page: {currentPage}</p>
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className="mb-5"
        >
          Get next {entriesPerPage} results
        </Button>
      </Container>
    </div>
  );
};

export default MoviesList;
