import React from 'react';
import { useEffect, useState} from 'react';
import logo from './flower.png';
import city from './greenScape.png';
import './Home.scss';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faGamepad, faLeaf } from '@fortawesome/free-solid-svg-icons'
import Modal from './components/modal'

function SignUpForm({toggleModal}) {
  return(
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Any Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <div className="d-flex">
        <Button onClick={toggleModal} variant="outline-success">Cancel</Button>
        <Button className="ms-auto" type="submit" onClick={e => e.preventDefault()} variant="success">Sign Up</Button>
      </div>
    </Form>
  )
}

function App() {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  }

  useEffect(() => {
    showModal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
 }, [showModal]);


  return (
    <div className="App">
      <header className="Landing">
        <Container>
          <Row className="align-items-md-center">
            <Col sm={4}>
              <img src={logo} className="Landing-logo" alt="logo" />
            </Col>
            <Col sm={8}>
              <div className="m-5">
                <p className="mb-5">Learn all about plants in a free,&nbsp;enjoyable, and efficient way</p>
                <Stack gap={2} className="col-md-5 mx-auto">
                  <Modal toggleModal={toggleModal} showModal={showModal} variant="success" contentLabel="Sign Up for Updates"><SignUpForm toggleModal={toggleModal}/></Modal>
                  <Button href="#about" variant="outline-success">Learn More</Button>
                </Stack>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <Container id="about" className="my-5">
        <Row className="align-items-md-center my-5">
          <Col sm={2}>
            <img src={logo} className="hero-img" alt="logo" />
          </Col>
          <Col sm={10}>
            <div className="m-5">
              <h2>
                Soon to be the #1 hub for learning all things plants
              </h2>
              <p>
                In quick, consice, and exercises you can level up you knowledge of plants and apply it back into the real world.
              </p>
            </div>
          </Col>
        </Row>
        <div className="divider"></div>
        <Row className="justify-content-center m-5 text-center">
          <img src={city} className="hero-img mb-3" alt="logo" />
          <p className="w-75">Plants make up <span className="h1">~80%</span> of living things on Earth</p>
        </Row>
        <Row sm={3} className="">
          <h2 className="w-100 mb-3 text-center">Why USNP?</h2>
          <Col className="p-4">
              <FontAwesomeIcon icon={faLayerGroup} className="display-5 pb-3" />
              <h3>Compounding Learning</h3>
              <p>We are going to structure the learning to build off of itself. This is&nbsp;accomplished throw small similar lessons promoting growth by repetition</p>
          </Col>
          <Col className="p-4">
              <FontAwesomeIcon icon={faGamepad} className="display-5 pb-3" />
              <h3>Fun & Interactive</h3>
              <p>An interactive gamified way of learning about our plant filled world.</p>
          </Col>
          <Col className="p-4">
              <FontAwesomeIcon icon={faLeaf} className="display-5 pb-3" />
              <h3>Natural Interest</h3>
              <p>We are naturally curious about the world around us. Without a simple and easy way to learn about plants their natural order will forever be a mystery</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
