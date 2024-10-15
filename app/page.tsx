import React from "react";
import styles from "./styles/landing.module.css";
import Image from "next/image";
import Link from "next/link";
// import Carousel from '@/components/carousel/Carousel'
import carouselStyles from './styles/carousel.module.css';
import { FaCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer/Footer";
import WhatsAppForm from "@/components/contact/WhatsAppForm";


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
          <span className="text-secondary">Fintech Solution for Lenders</span>
        </h1>
        <p className="p-3 text-white max-w-full">
          Revolutionizing Lending Services with Cutting-Edge Technology. Manage
          loan requests, disbursements, and repayments through our innovative,
          user-friendly platform for both USSD and web users.
        </p>

        <div className="flex items-center justify-center pt-4 gap-4">
          <Link href="/" className="cta primary-cta rounded-md" >
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
          <img src="/partners/logo.webp" alt="..." width={100} height={100} className={`${carouselStyles.carouselImage} bg-purple-800`} />
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
                <p className="card-text text-secondary text-center p-4 py-2 m-0 hover:text-white">
                Coastlink24 offers a suite of <strong>state-of-the-art tools</strong> that make it easy to manage loan requests, approve disbursements, and track repayments—all on a secure, intuitive platform. Whether you're handling micro-loans or large disbursements, our solution adapts to your business.
                </p>
              </div>
          </div>

            {/* Card 2 */}
            <div className="card text-start flex flex-col items-center bg-primary border-2 transform transition duration-300 ease-in-out overflow-hidden">
              <img className="card-img-top pb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse" src="/acessbility.jpg" height={50} width={50} alt="Why choose us 2" />
              <div className="card-body text-white flex flex-col gap-2 items-center">
                <h4 className="card-title tertiary-heading pt-2">Access Anytime, Anywhere</h4>
                <p className="card-text text-secondary text-center p-4 py-2 m-0  hover:text-white">
                With <strong> multi-platform access</strong> via USSD and the web, Coastlink24 ensures that your lending services are always available. Borrowers can apply for loans from anywhere, even without internet access, making financial inclusion a reality.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="card text-start flex flex-col items-center bg-primary border-2 transform transition duration-300 ease-in-out">
            <img className="card-img-top pb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse" src="/chart.jpg" height={50} width={50} alt="Why choose us 3" />
              <div className="card-body text-white flex flex-col gap-2 items-center">
                <h4 className="card-title tertiary-heading pt-2">Comprehensive Lender Dashboard</h4>
                <p className="card-text text-secondary text-center p-4 py-2 m-0 hover:text-white">
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
              <p className="text-justify px-6">Track every borrower's loan history, repayment progress, and disbursement details in one place. Coastlink24 allows lenders to easily access borrower profiles and stay on top of every loan.</p>

              <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Customizable Loan Products</h3>
              </span>
              <p className="text-justify px-6">Tailor your loan offerings to fit diverse borrower needs. With our,<strong> flexible loan product settings</strong> lenders can adjust interest rates, loan tenures, and repayment structures to meet the demands of their different products.</p>

              <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                  <h3 className="secondary-heading text-primary py-4 ">Automated Loan Processes</h3>
              </span>
              <p className="text-justify px-6">Reduce administrative load and increase your efficiency with our<strong> automated loan approval</strong> and processing system. Coastlink24 automates the heavy lifting, from loan applications to final disbursements, ensuring faster turnaround times.</p>

               <span className="flex flex-row items-center gap-2">
                  <FaCircle color=" hsl(240, 2%, 89%)" />
                  <h3 className="secondary-heading text-primary py-4 ">Secure Disbursements and Collections</h3>
                </span> 
                <p className="text-justify px-6">Ensure secure and reliable  <strong>loan disbursements and repayments</strong>, through our trusted payment gateway integrations. Coastlink24 prioritizes security, ensuring that every transaction is encrypted and protected from fraud.</p>

              <span className="flex flex-row items-center gap-2">
                <FaCircle color=" hsl(240, 2%, 89%)" />
                <h3 className="secondary-heading text-primary py-4 ">Detailed Analytics and Reporting</h3>
              </span>
              <p className="text-justify px-6">Gain valuable insights into your lending operations with our<strong> advanced analytics tools</strong>. Monitor loan performance, track repayment trends, and view real-time borrower activity, allowing you to make data-driven decisions.</p>
          </div> 
        </div> 
      </section>
      
      {/* Who can benefit */}
      <section className="flex flex-col items-center gap-8 sm:ps-4 md:p-6 lg:p-8 pb-8 pt-2 ">
        {/* Responsive grid container */}
        <div className="bg-secondary-color w-full">
          <div className=" py-16 px-4">
            <h2 className="text-primary tertiary-heading headColor pt-0 pb-8 text-center">WHO CAN BENEFIT FROM COASTLINK24?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
              {/* Lenders */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-blue-700/50 transition-all">
                <div className="p-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" className="w-8 mb-6" viewBox="0 0 640 512">
                    <path d="M344 416H120c-26.51 0-48-21.49-48-48V144c0-26.51 21.49-48 48-48h224c23.5 0 44.23 14.88 52.13 36.31l73.59 172.44c8.39 20.1-5.08 43.25-27.96 43.25H344z" />
                  </svg>
                  <h3 className="secondary-heading  mb-3">Lenders</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">From micro-lenders to established financial institutions, Coastlink24 offers a versatile platform that supports <strong>loan origination, management, and repayment tracking</strong>. Manage your loan portfolio with ease and scale your operations.</p>
                </div>
              </div>
              
              {/*Borrowers */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-blue-700/50 transition-all">
                <div className="p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" className="w-8 mb-6" viewBox="0 0 576 512">
                    <path d="M288 96c-45.48 0-87.94 17.62-119.6 49.48C138.04 174.9 128 203.79 128 232v32c0 10.84 1.37 21.36 4 31.25L96 335.05v37.65c0 24.35 19.65 44 44 44h242.41c-8.32-14.63-14.57-30.83-18.04-48H192c-13.25 0-24-10.75-24-24v-24h224v-32h-224v-24c0-13.25 10.75-24 24-24h224c14.14 0 26.63 4.08 37.32 10.88l39.68-39.68A191.49 191.49 0 0 0 288 96zM464 384c0 13.25-10.75 24-24 24H256c-13.25 0-24-10.75-24-24v-48h128c22.06 0 42.12-6.08 60.11-16.44l49.4 49.4c14.53 14.53 20.47 35.61 17.06 55.06z" />
                  </svg>
                  <h3 className="secondary-heading mb-3">Support</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Borrowers enjoy an easy, transparent loan process with <strong> instant approvals</strong> and flexible repayment terms. Coastlink24 offers multiple access points, including USSD for borrowers without internet access.</p>
                </div>
              </div>


              {/* Lenders Team */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-blue-700/50 transition-all">
                <div className="p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" className="w-8 mb-6" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g fill="none" stroke="#007bff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="40" clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z" data-original="#000000" />
                      <path d="M178 271.894 233.894 216 334 316.105" data-original="#000000" />
                    </g>
                  </svg>
                  <h3 className="secondary-heading mb-3">Lenders Team</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Empower your team with <strong>collaborative tools</strong> to monitor and manage loan applications, track disbursements, and improve customer interactions—all from a single, intuitive platform.
                  </p>
                </div>
              </div>
            </div>
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
            <p className="mx-auto mb-8 max-w-2xl font-light p-primary-heading sm:text-xl">
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
                <a href="/sign-up" className="font-medium text-primary-600 hover:underline">
                
                </a>
              </div>
              
            </form>
          </div>
        </div>
      </section>

      {/* Contact */}
      <WhatsAppForm />

      <Footer />
        
    </>
  );
}
