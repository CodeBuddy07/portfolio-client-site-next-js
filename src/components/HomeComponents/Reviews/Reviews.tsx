/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Title from "@/components/Shared/Title";
import Image from "next/image";
import { DotLottiePlayer } from "@dotlottie/react-player"; // If you use lottie player
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Quote } from "lucide-react";


const Reviews = () => {
    const data = {
        reviews: [
            
        ],
    };




    return (
        <>
            {/* Review Form Dialog */}
            {/* <dialog
        open={visible}
        className="fixed z-30 w-screen h-screen bg-black/30 backdrop-blur-sm left-0 top-0 flex justify-center items-center"
      >
        <div className="bg-gray-900 w-max md:px-20 px-5 py-2 rounded-md mx-auto pt-10">
          <Title title="REVIEW FORM" />

          <form onSubmit={handleSubmit} className="my-10 space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <label htmlFor="country" className="text-white">
                  Country*
                </label>
                <input
                  id="country"
                  className="border p-2 rounded-md my-3 w-full md:w-64 bg-gray-800 text-white"
                  type="text"
                  name="country"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="text-white">
                  City*
                </label>
                <input
                  id="city"
                  className="border p-2 rounded-md my-3 w-full md:w-64 bg-gray-800 text-white"
                  type="text"
                  name="city"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="review" className="text-white">
                Review*
              </label>
              <textarea
                id="review"
                className="border p-2 rounded-md my-3 w-full bg-gray-800 text-white"
                cols={30}
                rows={5}
                name="review"
                maxLength={150}
                required
              />
            </div>

            <div className="w-full text-right space-x-4">
              <Button
                type="button"
                onClick={() => setVisible(false)}
                variant="destructive"
              >
                Close
              </Button>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </dialog> */}

            {/* Reviews Section */}
            <div className="bg-[#131313] shadow-[0px_0px_65px_65px_#131313] relative z-10 w-full py-20">
                <Title title="REVIEWS" />



                {data?.reviews?.length > 0 ? (
                    <div className="py-20">
                        <Swiper
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={0}
                            effect="coverflow"
                            grabCursor
                            centeredSlides
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 10,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
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
                            modules={[Autoplay, EffectCoverflow, Pagination]}
                            className="lg:w-[70%] *:py-20"
                        >
                            {data.reviews.map((review: any, index: number) => (
                                <SwiperSlide key={index} className="bg-[#131313]">
                                    <div className="group">
                                        <div className="text-center h-56 flex flex-col gap-2 justify-center items-center border-2 border-red-600 p-3 rounded-md relative mx-3 md:mx-0">
                                            <Image
                                                src={review.imgURL}
                                                alt={review.name}
                                                width={100}
                                                height={100}
                                                className="w-24 h-24 rounded-full absolute -top-16 border-2 p-1 bg-[#131313] border-red-600"
                                            />
                                            <div className="pt-7">
                                                <h1 className="text-lg font-bold text-red-600">
                                                    {review.name}
                                                </h1>
                                                <p className="text-gray-300">{review.address}</p>
                                            </div>
                                            <div className="flex flex-1">
                                                <Quote className="text-red-600 pl-1"/>
                                                <p className="text-base font-light text-gray-400 pt-2">
                                                    {review.review}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5 w-full justify-center items-center mt-10">
                        <div className="max-w-96">
                            <DotLottiePlayer
                                src="https://lottie.host/da913bc1-11d4-4335-8b3d-6011a1270890/pb21ufmoev.lottie"
                                autoplay
                                loop
                            />
                        </div>

                        <h1 className="text-2xl text-red-600 font-">
                            No Reviews Yet!
                        </h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default Reviews;
