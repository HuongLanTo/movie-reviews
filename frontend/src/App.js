import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useHistory } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MoviesList from "./components/movies-list";
import AddReview from "./components/add-review";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  let history = useHistory();

  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    const endPath = window.location.href.split("/");
    if (endPath[endPath.length - 1] === "review") {
      history.push(`/movies/${endPath[endPath.length - 2]}`);
    }
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="ps-4 mb-3">
        <Navbar.Brand className="fw-bold">Movies Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link
              className="px-2 text-black text-decoration-none"
              to={"/movies"}
            >
              Movies
            </Link>
            <span className="px-2">
              {user ? (
                <a onClick={logout} style={{ cursor: "pointer" }}>
                  Logout
                </a>
              ) : (
                <Link className="text-black text-decoration-none" to={"/login"}>
                  Login
                </Link>
              )}
            </span>
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
