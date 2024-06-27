import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/thank-you.css";
import { getBookingById } from "../api/booking";
import { useInstance } from "easy-redux-http-call";

const ThankYou = ({  }) => {
    const {id}= useParams();
    const bookingState = useInstance(getBookingById);
    const location = useLocation();

  // Access the data using location.state.customData
  const receivedData = location?.state?.id;
  console.log(receivedData,"reci")

    useEffect(() => {
        if(receivedData) {
            getBookingById.call({
                urlParams:{
                    id:receivedData
                }
            })
        }
       
    },[])

    useEffect(() => {
        if(bookingState.date) {
            console.log(bookingState.date,"bookingState.date")
        }
    },[bookingState])

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = String(today.getFullYear()).slice(-2);
    
    const formattedDate = `${day}-${month}-${year}`;
    console.log(bookingState,"bookingState")

  // Sample data for the invoice
  const invoiceData = {
    invoiceNumber: "INV12345",
    date: formattedDate,
    totalAmount: (Number(bookingState?.data?.guests) * Number(bookingState?.data?.tour?.price) + 300),
    items: [
      { description: "Tour Package", amount:bookingState?.data ? (Number(bookingState?.data?.guests) * Number(bookingState?.data?.tour?.price)) : 0} ,
      { description: "Tax", amount: 250 },
      { description: "Service Fee", amount: 50 },
    ],
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg={receivedData ? '6':'12'} className="pt-5 text-center">
            <div className="thank_you">
              <center>
                <span>
                  <i class="ri-checkbox-circle-fill"></i>
                </span>
                {receivedData && <h1 className="mb-3 fw-semibold">Payment Successfully Done!</h1>}
                <h3 className="mb-4">Your tour is booked.</h3>
                <Button className="btn primary__btn w-50 text-center">
                  <Link to="/home">Back to home</Link>
                </Button>
              </center>
            </div>
          </Col>
          {receivedData && 
                 <Col lg="6" className="pt-5 text-center">
                 <div className="invoice">
                   <h2>Invoice</h2>
                   <p>Invoice Number: {invoiceData.invoiceNumber}</p>
                   <p>Date: {invoiceData.date}</p>
                   <table className="table">
                     <thead>
                       <tr>
                         <th>Description</th>
                         <th>Amount</th>
                       </tr>
                     </thead>
                     <tbody>
                       {invoiceData.items.map((item, index) => (
                         <tr key={index}>
                           <td>{item.description}</td>
                           <td>{item.amount}</td>
                         </tr>
                       ))}
                       <tr>
                         <td className="fw-semibold">Total</td>
                         <td className="fw-semibold">{invoiceData.totalAmount}</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </Col>
          }
         
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
