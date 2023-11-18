
import React, { useState } from 'react';
import {useMutation} from 'react-query';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Toast} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import {auth} from '../../api'
import BgImage from "../../assets/img/illustrations/signin.svg";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);


  const history = useHistory();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);

  const signUpMutation = useMutation((formData) => auth.signUp(formData), {
    onSuccess: () => {
      history.push(Routes.DashboardOverview.path);
      setShowSuccessToast(true);
    },
    onError: () => {
      setShowFailedToast(true);
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    signUpMutation.mutate({
      email,
      password,
      name,
      surname,
    });
  };

  return (
      <main>
        <section className="d-flex align-items-center my-3 mt-lg-4 mb-lg-5">
          <Container>
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
              </Card.Link>
            </p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Create an account</h3>
                  </div>
                  <Form className="mt-4">
                    <Form.Group id="name" className="mb-4">
                      <Form.Label>First Name</Form.Label>
                      <InputGroup>
                        <Form.Control autoFocus required type="text" placeholder="John" value = {name} onChange = {(e)=>(setName(e.target.value))}/>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="surname" className="mb-4">
                      <Form.Label>Last Name</Form.Label>
                      <InputGroup>
                        <Form.Control autoFocus required type="text" placeholder="Smitannick" value = {surname} onChange = {(e)=>(setSurname(e.target.value))}/>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <Form.Control autoFocus required type="email" placeholder="example@company.com" value = {email} onChange = {(e)=>(setEmail(e.target.value))}/>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <Form.Control required type="password" placeholder="Password" value = {password} onChange = {(e)=>(setPassword(e.target.value))}/>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <Form.Control required type="password" placeholder="Confirm Password" value = {confirmPassword} onChange = {(e)=>(setConfirmPassword(e.target.value))}/>
                      </InputGroup>
                    </Form.Group>
                    <FormCheck type="checkbox" className="d-flex mb-4">
                      <FormCheck.Input
                          required
                          id="terms"
                          className="me-2"
                          checked={terms}
                          onChange={(e) => setTerms(e.target.checked)}
                      />
                      <FormCheck.Label htmlFor="terms">
                        I agree to the <Card.Link>terms and conditions</Card.Link>
                      </FormCheck.Label>
                    </FormCheck>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={!email || !password || !name || !surname || !confirmPassword || !terms}
                        onClick={handleSignUp}
                    >
                      {signUpMutation.isLoading ? 'Signing up...' : 'Sign up'}
                    </Button>

                  </Form>

                  <div className="mt-3 mb-4 text-center">
                    <span className="fw-normal">or</span>
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Toast
            show={showSuccessToast}
            onClose={() => setShowSuccessToast(false)}
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
        >
          <Toast.Header>
            <strong className="me-auto">Failed</strong>
          </Toast.Header>
          <Toast.Body>
            Failed to sign up
          </Toast.Body>
        </Toast>

        <Toast
            show={showFailedToast}
            onClose={() => setShowFailedToast(false)}
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
        >
          <Toast.Header>
            <strong className="me-auto">Failed</strong>
          </Toast.Header>
          <Toast.Body>
            Failed to sign up
          </Toast.Body>
        </Toast>

      </main>
  );
};
