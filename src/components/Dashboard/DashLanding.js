import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Col  from "react-bootstrap/Col"
import { Link } from "react-router-dom"

import Button  from "react-bootstrap/Button"
import ListGroup  from "react-bootstrap/ListGroup"
// import { nurseryImg } from '../../public/wholesale-nuresry.jpg'

export default function DashLanding() {

    return(
        <Container className="my-5">
            <Row className="justify-content-around rounded">
                <Col className="d-flex flex-column rounded p-3 m-3">
                    <h2 className="text-center  mb-3">Top Farms</h2>
                    <ListGroup variant="flush" className="rounded border">
                        <ListGroup.Item className="d-flex py-3" >
                            <img style={{height: '50px'}} className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                            <div>
                                <h4 className="m-0">Favorite Farm</h4>
                                <p className="m-0">Total Orders: <b>155</b></p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex py-3" >
                            <img style={{height: '50px'}} className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                            <div>
                                <h4 className="m-0">Farm 2</h4>
                                <p className="m-0">Total Orders: <b>86</b></p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex py-3" >
                            <img style={{height: '50px'}} className="rounded me-3" src="https://via.placeholder.com/50" alt=""/>
                            <div>
                                <h4 className="m-0">Farm 3</h4>
                                <p className="m-0">Total Interactions: <b>32</b></p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Link to="/farms" className="mt-3 ms-auto"><Button variant="info">See all Farms</Button></Link>
                </Col>
                <Col className="d-flex flex-column p-3 m-3 rounded">
                        <h2 className="text-center mb-3">Latest Orders</h2>
                    <ListGroup variant="flush"  className="rounded border">
                        <ListGroup.Item className="text-success d-flex py-3 " >
                            <p style={{height: '50px'}} className="col-1 display-5 m-0 me-3">+</p>
                            <div>
                                <h4 className="m-0">Farm 3</h4>
                                <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-success d-flex py-3 " >
                            <p style={{height: '50px'}} className="col-1 display-5 m-0 me-3">+</p>
                            <div>
                                <h4 className="m-0">Farm 3</h4>
                                <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-danger d-flex py-3 " >
                            <p style={{height: '50px'}} className="col-1 display-5 m-0 me-3">-</p>
                            <div>
                                <h4 className="m-0">Favorite Farm</h4>
                                <p className="m-0">Ordered: <b>Today 8:35pm</b></p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Link to="/plants" className="mt-3 ms-auto"><Button variant="info">See all Orders</Button></Link>
                </Col>
            </Row>
        </Container>
    )
}