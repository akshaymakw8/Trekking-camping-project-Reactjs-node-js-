import React, {useState, useEffect} from "react";
import CommonSection from '../shared/CommonSection';
import '../styles/tour.css';
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import tourData from '../assets/data/tours';
import { Container, Row, Col} from "reactstrap";
import { getTour } from "../api/tour";
import { useInstance } from "easy-redux-http-call";


const Tour = () => {
    const tourState = useInstance(getTour)
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage]=useState(0)
    const [tourData,setTourData] = useState([])
    useEffect(()=>{
        const pages=Math.ceil(5/4)
        setPageCount(pages)

    },[page]);
    useEffect(() => {
        getTour.call();
    },[])
    useEffect(() => {
        console.log(tourState,"stat")
        if(tourState.data) {
            setTourData(tourState.data)
        }
    },[tourState])
    return (
        <>
        <CommonSection title={"All Treks & Camps"} />
        <section>
            <Container>
                <Row>
                    <SearchBar/>
                </Row>
            </Container>
        </section>
        <section className="pt-0">
            <Container>
                <Row>
                    {
                        tourData?.map(tour=>(<Col lg='3' className="mb-4" key={tour.id}><TourCard tour={tour}/></Col>))
                    }
                    <Col lg='12'>
                        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                          {[...Array(pageCount).keys()].map(number=> (
                            <span key={number} onClick={()=> setPage(number)} className={page===number ? 'active__page' : ''}>
                                {number+1}
                            </span>
                          ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Newsletter/>
        </>
    );
};

export default Tour;