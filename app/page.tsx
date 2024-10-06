import React from "react";
import styles from "./styles/landing.module.css";
import Image from "next/image";
import Link from "next/link";
// import Carousel from '@/components/carousel/Carousel'
import carouselStyles from './styles/carousel.module.css';
import { FaCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <>
    <section
      className={`${styles.heroSection} | section-padding-block section-padding-block-start relative even-columns text-center items-center justify-center`}
    >
      <div
        className={`${styles.heroTextBox} relative z-20 flex flex-col lg:items-start items-center lg:text-left text-center`}
      >
        <h1 className={`${styles.mainText} primary-heading text-white`}>
          Welcome to Coastlink24 – Your Trusted{" "}
          <span className="text-grey">Fintech Solution for Lenders</span>
        </h1>
        <p className="p-3 text-white max-w-full">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>

        <div className="flex items-center justify-center pt-4 gap-4">
          <Link href="/" className="cta primary-cta rounded-md">
            Sign Up Now
          </Link>
          <Link
            href="/"
            className="cta secondary-cta hover:shadow-xl rounded-md"
          >
            Learn More
          </Link>
        </div>
      </div>

      <Image
        src="/hero.jpg"
        alt="coastlink24 dashboard ui"
        width={900}
        height={800}
        className="max-w-full h-auto rounded-lg heroSectImage flex self-center justify-center relative z-20 pt-8 lg:pt-0"
      />

      <Image
        src="/shape-2.png"
        alt="clip art illustration"
        width={1000}
        height={1000}
        className="absolute top-0 right-0"
      />
    </section>

      {/* Brand Logo Section */}
      <section className="section-padding-block py-8 flex flex-col items-center gap-6">
        <h2 className="text-primary headColor tertiary-heading ">OUR PARTNERS</h2>
        <div className={`${carouselStyles.brandCarousel} flex items-center justify-evenly gap-12`}>
          <img src="/partners/Coastlink24.png" alt="..." width={50} height={100} className={carouselStyles.carouselImage} />
          <img src="/partners/Coast.jpeg" alt="logo2" width={50} height={100} className={carouselStyles.carouselImage} />
          <img src="/partners/Coast.jpeg" alt="logo2" width={50} height={100} className={carouselStyles.carouselImage} />
          <img src="/partners/Coastlink24.png" alt="..." width={50} height={100} className={carouselStyles.carouselImage} />
          <img src="/partners/Coast.jpeg" alt="logo2" width={50} height={100} className={carouselStyles.carouselImage} />
        </div>
      </section>
      
      {/* Why choose us */}
      <section  className="flex flex-col items-center gap-8 sm:ps-4 md:p-6 lg:p-8">
        <h4 className="text-primary tertiary-heading headColor py-2">WHY CHOOSE COASTLINK24?</h4>
        <div className="cardBox even-columns ">
          {/* Card 1 */}

          <div className="card text-start flex flex-col items-center bg-primary border-2 transform transition duration-300 ease-in-out overflow-hidden">
              <img className="card-img-top pb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse" src="/innovative.jpg" height={50} width={50} alt="Why choose us 2" />
              <div className="card-body text-white flex flex-col gap-2 items-center">
                <h4 className="card-title tertiary-heading pt-2">Innovative Lending Tools</h4>
                <p className="card-text text-grey text-center p-4 py-2 m-0 hover:text-white">
                Coastlink24 offers a suite of <strong>state-of-the-art tools</strong> that make it easy to manage loan requests, approve disbursements, and track repayments—all on a secure, intuitive platform. Whether you're handling micro-loans or large disbursements, our solution adapts to your business.
                </p>
              </div>
          </div>

            {/* Card 2 */}
            <div className="card text-start flex flex-col items-center bg-primary border-2 transform transition duration-300 ease-in-out overflow-hidden">
              <img className="card-img-top pb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse" src="/acessbility.jpg" height={50} width={50} alt="Why choose us 2" />
              <div className="card-body text-white flex flex-col gap-2 items-center">
                <h4 className="card-title tertiary-heading pt-2">Access Anytime, Anywhere</h4>
                <p className="card-text text-grey text-center p-4 py-2 m-0  hover:text-white">
                With <strong> multi-platform access</strong> via USSD and the web, Coastlink24 ensures that your lending services are always available. Borrowers can apply for loans from anywhere, even without internet access, making financial inclusion a reality.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="card text-start flex flex-col items-center bg-primary border-2 transform transition duration-300 ease-in-out">
            <img className="card-img-top pb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse" src="/chart.jpg" height={50} width={50} alt="Why choose us 3" />
              <div className="card-body text-white flex flex-col gap-2 items-center">
                <h4 className="card-title tertiary-heading pt-2">Comprehensive Lender Dashboard</h4>
                <p className="card-text text-grey text-center p-4 py-2 m-0 hover:text-white">
                  Take full control of your lending operations. Our <strong>dynamic dashboard</strong> provides real-time insights into loan status, borrower data, repayments, and collections. Make decisions faster with a clear, user-friendly interface designed for efficiency.
                </p>
              </div>
            </div>


        </div>
        
      </section>

      {/* Features */}
      <section className="flex flex-col items-center gap-8 sm:ps-4 md:p-6 lg:p-8 pb-8  ">
      <h4 className="text-primary tertiary-heading headColor pt-12">FEATURES</h4>
      <div className="even-columns ">
 
           <div className="imgBox">
              <Image src='/featuresBusines.jpg' alt='' width={100} height={100} className="imageCard"/>
            </div>

          <div className="textBox ">
              <span className="flex flex-row items-center gap-2">
              <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Efficient Borrower Management</h3>
              </span>
              <p className="text-justify px-6">Track every borrower's <strong>loan history</strong>, repayment progress, and disbursement details in one place. Coastlink24 allows lenders to easily access borrower profiles and stay on top of every loan.</p>

              <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Customizable Loan Products</h3>
              </span>
              <p className="text-justify px-6">Tailor your loan offerings to fit diverse borrower needs. With our,<strong>flexible loan product settings</strong>lenders can adjust interest rates, loan tenures, and repayment structures to meet the demands of different clients.</p>

              <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                  <h3 className="secondary-heading text-primary py-4 ">Automated Loan Processes</h3>
              </span>
              <p className="text-justify px-6">Reduce administrative load and increase efficiency with our<strong>automated loan approval</strong> and processing system. Coastlink24 handles the heavy lifting, from loan applications to final disbursements, ensuring faster turnaround times.</p>

               <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                  <h3 className="secondary-heading text-primary py-4 ">Secure Disbursements and Collections</h3>
                </span> 
                <p className="text-justify px-6">Ensure secure and reliable  <strong>loan disbursements and repayments</strong>, through our trusted payment gateway integrations. Coastlink24 prioritizes security, ensuring that every transaction is encrypted and protected from fraud.</p>

              <span className="flex flex-row items-center gap-2">
                <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Detailed Analytics and Reporting</h3>
              </span>
              <p className="text-justify px-6">Gain valuable insights into your lending operations with our<strong>advanced analytics tools</strong>. Monitor loan performance, track repayment trends, and view real-time borrower activity, allowing you to make data-driven decisions.</p>
          </div> 
        </div> 
      </section>
      
      {/* Who can benefit */}
      <section className="flex flex-col items-center gap-8 sm:ps-4 md:p-6 lg:p-8 pb-8 pt-2 ">
      <h4 className="text-primary tertiary-heading headColor pt-12">WHO CAN BENEFIT FROM COASTLINK24?</h4>


        {/* Responsive grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          
          {/* Card 1 */}
          <div className="imgText gap-4 flex flex-col md:flex-row items-center justify-center p-4">
            <Image src='/featuresBusines.jpg' alt='' width={100} height={100} className="imageCardBenefit"/>
            
            <span className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-lg tertiary-heading text-primary pt-4">Lenders</h3>                
              <p className="text-justify">
                From micro-lenders to established financial institutions, Coastlink24 offers a versatile platform that supports <strong>loan origination, management, and repayment tracking</strong>. Manage your loan portfolio with ease and scale your operations.
              </p>
            </span>
          </div>

          {/* Card 2 */}
          <div className="imgText gap-4 flex flex-col md:flex-row items-center justify-center p-4">
            <Image src='/featuresBusines.jpg' alt='' width={100} height={100} className="imageCardBenefit"/>
            <span className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-lg text-primary pt-4 tertiary-heading">Borrowers</h3>
              <p className="text-justify">
                From micro-lenders to established financial institutions, Coastlink24 offers a versatile platform that supports <strong>loan origination, management, and repayment tracking</strong>. Manage your loan portfolio with ease and scale your operations.
              </p>
            </span>
          </div>

          {/* Card 3 */}
          <div className="imgText gap-4 flex flex-col md:flex-row items-center justify-center p-4">
            <Image src='/featuresBusines.jpg' alt='' width={100} height={100} className="imageCardBenefit"/>
            <span className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-lg text-primary pt-2 tertiary-heading">Lenders Team</h3>
              <p className="text-justify">
                Empower your team with <strong>collaborative tools</strong> to monitor and manage loan applications, track disbursements, and improve customer interactions—all from a single, intuitive platform.
              </p>
            </span>
          </div>
        </div>
      </section>

      {/* How Coast link work */}
       {/* Features */}
       <section className="flex flex-col items-center gap-8 sm:ps-4 md:p-6 lg:p-8 pb-8  ">
      <h4 className="text-primary tertiary-heading headColor pt-12">HOW COASTLINK24 WORK</h4>
      <div className="even-columns ">
 
           <div className="imgBox">
              <Image src='/ppp.jpg' alt='' width={100} height={100} className="imageCard"/>
            </div>

          <div className="textBox pt-0 ">
              <span className="flex flex-row items-center gap-2">
              <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Borrower Application</h3>
              </span>
              <p className="text-justify px-6">Borrowers submit a loan request via USSD or web, providing necessary details</p>

              <span className="flex flex-row items-center gap-2">
              <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Instant Loan Evaluation</h3>
              </span>
              <p className="text-justify px-6">The request is evaluated against lender criteria, ensuring fast, reliable loan decisions.</p>

              <span className="flex flex-row items-center gap-2">
              <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Loan Approval & Disbursement</h3>
              </span>
              <p className="text-justify px-6">Approved loans are automatically disbursed, with real-time tracking for both the lender and borrower.</p>

              <span className="flex flex-row items-center gap-2">
              <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Repayment & Collection</h3>
              </span>
              <p className="text-justify px-6">Coastlink24 automates the repayment process, ensuring timely collections and simplified management for lenders.
              </p>
            </div>
        </div> 
      </section>
      
      {/* Get Started Today with Coastlink24 */}
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center">
            {/* Section Heading */}
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold primary-heading text-primary sm:text-4xl">
              Sign up for our newsletter
            </h2>
            
            {/* Section Description */}
            <p className="mx-auto mb-8 max-w-2xl font-light  p-primary-heading sm:text-xl">
            Join Coastlink24 and elevate your lending business to new heights. Whether you're looking to manage loan requests, improve loan disbursement efficiency, or automate collections, Coastlink24 is your one-stop solution for all things lending.
            </p>
            
            {/* Newsletter Form */}
            <form action="#">
              <div className="flex flex-col items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex-row sm:space-y-0">
                
                {/* Email Input */}
            
                <div className="mt-0 flex items-center overflow-hidden bg-gray-50 rounded-md max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent py-2 px-4 text-gray-800 text-base rounded-full focus:outline-none"
              />
              <button className="second-primary-cta p-6 rounded bg-primary">
                Subscribe
              </button>
            </div>

            </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 dark:text-gray-300 text-center">
              Sign Up Now and experience the future of lending with Coastlink24.
                <a href="#" className="font-medium text-primary-600 hover:underline">
                
                </a>
              </div>
              
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-5xl lg:max-w-full mx-auto bg-white my-6 font-sans">
      {/* Header Section */}
      <div className="text-center px-6">
        <h2 className="text-gray-800 secondary-heading  text-primary font-bold">Contact Us</h2>
        <p className="secondary-heading text-gray-500 mt-4">
        Have questions? We're here to help.
        </p>
      </div>

      {/* Contact Form and Information Section */}
      <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-md rounded-lg mt-12">
        {/* Contact Information */}
        <div className="bg-gradent-primary rounded-lg p-6 h-full order-1 pt-12 lg:order-none">
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
              <a
                href="mailto:info@coastlink24.com "
                className="text-white text-sm text-gray-500 ml-4"
              >
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
              <span className="text-white text-sm text-gray-500 ml-4">
              +234 (XXX) XXX-XXXX
              </span>
            </li>
            <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="#fff"
              viewBox="0 0 384 512"
            >
              <path d="M168 0C75.05 0 0 75.05 0 168c0 87.4 71.6 169.5 166.6 261.6a31.94 31.94 0 0 0 44.8 0C312.4 337.5 384 255.4 384 168 384 75.05 308.95 0 216 0H168zm0 192c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48z"/>
            </svg>

              <span className="text-white text-sm text-gray-500 ml-4">
              No. XX, Street Name, City, Nigeria
              </span>
            </li>

          </ul>
        </div>

        {/* Contact Form Part*/}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 h-full shadow-lg">
          <form className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
            />

            <textarea
              placeholder="Your message"
              rows="6"
              className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none"
            />

            <button
              type="submit"
              className="text-white second-primary-cta py-6 rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>



    


     
        
    </>
  );
}
