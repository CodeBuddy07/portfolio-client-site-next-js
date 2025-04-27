'use client'



import { ParallaxBanner } from "react-scroll-parallax";
import { TsParticles } from "./components/TS-Particle";
import Typewriter from 'typewriter-effect';

// Custom shadcn-style jarallax component

export const Header = () => {
    const data = {
        "_id": "65b69066ed5527627fc08139",
        "placeholder": "header",
        "designation1": "DEVELOPER",
        "designation2": "PROGRAMMER",
        "title": "I'M RUHUL AMIN",
        "bgImgDeleteURL": "https://ibb.co/tXs2rJG/b0ba77438e7a1ba610dcdf9fe8f1294c",
        "bgImgDisplayURL": "https://i.ibb.co/fvpNwxg/4.jpg",
        "address": "MOGHBAZAR, DHAKA",
        "country": "BANGLADESH"
    }



    return (
        <header id="header" className="relative h-screen w-full overflow-hidden" >
            {/* Background image with Parallax */}
            <ParallaxBanner
                layers={[{ image: "/4.jpg", speed: -20 }]}
                className="absolute inset-0 z-0 w-full h-full" // Push this far back
            >

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-0" />

                {/* Particle layer */}
                <div className="absolute inset-0 z-10">
                    <TsParticles />
                </div>

                {/* Foreground content */}
                <div className="relative z-20 flex h-full items-center">
                    <div className="container px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl space-y-6 text-white">
                            {data?.title && (
                                <span className="inline-block rounded bg-red-600/90 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                                    {data.title}
                                </span>
                            )}
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                                <Typewriter
                                    options={{
                                        strings: [data.designation1, data.designation2],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h1>
                            <div className="space-y-1 border-l-2 border-gray-400/50 pl-4">
                                {data?.country && <h2 className="font-medium">{data.country}</h2>}
                                {data?.address && (
                                    <p className="text-gray-300/90">{data.address}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </header>


    )
}