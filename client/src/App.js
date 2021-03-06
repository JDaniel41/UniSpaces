import "./styles/App.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Home from "./components/Home.js";
import Post from "./components/Post.js";
import Trends from "./components/Trends.js";
import Get from "./components/Get.js";
import Footer from "./components/Footer.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AboutUs from "./components/AboutUs";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
    const axios = require("axios");
    const [data, setData] = useState(["None"]);

    useEffect(() => {
        async function getSchools() {
            axios
                .get("https://hackgt-unispaces.herokuapp.com/schools")
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        setData(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }

        getSchools();
    }, [axios]);


  return (
    <div className="App">
    <Router>
        <div>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/post">Post</Nav.Link>
            <Nav.Link as={Link} to="/trends">Trends</Nav.Link>
            <Nav.Link as={Link} to="/get">Get</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                            <AboutUs />
                        </Route>
                        <Route path="/post">
                            <Post schools={data} />
                        </Route>
                        <Route path="/trends">
                            <Trends schools={data}/>
                        </Route>
                        <Route path="/get">
                            <Get schools={data} />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    );
}
