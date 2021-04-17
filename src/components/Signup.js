import React, { Component, Fragment,useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faIdBadge, faMapMarker,faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
import BgImage from "../assets/signin.svg";
import { makeStyles } from '@material-ui/core/styles';
const axios = require('axios')
const qs = require('querystring')
//const FormData=require('FormData')
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const history = useHistory();
    function validateForm() {
        if(email.length > 0 && password.length > 0 && name.length>0){
            return true;
        }
        else return false;
    }
        
        
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email,password);

        let data = new FormData();
        console.log('boundary:', data._boundary);
    data.set('email', email);
        data.set('password', password);
        data.set('name', name);
        data.set('address', address);
        data.set('mobile_no', mobile_no);
        axios({
          method: 'post',
          url: 'https://powerset-backend.herokuapp.com/auth/users/',
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          data : data,
          
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert("Account Created Successfully, please verify your email through the mail we sent you and then login.");
          history.push("/login");
        })
        .catch(function (err) {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            alert("Either details are not right or account already exists");
          }        }
        );
      }

        return (
          <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </InputGroup>
                  </Form.Group>
                  
                  <Form.Group id="name" className="mb-4">
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faIdBadge} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="name" placeholder="Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="address" className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faMapMarker} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="address" placeholder="Your Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="phone_no" className="mb-4">
                    <Form.Label>Phone No</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="phone_no" placeholder="Phone Number (10 Digits)" value={mobile_no} onChange={(e)=>setMobileNo(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                       &nbsp; I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

               
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={'/login'} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
        );
    
}