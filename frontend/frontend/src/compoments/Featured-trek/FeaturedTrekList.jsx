import React from "react";
import TourCard from "../../shared/TourCard";
// import tourData from '../../assets/data/tours';
import {Col} from 'reactstrap';

const FeatureTrekList = ({ tourData }) => {
    console.log(tourData,"data")
    return <>
    {
        tourData?.map(tour=>(
            <Col lg='3' className='mb_4' key={tour.id}><TourCard tour={tour}/>
            </Col>
        )

        )
    }
    </>
};

export default FeatureTrekList;