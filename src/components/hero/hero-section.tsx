import { BlogGrid } from "./blog-grid";
import Heading from "../main-heading";
import HeroHome from "./hero-home";
import { BlogCategorySection } from "./blog-category-section";


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

        </div>
    );
}

