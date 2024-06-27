import { useState } from "react";
import { Header } from "../Components";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import { useNavigate } from "react-router-dom";



const AddPackage = () => {
  // State to store form data
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    description: '',
    price: '',
    maxGroupSize: '',
    time:'',
    food:'',
    extra:'',
    guide:'',
    featured: false,

  });

  // Function to handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle the submission of the form data, e.g., save it to the database
    // You may use a function to make an API call to the server to save the tour data
    // For simplicity, we'll just log the data to the console
    fetch("http://localhost:8080/api/v1/tours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setSuccessMessage("Tour Package Added");
        // If the request is successful, you can handle the response here
        console.log("Data saved successfully!");
        setFormData({
          title: '',
          city: '',
          address: '',
          distance: '',
          photo: '',
          description: '',
          price: '',
          maxGroupSize: '',
          featured: false,
        })
        navigate('/tours')
        // Optionally, you can reset the form fields after successful submission
      })
      .catch((error) => {
        setError(error)
        console.error("Error saving data:", error);
      });

  };

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='App' title='Add Package' />
      {error && 
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{error}</span>
      </div>
       } 
      {success && 
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
        <span class="block sm:inline">{success}</span>
      </div>
       } 
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Package Title
            </label>
            <input
              onChange={handleChange}
              id="title"
              name="title"
              type="text"

              //   autoComplete="email"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Package Title"
            />
          </div>
          <div>
            <label htmlFor="city" className="sr-only">
              city
            </label>
            <input
              onChange={handleChange}
              id="city"
              name="city"
              type="text"
              //   autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="Address" className="sr-only">
              Address
            </label>
            <input
              onChange={handleChange}
              id="address"
              name="address"
              type="text"
              //   autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Address"
            />
          </div>
          <div>
            <label htmlFor="distance" className="sr-only">
              Distance
            </label>
            <input
              onChange={handleChange}
              id="distance"
              name="distance"
              type="text"
              //   autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Distance"
            />
          </div>
          <div>
            <label htmlFor="photo" className="sr-only">
              photo
            </label>
            <input
              onChange={handleChange}
              id="photo"
              name="photo"
              type="photo"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Image"
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <input
              onChange={handleChange}
              id="description"
              name="description"
              type="text"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="Price" className="sr-only">
              Price
            </label>
            <input
              onChange={handleChange}
              id="price"
              name="price"
              type="number"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor="maxGroupSize" className="sr-only">
              Max Group Size
            </label>
            <input
              onChange={handleChange}
              id="maxGroupSize"
              name="maxGroupSize"
              type="number"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Max Group Size"
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Time
            </label>
            <input
              onChange={handleChange}
              id="time"
              name="time"
              type="text"
              // autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Time"
            />
          </div>
          <div>
            <label htmlFor="extra" className="sr-only">
              Extra
            </label>
            <input
              onChange={handleChange}
              id="extra"
              name="extra"
              type="text"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Extra"
            />
          </div>
          <div>
            <label htmlFor="guide" className="sr-only">
              Guide
            </label>
            <input
              onChange={handleChange}
              id="guide"
              name="guide"
              type="text"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Guide"
            />
          </div>
          <div>
            <label htmlFor="food" className="sr-only">
              Food
            </label>
            <input
              onChange={handleChange}
              id="food"
              name="food"
              type="text"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Food"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/*  */}
           
          </div>

          {/*  */}
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
          >
            {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true" />
                </span> */}
            Add Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
