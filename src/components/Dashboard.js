import DashNav from "./Dashboard/DashNav"
import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Col  from "react-bootstrap/Col"
import { Link } from "react-router-dom"

import Button  from "react-bootstrap/Button"
import ListGroup  from "react-bootstrap/ListGroup"


// TODO: Refactor
export default function Dashboard() {
    return (
    <>
            <Container className="my-3">
                <DashNav/>
            </Container>
            <Container className="my-5">
                <Row className="justify-content-around rounded overflow-hidden">
                    <Col className="d-flex flex-column border border-info p-3">
                        <h2 className="text-center mb-3">Top Farms</h2>
                        <ListGroup variant="flush" className="rounded">
                            <ListGroup.Item className="d-flex py-3" >
                                <img className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                                <div>
                                    <h4 className="m-0">Favorite Farm</h4>
                                    <p className="m-0">Total Orders: <b>155</b></p>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex py-3" >
                                <img className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                                <div>
                                    <h4 className="m-0">Farm 2</h4>
                                    <p className="m-0">Total Orders: <b>86</b></p>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex py-3" >
                                <img className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                                <div>
                                    <h4 className="m-0">Farm 3</h4>
                                    <p className="m-0">Total Interactions: <b>32</b></p>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        <Link to="/farms" className="mt-3 ms-auto"><Button variant="light">See all</Button></Link>
                    </Col>
                    <Col className="d-flex flex-column bg-info p-3">
                            <h2 className="text-center mb-3">Latest Orders</h2>
                        <ListGroup variant="flush"  className="rounded">
                            <ListGroup.Item className="text-success d-flex py-3 " >
                                <p className="col-1 display-5 m-0 me-3">+</p>
                                <div>
                                    <h4 className="m-0">Farm 3</h4>
                                    <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-success d-flex py-3 " >
                                <p className="col-1 display-5 m-0 me-3">+</p>
                                <div>
                                    <h4 className="m-0">Farm 3</h4>
                                    <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-danger d-flex py-3 " >
                                <p className="col-1 display-5 m-0 me-3">-</p>
                                <div>
                                    <h4 className="m-0">Favorite Farm</h4>
                                    <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        <Link to="/plants" className="mt-3 ms-auto"><Button variant="info">See all</Button></Link>
                    </Col>
                </Row>
                <Row className="justify-content-center my-5">
                    <Col xs lg="6">
                    <p className="text-center">Your Farms</p>
                    <ul className="d-flex justify-content-around list-unstyled">
                        <li>Farm1</li>
                        <li>Farm2</li>
                        <li>Farm3</li>
                    </ul>
                    <Link to="/farms" className="text-center">See all</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}