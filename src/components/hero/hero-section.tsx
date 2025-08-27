import { BlogGrid } from "./blog-grid";
import Heading from "../main-heading";
import HeroHome from "./hero-home";
import { BlogCategorySection } from "./blog-category-section";
import { TopAuthors } from "./marque-testimonial";
import Newsletter from "../newsletter-section";
import Footer from "../footer-section";


export function HeroSection() {


    return (
        <div>

            <HeroHome />

            <Heading h1="Explore Recent Insights and Articles" text="Insights and strategies shaping the future of technology." />

            <div>
                <BlogGrid />
            </div>

            <div>
                <BlogCategorySection />
            </div>


            <div className="  max-w-7xl mx-auto pb-5 ">

                <Heading
                    h1="Top Authors"
                    text="Meet the creative minds behind the content"
                />

                <TopAuthors />
            </div>

            <div>
                <Newsletter />
                <Footer />
            </div>


        </div>


    );
}

