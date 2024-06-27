import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { registerApi } from "../api/user";
import { useAIEventHandler, useInstance } from "easy-redux-http-call";

const Register = () => {
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const userState = useInstance(registerApi);
  const [credentials, setCredentials] = useState({
    // username:undefined,
    email: undefined,
    password: undefined,
    phone:undefined
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const validateForm = () => {
    if (!credentials.email || !credentials.password) {
      console.log('call here')
      setError("Please fill in all required fields.");
      return false;
    }

    if (!isValidPhoneNumber(credentials.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!isValidEmail(credentials.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (credentials.password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(null);
    return true;
  };

 
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useAIEventHandler(registerApi, {
    onSuccess: (data) => {
      console.log(data, "data============>>>");
      navigate("/login");
    },
    onError: (error, obj) => {
      if (error) {
        setError('something went wrong!');
      }
    },
  });
  useEffect(() => {
    console.log(userState, 'satet')
    if (userState.error !== '') {
      setError(userState.error);
    }
    if (userState.event === "success") {
      navigate("/login");
    }
  }, [userState]);

  const handleClick = (e) => {
    console.log(e, "e")
    e.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          phone:credentials.phone
        })
      })
        .then((response) => {
          return response.json(); // Parse the response as JSON
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          // Optionally, you can do something with the data received from the API
          navigate("/login");
        })
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Phone No"
                      id="phone"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </FormGroup>
                  {error && <p className="error-message">{error}</p>}
                  <Button type="submit" className="btn secondary__btn auth__btn">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
