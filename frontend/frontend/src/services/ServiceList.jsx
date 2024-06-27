import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData=[
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "We provide safe and secured guidance for trekking & camping.",
    },
    {
        imgUrl: guideImg,
        title: "Best Trek Guide",
        desc: "We provide experienced trekking guides",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Customization features are available for customers to have comforts",
    },
]

const ServiceList = () => {
    return <>
    {
        servicesData.map((item,index)=> <Col lg='3' key={index}><ServiceCard item={item}/></Col>)
    }
    </>
};

export default ServiceList;