import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import{ useForm } from "react-hook-form";

export default function SignUpForm({toggleModal}) {
    const { handleSubmit, register, formState: { errors } } = useForm({})


    const onSubmit = (data, e) => {
      e.preventDefault();
      console.log('submit', data);
    }
    return(
      <Form autoComplete="off" style={{minWidth: '350px'}} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name", { required: "Please enter your name." })} type="text" placeholder="Any Name" />
          <Form.Text className="text-danger">
            {errors.name?.message || '\u00a0' }
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email", {
              required: "Please enter your email.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
            type="email" placeholder="Enter email" />
          <Form.Text className={errors.email?.message ? "text-danger" : 'text-muted'}>
            { errors.email?.message || "We'll never share your email with anyone else." }
          </Form.Text>
        </Form.Group>
        <div className="d-flex mt-3">
          <Button onClick={toggleModal} variant="outline-success">Cancel</Button>
          <Button className="ms-auto" type="submit" variant="success">Sign Up</Button>
        </div>
      </Form>
    )
  }