import React, { useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from '../Modal'
import Row from 'react-bootstrap/Row'
import{ useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

export default function SignInModal() {
  const history = useHistory()
  const [showSignIn, setSignIn] = useState(false);
  const  { user } = window.localStorage;
  const { handleSubmit, register, setError, formState: { errors } } = useForm({})
  const formInputs = [
      {
        accesiblity: "Enter your email",
        formRegister: {
          required: "Please enter your email.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }
        },
        type: "email"
      },
      {
        accesiblity: "Enter your password",
        formRegister: {
          required: "Please enter your password."
        },
        type: "password"
      },

  ];

  const onSubmit = async (data) => {
    // Todo: Error handling
    // Check user login
    const res = await fetch('http://localhost:8000/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const  resData = await res.json();
    console.log(resData.email);
    if (resData.err){
      setError("email", {
        type: "manual",
        message: resData.err?.email,
      });
      setError("password", {
        type: "manual",
        message: resData.err?.password,
      });
      return;
    }
    // TODO: Farms could probably shifted into Context
    // If data, store farms and user seperate in localStorage
    window.localStorage.farms = JSON.stringify(resData.farms);
    delete resData.farms
    window.localStorage.user = JSON.stringify(resData);

    // Return dom scroll from Modal Login
    document.body.style.overflow = 'unset';

    // Send logged user to Dashboard
    history.push("/dashboard");
  }


  const signIn = () => {
    // if User exists Redirect to Dashboard
    if (user) {
      return history.push('/dashboard');
    }

    // Set history depending on modal open of close
    showSignIn ? history.push('/') : history.push('/?login=true');

    // Toggle modal visiblility
    setSignIn(!showSignIn);
  }

  return (
      <Row className="g-0">
        <Modal toggleModal={() => {signIn()}} showModal={showSignIn}  contentLabel="Dashboard ">
        { history.location.search &&
          <Form autoComplete="off" style={{minWidth: '350px'}} onSubmit={handleSubmit(onSubmit)}>
            {formInputs.map(f => (
              <Form.Group key={f.type} controlId={f.accesiblity}>
              <Form.Label>{f.type.charAt(0).toUpperCase() + f.type.slice(1)}:</Form.Label>
              <Form.Control role="presentation" autoComplete="new-password" type={f.type} {...register(f.type, f.formRegister)}
              />
              <Form.Text className="text-danger">
                {errors[f.type]?.message || '\u00a0' }
              </Form.Text>
              </Form.Group>
            ))}
            <div className="d-flex mt-3" >
              <Button onClick={() => {signIn()}} variant="outline-success">Cancel</Button>
              <Button className="ms-auto" type="submit" variant="success">Sign In</Button>
            </div>
          </Form>
        }
        </Modal>
      </Row>
    )
  }
