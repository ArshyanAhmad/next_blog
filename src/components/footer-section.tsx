import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import FooterNav from "./footer-navitems";

export default function Footer() {

    return (
        <footer className="bg-white border-t border-gray-200 text-black">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">

                <div className="flex text-center  justify-between">


                    <div className=" text-center text-sm text-gray-500">
                        © 2025 SmartScroll. All rights reserved.
                    </div>
                    <FooterNav />

                    {/* Social Links */}
                    <div className="flex justify-center md:justify-end space-x-5">
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="hover:text-gray-600 transition-colors"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="GitHub"
                            className="hover:text-gray-600 transition-colors"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="hover:text-gray-600 transition-colors"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>


                </div>

            </div>
        </footer>
    );
}
