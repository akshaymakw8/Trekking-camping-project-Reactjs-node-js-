import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { loginAPI } from "../api/user";
import { useInstance } from "easy-redux-http-call";
import { useCookies } from 'react-cookie';
const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userState = useInstance(loginAPI);
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    })
    const [cookies, setCookie] = useCookies(['user']);
    
  const validateForm = () => {
    
    console.log(credentials.email,credentials.password,"=====")
    if (!credentials.email || !credentials.password) {
        console.log('call here')
      setError("Please fill in all required fields.");
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

    setError(null);
    return true;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
    useEffect(() => {
        console.log(userState,"udrtfvhf")
        if (userState.event === "error") {
          setError("Network Error");
        }
        if (userState.event === "success") {
          navigate("/");
        }
      }, [userState]);


    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };
    const handleClick = e => {
        console.log(e,"e")
        e.preventDefault();
        if (validateForm()) {
          fetch("http://localhost:8080/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            email:credentials.email,
            password:credentials.password
          })
        })
          .then((response) => {
            return response.json(); // Parse the response as JSON
          })
          .then((data) => {
            
            if(data.error) {
                setError(data.error);
            }
            if(data.token) {
              setCookie('email',credentials.email);
              setCookie('password',credentials.password);
              setCookie('token',data.token);
              setCookie('uid',data.uid)
              window.localStorage.setItem('token',data.token)
              navigate('/home')
            }
                    })
        }
      };

    return <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login_container d-flex justify-content-between">
                        <div className="login_img">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="login_form">
                            <div className="user">
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Login</h2>
                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                                </FormGroup>
                                {error && <p className="error-message">{error}</p>}

                                <Button className="btn secondary__btn auth__btn" type="submit">
                                    Login
                                </Button>
                            </Form>
                            <p>Don't have an account? <Link to='/register'>Register</Link></p>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    </section>
};

export default Login;