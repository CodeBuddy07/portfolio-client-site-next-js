"use client";

import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

const Stats = () => {
  const [visible, setVisible] = useState(false);

  // Static data instead of fetching
  const totalHours = 1200; // Example total hours
  const totalProjects = 25; 
  const totalReviews = 18; 

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    });

    const target = document.querySelector("[data-statistics]");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div data-statistics className="relative w-full h-[100vh] overflow-hidden">
      
      {/* Parallax Background */}
      <ParallaxBanner
        layers={[
          {
            image: "/Stats.jpg", // Static background image
            speed: -20,
            style: {
              objectFit: "cover",
              objectPosition: "center",
            },
          },
        ]}
        className="absolute inset-0 w-full h-full"
      >
        <ParallaxBannerLayer>
          {/* Overlay */}
         
          
          {/* Statistics Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:flex-wrap gap-20 justify-center items-center h-full xl:px-80 lg:px-32 px-5 py-20">
            
            {/* Stat 1 */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-red-500 mb-3">
                {visible ? <CountUp end={totalHours} /> : 0}
              </h1>
              <p className="text-lg text-gray-300">Hours of Work</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-red-500 mb-3">
                {visible ? <CountUp end={totalProjects} /> : 0}+
              </h1>
              <p className="text-lg text-gray-300">Projects</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-red-500 mb-3">
                {visible ? <CountUp end={totalReviews} /> : 0}+
              </h1>
              <p className="text-lg text-gray-300">Satisfied Customers</p>
            </div>

          </div>
        </ParallaxBannerLayer>
      </ParallaxBanner>
    </div>
  );
};

export default Stats;
