export default function Footer() {
    return (
        <>
            {/* CTA Section */}
            <section className="section bg-blue-500 footer-cta py-5">
                <div className="container">
                    <div className="title-block text-center text-white">
                        <h2 className="text-4xl p-1">We’re here for you 24/7!</h2>
                        <div className="heading-1 text-2xl">Give us a call anytime:</div>
                        <div className="heading-1 mt-2 text-xl">
                            <a href="tel:+91-76966-66640" className="text-yellow-400 hover:text-yellow-500">+91-76966-66640</a>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer Section */}
            <footer className="site-footer bg-black text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
                        {/* About Us Section */}
                        <div>
                            <h2 className="footer-title text-xl font-bold mb-4">About Us</h2>
                            <p>
                                <i><b>Sardar Travels</b></i> is one of the leading tour and travel companies in Chandigarh. With an aim of fulfilling the transportation needs of the customers, we have been providing our clients the best cab booking services.
                            </p>
                            <div className="footer-social-links mt-4 flex space-x-4">
                                <a className="facebook" href="https://www.facebook.com/sardartravels.in/">
                                    <img src="https://sardartravels.in/assets/frontend/images/facebook.png" alt="Facebook" className="w-6 h-6" />
                                </a>
                                <a className="google" href="https://www.instagram.com/sardar__travels">
                                    <img src="https://sardartravels.in/assets/frontend/images/insta.png" alt="Instagram" className="w-6 h-6" />
                                </a>
                                <a className="twitter" href="https://twitter.com/SardarTravels1/">
                                    <img src="https://sardartravels.in/assets/frontend/images/twitter.png" alt="Twitter" className="w-6 h-6" />
                                </a>
                                <a className="tumblr" href="https://www.linkedin.com/in/sardar-travels-a3a8722a8/">
                                    <img src="https://sardartravels.in/assets/frontend/images/linked.png" alt="LinkedIn" className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        {/* Footer Links Section */}
                        <div>
                            <h2 className="footer-title text-xl font-bold mb-4">Footer Links</h2>
                            <ul className="space-y-2">
                                <li><a href="https://sardartravels.in/blogs" className="hover:text-yellow-400"><i className="fa fa-caret-right"></i> Blogs</a></li>
                                <li><a href="https://sardartravels.in/review" className="hover:text-yellow-400"><i className="fa fa-caret-right"></i> Reviews</a></li>
                                <li><a href="https://sardartravels.in/faq" className="hover:text-yellow-400"><i className="fa fa-caret-right"></i> FAQ</a></li>
                                <li><a href="https://sardartravels.in/about" className="hover:text-yellow-400"><i className="fa fa-caret-right"></i> About Us</a></li>
                                <li><a href="https://sardartravels.in/contact" className="hover:text-yellow-400"><i className="fa fa-caret-right"></i> Contact Us</a></li>
                            </ul>
                        </div>

                        {/* Our Vehicles Section */}
                        <div>
                            <h2 className="footer-title text-xl font-bold mb-4">Our Vehicles</h2>
                            <ul className="space-y-2">
                                <li><a href="https://sardartravels.in/cab/toyota-etios" className="flex items-center hover:text-yellow-400"><i className="fa fa-taxi mr-2"></i> Toyota Etios</a></li>
                                <li><a href="https://sardartravels.in/cab/maruti-dzire" className="flex items-center hover:text-yellow-400"><i className="fa fa-taxi mr-2"></i> Maruti Dzire</a></li>
                                <li><a href="https://sardartravels.in/cab/innova-crysta" className="flex items-center hover:text-yellow-400"><i className="fa fa-taxi mr-2"></i> Innova Crysta</a></li>
                                <li><a href="https://sardartravels.in/cab/tempo-traveller-12-1" className="flex items-center hover:text-yellow-400"><i className="fa fa-taxi mr-2"></i> Tempo Traveller 12+1</a></li>
                            </ul>
                        </div>

                        {/* Contact Us Section */}
                        <div>
                            <h2 className="footer-title text-xl font-bold mb-4">Contact Us</h2>
                            <div>
                                <p><i className="fa fa-map-marker"></i> Plot No D-151, Phase-8, Industrial Area, Sahibzada Ajit Singh Nagar</p>
                                <p><i className="fa fa-phone"></i> <a href="tel:+91-76966-66640">+91-76966-66640</a></p>
                                <p><i className="fa fa-envelope"></i> <a href="mailto:Sardartravelschd@gmail.com">Sardartravelschd@gmail.com</a></p>
                            </div>

                            {/* Newsletter */}
                            <form action="https://sardartravels.in/contact/email" method="POST" className="mt-4 flex space-x-2">
                                <input type="text" name="mobile" placeholder="Enter Phone No." className="px-4 py-2 rounded" />
                                <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Call Me</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center bg-gray-800 text-white py-4">
                    <p>Sardar Travels ©2024 | All Rights Reserved</p>
                </div>
            </footer>
        </>
    );
}
