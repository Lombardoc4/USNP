import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import{ useForm } from "react-hook-form";

export default function SignInForm({toggleModal}) {
    const { handleSubmit, register, formState: { errors } } = useForm({})

        const onSubmit = async (data) => {
        console.log(JSON.stringify(data));

        const res = await fetch('http://localhost:8000/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              },
        })

        const  resData = await res.json();


        window.localStorage.farms = JSON.stringify(resData.farms);
        delete resData.farms
        window.localStorage.user = JSON.stringify(resData);
    }

    return (

      <Form autoComplete="off" style={{minWidth: '350px'}} onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Email:</Form.Label>
        <Form.Control role="presentation" autoComplete="new-password"  {...register("email", { required: "Please enter your email.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })} type="email" />
        <Form.Text className="text-danger">
          {errors.email?.message || '\u00a0' }
        </Form.Text>
      </Form.Group>
      <Form.Group  controlId="formBasicEmail">
        <Form.Label>Password:</Form.Label>
        <Form.Control role="presentation" autoComplete="new-password" {...register("password", {
          required: "Please enter your password.",
        })}
        type="password" />
        <Form.Text className="text-danger">
          { errors.password?.message || '\u00a0' }
        </Form.Text>
      </Form.Group >
      <div className="d-flex mt-3" >
        <Button onClick={toggleModal} variant="outline-success">Cancel</Button>
        <Button className="ms-auto" type="submit" variant="success">Sign In</Button>
      </div>
    </Form>
    )
  }
