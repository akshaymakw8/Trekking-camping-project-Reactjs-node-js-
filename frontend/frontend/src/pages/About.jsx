// src/components/AboutUs.js
import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to BackPack And Explore!</h2>
          <p className="text-gray-600 leading-relaxed">
            At BackPack And Explore, we are passionate about adventure and exploration. We believe that the world is full of incredible places waiting to be discovered, and we're here to help you embark on unforgettable journeys.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us</h3>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Expert Guidance: Our team of travel experts is dedicated to providing you with the best advice and recommendations for your trips.</li>
            <li>Customized Itineraries: We tailor each travel package to suit your preferences, interests, and budget.</li>
            <li>Quality Accommodations: We handpick accommodations that meet our high standards of comfort and service.</li>
            <li>Local Knowledge: Our local guides are passionate about sharing their insights and making your journey culturally enriching.</li>
            <li>Customer Satisfaction: Your satisfaction is our top priority, and we strive to exceed your expectations in every aspect of your travel experience.</li>
            <li>Seamless Travel: Leave the logistics to us; we take care of all the arrangements so you can focus on enjoying your adventure.</li>
            <li>Wide Range of Destinations: From exotic beaches to historic landmarks, we offer a diverse selection of destinations to explore.</li>
            <li>Memorable Experiences: We curate experiences that create lasting memories and unique moments during your travels.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
