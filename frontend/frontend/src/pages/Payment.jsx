import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faGooglePay, faClock } from '@fortawesome/free-brands-svg-icons'; // Import the icons for PayPal, UPI, and Pay on Time
import '../styles/payment.css'; // Import your CSS file
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";


const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('creditCard');
  const [errorMessage,setErrorMessage]= useState(null)
  const {id}= useParams();
  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

 
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="payment-container">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Payment Method</h2>
          <div className="payment-methods">
            {/* <div className="payment-method">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                checked={selectedMethod === 'creditCard'}
                onChange={handleMethodChange}
              />
              <label htmlFor="creditCard">
                <FontAwesomeIcon icon={faCreditCard} className="icon" />
                Credit Card
              </label>
            </div> */}

            {/* <div className="payment-method">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={selectedMethod === 'paypal'}
                onChange={handleMethodChange}
              />
              <label htmlFor="paypal">
                <FontAwesomeIcon icon={faPaypal} className="icon" />
                PayPal
              </label>
            </div> */}

            {/* Add UPI payment option */}
            <div className="payment-method">
              <input
                type="radio"
                id="upi"
                name="paymentMethod"
                value="upi"
                checked={selectedMethod === 'upi'}
                onChange={handleMethodChange}
              />
              {/* <div className='method-container'> */}
              <label htmlFor="upi">
                UPI
              </label>
              <FontAwesomeIcon icon={faGooglePay} className="icon" size="1x" style={{ marginLeft: 5 }} /> {/* Use Google Pay icon for UPI */}
            </div>
            {/* </div> */}

            {/* Add Pay on Time payment option */}
            <div className="payment-method">
              <input
                type="radio"
                id="payOnTime"
                name="paymentMethod"
                value="payOnTime"
                checked={selectedMethod === 'payOnTime'}
                onChange={handleMethodChange}
              />
              <label htmlFor="payOnTime">
                Pay on Time
              </label>
            </div>
            <p style={{fontWeight:"bold"}}>{errorMessage && errorMessage}</p>
          </div>

          {/* Display payment details based on the selected payment method */}
          {selectedMethod === 'creditCard' && <CreditCardForm />}
          {selectedMethod === 'paypal' && <PaypalForm />}
          {selectedMethod === 'upi' && <UpiForm setErrorMessage={setErrorMessage} />}
          {selectedMethod === 'payOnTime' && <PayOnTimeForm />}
        </div>
      </div>
    </section>
  );
};


const PaypalForm = () => {

  return (
    <div className="paypal-form">
      {/* Add PayPal input fields here */}
    </div>
  );
};

const CreditCardForm = () => {
  return (
    <div className="credit-card-form">
      {/* Add credit card input fields here */}
    </div>
  );
};

const UpiForm = ({setErrorMessage}) => {
  // Retrieve the cookies
  const [cookies] = useCookies(['email', 'password', 'token', 'uid']);

  // Access the cookie values
  const { email, password, token, uid } = cookies;
  const {id}= useParams();
  const reviewMsgRef=useRef('');
  const navigate = useNavigate();
  const isValidUpiId = (upiId) => {
    // Implement your UPI ID validation logic here.
    // For example, you can use a regular expression to check the format of the UPI ID.
    // Below is a simple example using a regular expression for illustrative purposes.
    const upiIdPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
    return upiIdPattern.test(upiId);
  };
  const submitHandler= e=>{
    e.preventDefault();
    
    const upiId = reviewMsgRef.current.value;

    // Perform basic front-end validation for UPI ID format
    if (!upiId || !isValidUpiId(upiId)) {
      setErrorMessage('Invalid UPI ID. Please enter a valid UPI ID.');
      return;
    }
    const reviewText = reviewMsgRef.current.value;
    fetch(`http://localhost:8080/api/v1/booking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status:'done'})
        })
            .then((response) => {
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                if(data.message && data.message == "Invalid Token") {
                    navigate('/login')
                }
                // if (data.error) {
                //     setError(data.error);
                //     return false;
                // }
                if(data) {
                    navigate(`/thank-you`,{ state: { id: id } })
                }
                

                // Optionally, you can do something with the data received from the API
                //   navigate("/login");
            }).catch(err => {
                console.log(err,"rr")
            })
    
};
  return (
    <div className="upi-form">
      <div className="review_input">
        <form onSubmit={submitHandler}>
        <input type="text" ref={reviewMsgRef} placeholder="Enter Your UPI Id" required />
        <button className="btn primary__btn text-black" type="submit">
          Submit
        </button>
        </form>
      </div>
    </div>
  );
};

const PayOnTimeForm = () => {
   // Retrieve the cookies
   const [cookies] = useCookies(['email', 'password', 'token', 'uid']);

   // Access the cookie values
   const { email, password, token, uid } = cookies;
  const {id}= useParams();
  const navigate = useNavigate();
  const clickHandler = () => {
    fetch(`http://localhost:8080/api/v1/booking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status:'done'})
        })
            .then((response) => {
                return response.json(); // Parse the response as JSON
            })
            .then((data) => {
                if(data.message && data.message == "Invalid Token") {
                    navigate('/login')
                }
                // if (data.error) {
                //     setError(data.error);
                //     return false;
                // }
                if(data) {
                  navigate(`/thank-you`);

                }
                

                // Optionally, you can do something with the data received from the API
                //   navigate("/login");
            }).catch(err => {
                console.log(err,"rr")
            })
  }
  return (
    <div className="pay-on-time-form">
      <button className="btn primary__btn text-black" style={{ width:'100%' }} onClick={clickHandler} >
          Done
      </button>
    </div>
  );
};

export default Payment;
