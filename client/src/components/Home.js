import React from "react";
import "../styles/Home.css";
import Logo from "../img/logo4.png";
import image2 from "../img/2.png";
import image3 from "../img/3.png";
import image4 from "../img/4.png";
// import Logo2 from "../img/Logo2.jpg";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Home() {
    return (
        <div className="Home">
            <h1>UniSpaces</h1>
            <img className="Home-logo" src={Logo} alt='Logo'/>
            <CardGroup className="Home-margins">
                <Card>
                    <Card.Img variant="top" src={image2} />
                    <Card.Body>
                    <Card.Title>Post</Card.Title>
                    <Card.Text>
                        Help update the status of Builidngs on your campus by visiting the Post page.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted"></small>
                    </Card.Footer>
                </Card>
                <div className="Home-space"></div>
                <Card>
                    <Card.Img variant="top" src={image3} />
                    <Card.Body>
                    <Card.Title>Trends</Card.Title>
                    <Card.Text>
                        Check out the latest trends regarding capacity, mask wearing, and more on buildings on your campus.{' '}
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted"></small>
                    </Card.Footer>
                </Card>
                <div className="Home-space"></div>
                <Card>
                    <Card.Img variant="top" src={image4} />
                    <Card.Body>
                    <Card.Title>Get</Card.Title>
                    <Card.Text>
                        Want something more simple? Check out our get page to get the latest status of buildings on your campus
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted"></small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    )
  }
