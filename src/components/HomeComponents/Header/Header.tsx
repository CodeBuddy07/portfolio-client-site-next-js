'use client'

import { ParallaxBanner } from "react-scroll-parallax";
import { TsParticles } from "./components/TS-Particle";
import Typewriter from 'typewriter-effect';


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
                layers={[{ image: "/HeaderBG.jpg", speed: -20 }]}
                className="absolute inset-0 z-0 w-full h-full" // Push this far back
            >

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-0" />

                {/* Particle layer */}
                <div className="absolute inset-0 z-10">
                    <TsParticles />
                </div>

                {/* Foreground content */}
                <div className="relative z-20 flex h-full items-center container mx-auto">
                    <div className="container px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl space-y-10 text-white">
                            {data?.title && (
                                <span className="inline-block rounded bg-red-600/90 px-3 py-1 text-sm font-medium tracking-widest backdrop-blur-sm">
                                    {data.title}
                                </span>
                            )}
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                <Typewriter
                                    options={{
                                        strings: [data.designation1, data.designation2],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h1>
                            <div className="space-y-1 border-l-2 border-gray-400/50 pl-4 text-sm py-2">
                                {data?.country && <h2 className="font-semibold">{data.country}</h2>}
                                {data?.address && (
                                    <p className="text-gray-200/90">{data.address}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </header>


    )
}