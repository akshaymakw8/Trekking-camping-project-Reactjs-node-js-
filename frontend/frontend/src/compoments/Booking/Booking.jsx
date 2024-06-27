import React, { useState } from "react";
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from "../../api/booking";
import { useCookies } from "react-cookie";

const Booking = ({ tour }) => {
    const { price } = tour;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // Retrieve the cookies
    const [cookies] = useCookies(['email', 'password', 'token', 'uid']);

    // Access the cookie values
    const { email, password, token, uid } = cookies;
    const [credentials, setCredentials] = useState({
        name: '',
        guests: '',
        date: 1,
        phone: 0,
        status:'pending',
        tour:tour._id,
        user:uid,
    })

    
    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };


    const serviceFee = 100
    const totalAmount = Number(price) * Number(credentials.guests) + Number(serviceFee);

    const handleClick = e => {
        console.log("credentials",token,credentials)
        e.preventDefault();
        if (!isValidPhoneNumber(credentials.phone)) {
            setError("Please enter a valid 10-digit phone number.");
            return false;
        }
        
        fetch("http://localhost:8080/api/v1/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                if(!token) {
                    navigate('/login')
                }
                if (data.error) {
                    setError(data.error);
                    return false;
                }
                if(data._id) {
                    navigate(`/tour/payment/${data._id}`);
                }
                

                // Optionally, you can do something with the data received from the API
                //   navigate("/login");
            }).catch(err => {
                console.log(err,"rr")
            })

        //   navigate("/thank-you");

    };
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^\d{10}$/;
        return phoneNumberRegex.test(phoneNumber);
      };
    return (<div className="booking">
        <div className="booking__top d-flex align-item-center juy-content-between">
            <h3>Rs.{price} <span>/person</span></h3>

        </div>
        <Form className="booking_info-form" onSubmit={handleClick}>
            <div className="booking_form">
                <h5>Information</h5>

                <FormGroup>
                    <input type="text" placeholder="Full Name" id="name" required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
                </FormGroup>
                <FormGroup className="d-flex align-items-center gap-3">
                    <input type="date" placeholder="" id="date" required onChange={handleChange} />
                    <input type="number" placeholder="Guest" id="guests" required onChange={handleChange} />
                </FormGroup>

            </div>
            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">Rs.{price}<i class="ri-close-line"></i> 1 person</h5>
                        <span>Rs.{price}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service Charges</h5>
                        <span>Rs.{serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>Rs.{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button type='submit' className="btn primary__btn w-100 mt-4" >
                    Book Now
                </Button>

            </div>
        </Form>
        {error && error}
    </div>

    );
};

export default Booking;