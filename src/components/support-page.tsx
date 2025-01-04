"use client";

import React, { useState } from "react";
import { FaEnvelope, FaRegLightbulb, FaPhoneAlt } from "react-icons/fa";

// Define types for form inputs
interface FormData {
  name: string;
  email: string;
  message: string;
}

const SupportPage: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="support-container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
        Support
      </h1>
      <p className="text-lg text-center text-gray-700 mb-12">
        Need help? Our support team is here to assist you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Section */}
        <div className="form-section bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-indigo-600" />
            Contact Support
          </h2>
          <p className="mb-4 text-gray-600">
            Have a question or need assistance? Reach out to us:
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        {/* FAQs Section */}
        <div className="faq-section bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
            <FaRegLightbulb className="mr-2 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <ul className="space-y-6 text-gray-600">
            <li>
              <h3 className="font-semibold flex items-center">
                <FaPhoneAlt className="mr-2 text-indigo-600" />
                How can I contact support?
              </h3>
              <p>
                Simply fill out the contact form on this page, and we&apos;ll get
                back to you shortly.
              </p>
            </li>
            <li>
              <h3 className="font-semibold flex items-center">
                <FaPhoneAlt className="mr-2 text-indigo-600" />
                What should I do if I can&apos;t log in?
              </h3>
              <p>
                If you&apos;re having trouble logging in, try resetting your password
                or contact support for further assistance.
              </p>
            </li>
            <li>
              <h3 className="font-semibold flex items-center">
                <FaPhoneAlt className="mr-2 text-indigo-600" />
                How do I update my account settings?
              </h3>
              <p>
                You can update your account settings from your profile page in
                the app.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default SupportPage;
