import React from "react";
import { RainbowButton } from "./magicui/rainbow-button";
import { BorderBeam } from "./magicui/border-beam";

// Gradient Border Wrapper
const GradientBorderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        relative z-10
        rounded-xl
        border border-transparent
        bg-[linear-gradient(#f9fafb,#f9fafb),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]
        bg-[length:200%]
        [background-clip:padding-box,border-box]
        [background-origin:border-box]
        animate-rainbow
        dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]
      "
    >
      {/* BorderBeam Animation */}
      <BorderBeam size={150} duration={12} delay={5} />

      {/* Actual inner content */}
      <div className="relative rounded-xl bg-white dark:bg-neutral-950 p-10">
        {children}
      </div>
    </div>
  );
};

const Newsletter = () => {
  return (
    <div className="max-w-6xl m-auto my-20 px-4">
      <GradientBorderWrapper>
        <section>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
            <div>
              <h2 className="text-2xl md:text-4xl text-black font-bold pb-5">
                Subscribe to Newsletter
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Provide your email to get notified when we launch <br />
                new products or publish fresh articles.
              </p>
            </div>


            <form className="flex flex-col sm:flex-row items-center w-100 justify-center gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 h-[44px] px-4 rounded-md text-black 
             border border-gray-200 bg-white
             focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
              />


              <RainbowButton type="submit" className="h-[44px] px-5">
                Subscribe
              </RainbowButton>

            </form>

          </div>
        </section>
      </GradientBorderWrapper>
    </div>
  );
};

export default Newsletter;
