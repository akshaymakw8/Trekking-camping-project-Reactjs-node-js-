import React from "react";
import "./service-card.css";

const ServiceCard = ({item}) => {
    const {imgUrl, title, desc} =item
    return <dv className="service_item">
        <div className="service_img">
            <img src={imgUrl} alt=""></img>
        </div>
        <h5>{title}</h5>
        <p>{desc}</p>
    </dv>;
};

export default ServiceCard;