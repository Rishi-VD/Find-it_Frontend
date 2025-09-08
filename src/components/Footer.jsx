import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-muted flex justify-center w-full bg-gray-100 py-12">
            <div className="container w-8/12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-blue-400">
                            FindIt
                        </h3>
                        <p className="text-sm text-gray-500 text-muted-foreground">
                            Connecting our community to reunite people with their lost belongings.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Heart className="h-4 w-4 text-primary text-blue-400" />
                            <span className="text-gray-500">Made with love for the community</span>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-gray-500 text-sm text-muted-foreground">
                            <li><Link to="/search-lost-items" className="hover:text-primary transition-colors">Browse Items</Link></li>
                            <li><Link to="/report-items" className="hover:text-primary transition-colors">Post Found Item</Link></li>
                            <li><Link to="/post-item" className="hover:text-primary transition-colors">Post Lost Item</Link></li>
                            <li><Link to="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h4 className="font-semibold">Popular Categories</h4>
                        <ul className="space-y-2 text-gray-500 text-sm text-muted-foreground">
                            <li><a className="hover:text-primary transition-colors">Electronics</a></li>
                            <li><a className="hover:text-primary transition-colors">Pets</a></li>
                            <li><a className="hover:text-primary transition-colors">Jewelry</a></li>
                            <li><a className="hover:text-primary transition-colors">Documents</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Contact Us</h4>
                        <div className="space-y-2 text-gray-500 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>help@findit.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+91 8957669088</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Andhra Pradesh, Kadapa dist, Proddatur, INDIA💖</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm text-muted-foreground">
                    <p>&copy; 2025 FindIt. All rights reserved. Built with ❤️ for our community.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;