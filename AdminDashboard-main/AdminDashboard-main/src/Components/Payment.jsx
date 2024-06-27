import React from 'react';

const PaymentForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Payment Details</h2>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">Card Number</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Card Number" />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-600">Expiration Date</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="MM/YY" />
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-600">CVV</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="CVV" />
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Cardholder Name</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Cardholder Name" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <label className="text-gray-600">Save card for future payments</label>
            </div>
            <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
