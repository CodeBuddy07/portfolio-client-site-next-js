"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Title from "@/components/Shared/Title";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { DotLottiePlayer } from "@dotlottie/react-player";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useTestimonials } from "@/Tanstack/Testimonials/useTestimonials";

// Demo reviews - you can replace this with your actual data


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Reviews = () => {
 
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const { data: reviews } = useTestimonials({featured:true});

  const data = {
    reviews: reviews?.testimonials || []
  };


  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} 
      />
    ));
  };

  return (
    <section className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] z-10 relative py-24 w-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-red-600/5 filter blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-blue-600/5 filter blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title 
          title="CLIENT TESTIMONIALS" 
          description="What our clients say about our development services and collaboration experience."
        />

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          {data?.reviews?.length > 0 ? (
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              spaceBetween={0}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              pagination={{ 
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-red-500 !opacity-70",
                bulletActiveClass: "!bg-red-600 !opacity-100"
              }}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="container mx-auto mt-10 py-16 "
            >
              {data.reviews.map((review, index) => (
                <SwiperSlide key={index} className="bg-transparent ">
                  <motion.div 
                    className="backdrop-blur-sm bg-black/80 border border-gray-800 rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-8 relative h-62">
                      {/* Large quote background */}
                      <Quote className="absolute top-4 right-4 w-16 h-16 text-red-600/10" strokeWidth={1} />
                      
                      {/* Avatar and Info */}
                      <div className="flex items-center space-x-4 mb-6 relative z-10">
                        <div className="relative">
                          <div className="relative rounded-full p-0.5 bg-gradient-to-r from-red-500 to-red-700">
                            <Image
                              src={review.imgDisplayURL!}
                              alt={review.name}
                              width={60}
                              height={60}
                              className="rounded-full w-14 h-14 object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{review.name}</h3>
                          <p className="text-gray-400 text-sm">{review.position} @ {review.company}</p>
                          <div className="flex mt-1">
                            {renderStars(review.starCount)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Review Text */}
                      <div className="mt-4 relative z-10">
                        <p className="text-gray-300 italic leading-relaxed text-sm ">
                          &quot;{review.testimonial}&quot;
                        </p>
                      </div>
                      
                      {/* Bottom decoration */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"></div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-sm mx-auto">
                <DotLottiePlayer
                  src="https://lottie.host/da913bc1-11d4-4335-8b3d-6011a1270890/pb21ufmoev.lottie"
                  autoplay
                  loop
                />
              </div>
              <motion.h3 
                className="mt-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                No Reviews Yet!
              </motion.h3>
              <p className="mt-2 text-gray-400 text-center max-w-md">
                Be the first to share your experience with our services.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;