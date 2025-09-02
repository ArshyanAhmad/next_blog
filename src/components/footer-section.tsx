import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import FooterNav from "./footer-navitems";
import { AuroraText } from "./magicui/aurora-text";
import Link from "next/link";

export default function Footer() {

    return (
        <footer className="bg-white border-t border-gray-200 text-black">
            <div className="max-w-6xl mx-auto  py-8">

                <div className="flex text-center items-center  justify-between">

                    <div className=" text-center text-sm text-gray-500 ">
                        <AuroraText>© 2025 SmartScroll. All rights reserved.</AuroraText>
                    </div>

                    <FooterNav />

                    {/* Social Links */}
                    <div className="flex items-center justify-center md:justify-end space-x-5">
                        <h5 className="text-gray-600 text-md"><AuroraText>Follow us: </AuroraText></h5>
                        <Link
                            href="#"
                            aria-label="Twitter"
                            target="_blank"
                            className="hover:text-blue-500 transition-colors  text-gray-600"
                        >
                            <FaTwitter size={16} />
                        </Link>
                        <Link
                            href="https://github.com/arshyanahmad"
                            aria-label="GitHub"
                            target="_blank"
                            className="hover:text-black transition-colors  text-gray-600"
                        >
                            <FaGithub size={16} />
                        </Link>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="hover:text-blue-500 transition-colors  text-gray-600"
                        >
                            <FaLinkedin size={16} />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
}




