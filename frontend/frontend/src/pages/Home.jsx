import React, { useEffect, useState } from "react";
import '../styles/home.css';
import { Container, Row, Col } from "reactstrap";
import heroImg2 from '../assets/images/hero-img02.jpg';
import hike from '../assets/images/hike.mp4';
import camping from '../assets/images/camp.mp4';
import worldImg from '../assets/images/world.png';
import Subtitle from './../shared/Subtitle';
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeatureTrekList from "../compoments/Featured-trek/FeaturedTrekList";
import Newsletter from "../shared/Newsletter";
import { getTour } from "../api/tour";
import { useInstance } from "easy-redux-http-call";
const Home = () => {
    const tourState = useInstance(getTour)
    const [tourData,setTourData] = useState([])
    useEffect(() => {
        getTour.call();
    },[])
    useEffect(() => {
        console.log(tourState,"stat")
        if(tourState.data) {
            setTourData(tourState.data)
        }
    },[tourState])
    return <>
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="hero_content">
                        <div className="hero_subtitle d-flex align-items-center ">
                        <Subtitle subtitle={'Know Before You Explore'} />
                        <img src={worldImg} alt=""/>
                        </div>
                        <h1>Trekking and Camping open the door to create <span
                        className="highlight">memories</span></h1>
                        <p>Trekking and Camping are all about heading into nature and spending time away from our comforts.</p>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero_img-box">
                    <video src={hike} alt="" controls />
                        
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero_img-box mt-4">
                    <img src={heroImg2} alt=""/>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className="hero_img-box mt-5">
                        <video src={camping} alt="" controls/>
                    </div>
                </Col>
                <SearchBar/>
                
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                    <h5 className="services_subtitle">What we provide</h5>
                    <h2 className="services_title">We offer our best services</h2>
                </Col>
                <ServiceList />
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='12' className="mb-5">
                    <Subtitle subtitle={'Explore'}/>
                    <h2 className="featured_tour_title">Our featured trek and Camp</h2>
                </Col>
                <FeatureTrekList tourData={tourData}/>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                <div className="experience_content">
                    <Subtitle subtitle={'Experience'}/>
                    <h2>With our all experience<br/>we will serve you</h2>
                    <p>safety, comforts, guidance ,accomodations & food</p>
                </div>
                <div className="conter_wrapper d-flex align-items-center gap-5">
                    <div className="counter_box">
                        <span>5k+</span>
                        <h6>Successful Trips</h6>
                    </div>
                    <div className="counter_box">
                        <span>500+</span>
                        <h6>Regular Clients</h6>
                    </div>
                    <div className="counter_box">
                        <span>5+
                            
                        </span>
                        <h6>Years experience</h6>
                    </div>
                    
                </div>
                </Col>
                <Col lg='6'></Col>
            </Row>
        </Container>
    </section>
    <Newsletter/>
    </>
};

export default Home;