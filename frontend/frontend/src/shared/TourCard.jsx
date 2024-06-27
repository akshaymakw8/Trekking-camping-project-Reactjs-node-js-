import React from "react";
import {Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from "../utils/avgRating";

const TrekCard = ({tour}) => {
    const {_id, title, city, photo, price, featured, reviews} = tour;
    const {totalRating, avgRating}= calculateAvgRating(reviews);
   
    console.log(_id);
    return <dv className="tour_card">
        <Card>
            <div className="tour_img">
                <img src={photo} alt="tour_img" height={250} width={300}/>
                {featured &&
                <span>Featured</span>}
            </div>
            <CardBody>
            <div className="card_top d-flex align-items-center jutify-content-between">
                <span className="tour_location d-flex align-items-center gap-1">
                <i class="ri-map-pin-line"></i>{city}
                </span>
                <span className="tour_rating d-flex align-items-center gap-1">
                <i class="ri-star-fill"></i>{avgRating ===0 ? null : avgRating}
                {totalRating === 0 ? 'Not Rated' : <span>({reviews.length})</span>}
               
                </span>
            </div>
            <h5 className="tour_title"><Link to={`/tour/${_id}`}>{title}</Link></h5>
            <div className="card_bottom d-flex align-items-center justify-content-center mt-3">
                <h5>Rs.{price} <span>/per person</span></h5>
                <button className="btn booking_btn">
                    <Link to={`/tour/${_id}`}>Book Now</Link>
                </button>

            </div>
        </CardBody>
        </Card>
       
        </dv>;
};

export default TrekCard;