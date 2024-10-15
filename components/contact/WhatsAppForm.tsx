"use client"
import React, { useState } from 'react';
import styles from '@/app/styles/whatsAppForm.module.css'

const WhatsAppForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '+2348072991328';
    const whatsappMessage = `*New Message from Coastlink24*%0A*First Name:* ${firstName}%0A*Last Name:* ${lastName}%0A*Email:* ${email}%0A*Message:* ${message}`;
    
    // Open WhatsApp with the constructed URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="max-w-5xl lg:max-w-full mx-auto bg-white my-6 font-sans p-4">
      {/* Header Section */}
      <div className="text-center px-6">
        <h2 className="text-gray-800 secondary-heading text-primary font-bold">Contact Us</h2>
        <p className="secondary-heading text-gray-500 mt-4">
          Have questions? We're here to help.
        </p>
      </div>

      {/* Contact Form and Information Section */}
      <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-md rounded-lg mt-12">
        {/* Contact Information */}
        <div className={`${styles.gradientPrimary} rounded-lg p-6 h-full order-1 pt-12 lg:order-none `}>
          <h2 className="text-xl text-white">Contact Information</h2>
          <p className="text-md text-gray-300 mt-4">
            Have questions? We're here to help.
          </p>
          <ul className="mt-12 space-y-8">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 479.058 479.058"
              >
                <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
              </svg>
              <a href="mailto:info@coastlink24.com" className="text-white text-sm text-gray-500 ml-4">
                info@coastlink24.com
              </a>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 482.6 482.6"
              >
                <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7z" />
              </svg>
              <span className="text-white text-sm text-gray-500 ml-4">+234 (807) 299-1328</span>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" viewBox="0 0 384 512">
                <path d="M168 0C75.05 0 0 75.05 0 168c0 87.4 71.6 169.5 166.6 261.6a31.94 31.94 0 0 0 44.8 0C312.4 337.5 384 255.4 384 168 384 75.05 308.95 0 216 0H168zm0 192c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48z" />
              </svg>
              <span className="text-white text-sm text-gray-500 ml-4">
                Coast House, opposite NMPC, Ibadan Poly Road, Ibadan, Oyo State, Nigeria.
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Form Part */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 h-full shadow-lg">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className={`${styles.gradientPrimary} p-4 text-white rounded-lg focus:outline-none`}
            >
              Send Message via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppForm;
