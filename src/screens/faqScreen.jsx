import HeaderComponent from "../components/header";

function FAQScreen() {
    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <div className="flex flex-col mx-36 mt-8">
            <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq1"
                            aria-expanded="true"
                            aria-controls="faq1"
                        >
                            <span className="flex-1 text-left font-semibold">What is this website about?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq1" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            This website is a comprehensive platform for finding 
                            and rating Paying Guest (PG) accommodations. Users can 
                            search for PGs based on their preferences, read reviews, 
                            and view ratings provided by other users.
                        </div>
                    </div>
                </div>

                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq2"
                            aria-expanded="false"
                            aria-controls="faq2"
                        >
                            <span className="flex-1 text-left font-semibold">Do I need to create an account to use the website?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            Yes, creating an account allows you to save your favorite PGs, 
                            leave reviews, and rate accommodations. However, you can browse 
                            the listings without an account.
                        </div>
                    </div>
                </div>

                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq3"
                            aria-expanded="false"
                            aria-controls="faq3"
                        >
                            <span className="flex-1 text-left font-semibold">How are the PGs rated on your website?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq3" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            PGs are rated based on various criteria including room quality, 
                            cleanliness, location, and overall experience. Users can leave 
                            ratings and detailed reviews after their stay.
                        </div>
                    </div>
                </div>

                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq4"
                            aria-expanded="false"
                            aria-controls="faq4"
                        >
                            <span className="flex-1 text-left font-semibold">Can I leave a review for a PG I have stayed in?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq4" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            Yes, after logging into your account, you can leave a review and rate 
                            the PG you have stayed in. Your feedback will help other users make 
                            informed decisions.
                        </div>
                    </div>
                </div>

                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq5"
                            aria-expanded="false"
                            aria-controls="faq5"
                        >
                            <span className="flex-1 text-left font-semibold">How is my personal information protected?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq5" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            We take your privacy seriously and use advanced security measures to protect 
                            your personal information. Please refer to our Privacy Policy for more details.
                        </div>
                    </div>
                </div>

                <div className="accordion-item border-b">
                    <h2>
                        <button
                            className="accordion-button relative flex items-center w-full py-4 px-5 text-base font-semibold text-left text-gray-800 bg-white border border-gray-300 rounded-none hover:no-underline focus:ring-0 focus:outline-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq6"
                            aria-expanded="false"
                            aria-controls="faq6"
                        >
                            <span className="flex-1 text-left font-semibold">Are there any additional fees for using your website?</span>
                            <svg className="w-6 h-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </h2>
                    <div id="faq6" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                        <div className="accordion-body py-4 px-5">
                            No, using our website to search for and rate PG accommodations is completely free. 
                            However, the PGs may have their own charges for accommodation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default FAQScreen;
