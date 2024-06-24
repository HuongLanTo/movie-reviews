import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MoviesList from "./components/movies-list";
import AddReview from "./components/add-review";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="ps-3">
        <Navbar.Brand>Movie Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user ? <a>Logout</a> : <Link to={"/login"}>Login</Link>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/movies"]} component={MoviesList}></Route>
        <Route
          path={"/movies/:id/review"}
          render={(props) => <AddReview {...props} user={user} />}
        ></Route>
        <Route
          path={"/movies/:id/"}
          render={(props) => <Movie {...props} user={user} />}
        ></Route>
        <Route
          path={"/login"}
          render={(props) => <Login {...props} login={login} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
