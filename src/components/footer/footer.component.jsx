import React from 'react';
import './footer.styles.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer__component'>
            <footer className="footbar text-center">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-facebook-f"></i>
                        </Link>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-twitter"></i>
                        </Link>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-google"></i>
                        </Link>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-instagram"></i>
                        </Link>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-linkedin"></i>
                        </Link>
                        <Link to='#' className="me-4 text-reset">
                            <i className="fa fa-github"></i>
                        </Link>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>eHealthCare
                                </h6>
                                <p>
                                    Get medical help from the experts with the help of our application in a digital way. Just Register, Login and Get your health checked regularly!!!
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Services
                                </h6>
                                <p>
                                    <Link to='/' className="text-reset">Help for Doctor</Link>
                                </p>
                                <p>
                                    <Link to='/' className="text-reset">Help for Patient</Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <Link to='/' className="text-reset">Home</Link>
                                </p>
                                <p>
                                    <Link to='/about-us' className="text-reset">About Us</Link>
                                </p>
                                <p>
                                    <Link to='/faq' className="text-reset">FAQ</Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fa fa-home me-3"></i> Goa, GA 00000, IN</p>
                                <p>
                                    <i className="fa fa-envelope me-3"></i>
                                    ehealthcare@test.com
                                </p>
                                <p><i className="fa fa-phone me-3"></i> + 91 7894561230</p>
                                <p><i className="fa fa-print me-3"></i> + 91 7894561230</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4">
                    © 2023 Copyright
                </div>
            </footer>
        </div>
    );
}

export default Footer;