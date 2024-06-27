import React from "react";
import '../styles/invoice.css';

const Invoice = ({ bookingDetails }) => {
  const { bookingId, customerName, tourName, startDate, endDate, price, paid } = bookingDetails;

  return (
    <div className="invoice">
      <h2>Invoice</h2>
      <div className="invoice-details">
        <div>
          <strong>Booking ID:</strong> {bookingId}
        </div>
        <div>
          <strong>Customer Name:</strong> {customerName}
        </div>
        <div>
          <strong>Tour Name:</strong> {tourName}
        </div>
        <div>
          <strong>Start Date:</strong> {startDate}
        </div>
        <div>
          <strong>End Date:</strong> {endDate}
        </div>
      </div>
      <div className="invoice-items">
        <div className="item-header">
          <div>Description</div>
          <div>Price</div>
        </div>
        {/* Assuming you have an array of items, you can loop through it to display individual items */}
        <div className="item">
          <div>Tour Package</div>
          <div>${price}</div>
        </div>
      </div>
      <div className="invoice-total">
        <div>Total:</div>
        <div>${price}</div>
      </div>
      <div className="payment-status">
        <strong>Payment Status:</strong> {paid ? "Paid" : "Pending"}
      </div>
    </div>
  );
};

export default Invoice;
