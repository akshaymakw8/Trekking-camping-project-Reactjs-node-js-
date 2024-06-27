import React , {useEffect, useRef, useState} from "react";
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup} from "reactstrap";
import {useParams} from 'react-router-dom';
import tourData from '../assets/data/tours';
import calculateAvgRating from "../utils/avgRating";
import avatar from '../assets/images/avatar.jpg';
import Booking from "../compoments/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { getTourById } from "../api/tour";
import { useInstance } from "easy-redux-http-call";
import { useCookies } from "react-cookie";

const TourDetails = () => {
      // Retrieve the cookies
   const [cookies] = useCookies(['email', 'password', 'token', 'uid']);

   // Access the cookie values
   const { email, password, token, uid } = cookies;
     const {id}= useParams();
     const reviewMsgRef=useRef('');
     const [tourRating, setTourRating]=useState(null);
     const tourState = useInstance(getTourById);
     const [message,setMessage] = useState(null)
    //  const tour=tourData.find(tour=> tour.id === id);
    //  const {photo, title, description, price, address, reviews, city, distance, maxGroupSize, time, food, extra, guide}=tour;
    //  const {totalRating, avgRating}= calculateAvgRating(reviews);

    const options={day: "numeric", month: "long", year: "numeric"};

    const submitHandler= e=>{
        e.preventDefault();
        
        const reviewText = reviewMsgRef.current.value;
        const data = {
            feedback : reviewText
        }
        if(uid) {
            data.user = uid
        }
        fetch("http://localhost:8080/api/v1/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                if (data.error) {
                    setMessage(data.error);
                    return false;
                }
                if(data._id) {
                    setMessage("Thank you for your feedback!");
                    reviewMsgRef.current.value = "";
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000);
                }
                

                // Optionally, you can do something with the data received from the API
                //   navigate("/login");
            }).catch(err => {
                console.log(err,"rr")
            })
       
    };
   
    useEffect(() => {
        console.log("ddhfdgf",id)
        getTourById.call({
            urlParams:{
                id:id
            }
        })
    },[])
    return <>
    {tourState?.data &&  <section>
        <Container>
            <Row>
                <Col lg='8'>
                    <div className="tour_content">
                    <img src={tourState.data.photo} alt="" />
                    <div className="tour_info">
                        <h2>{tourState.data.title}</h2>
                        <div className="d-flex align-items-center gap-4">
                        <span className="tour_rating d-flex align-items-center gap-1">
                <i class="ri-star-fill" style={{'color': "var(--secondary-color)"}}></i>{tourState.data.avgRating === 0 ? null : tourState.data.avgRating}
                {tourState.data.totalRating === 0 ? 'Not Rated' : <span>({tourState.data.reviews?.length})</span>}
               
                </span>
                   <span>
                   <i class="ri-map-pin-2-fill"></i> {tourState.data.address}
                   </span>
                        </div>
                        <div className="tour_extra_details">
                         <span><i class="ri-map-pin-line"></i> {tourState.data.city}</span>
                         <span> <i class="ri-wallet-3-fill"></i>Rs. {tourState.data.price} / person</span>
                         <span> <i class="ri-map-pin-time-fill"></i>{tourState.data.distance} km from pune-mumbai highway</span>
                         <span><i class="ri-group-line"></i> {tourState.data.maxGroupSize} people</span>
                        </div>
                        <h5>Description</h5>
                        <p>{tourState.data.description}</p>
                        <h5>Time</h5>
                        <p>{tourState.data.time}</p>
                        <h5>Food Offer</h5>
                        <p>{tourState.data.food}</p>
                        <h5>Extra Activities</h5>
                        <p>{tourState.data.extra}</p>
                        <h5>Tour Guide</h5>
                        <p>{tourState.data.guide}</p>
                    </div>
                    <div className="tour_reviews mt-4">
                        <h5>Reviews ({tourState.data.reviews?.length} reviews)</h5>
                        <Form onSubmit={submitHandler}>
                            <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                                <span onClick={()=> setTourRating(1)}>
                                    1 <i class="ri-star-s-fill"></i>
                                    </span>
                                <span  onClick={()=> setTourRating(2)}>
                                    2 <i class="ri-star-s-fill"></i>
                                    </span>
                                <span  onClick={()=> setTourRating(3)}>
                                    3 <i class="ri-star-s-fill"></i>
                                    </span>
                                <span  onClick={()=> setTourRating(4)}>
                                    4 <i class="ri-star-s-fill"></i>
                                    </span>
                                <span  onClick={()=> setTourRating(5)}>
                                    5 <i class="ri-star-s-fill"></i>
                                    </span>
                            </div>
                            <div className="review_input" style={{ display:'flex'}}>
                                <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required />
                                <button className="btn primary__btn text-black" type="submit">
                                    Submit
                                </button>
                            </div>
                            <p style={{ textAlign:"center", fontWeight:"bold"}}>{message && message}</p>
                        </Form>
                        <ListGroup className="user_reviews">
                            {
                                tourState.data.reviews?.map(review=>( 
                                    <div className="review_item">
                                        <img src={avatar} alt="" />
                                        <div className="w-100">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h5>Ishita</h5>
                                                    <p>{new Date('06-01-2023').toLocaleDateString("en-US", options)}</p>
                                                </div>
                                                <span className="d-flex align-items-center">
                                                    5 <i class="ri-star-fill"></i>
                                                </span>
                                            </div>
                                            <h6>Amazing Experience</h6>
                                        </div>
                                    </div>

                                ))
                            }
                        </ListGroup>

                    </div>
                    </div>
                </Col>
                <Col lg='4'>
                    <Booking tour={tourState.data} avgRating={tourState.data.avgRating} />
                </Col>
            </Row>
        </Container>
    </section>}
  
    <Newsletter/>
    </>
};

export default TourDetails;