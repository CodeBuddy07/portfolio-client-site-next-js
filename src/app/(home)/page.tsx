import About from '@/app/(home)/_components/About/About';
import FloatingSkills from '@/app/(home)/_components/SkillSlider/SkillSlider';
import { Header } from '@/app/(home)/_components/Header/Header';
import Quote from '@/app/(home)/_components/Quote/Quote';
import React from 'react';
import Reviews from '@/app/(home)/_components/Reviews/Reviews';
import Stats from '@/app/(home)/_components/Stats/Stats';
import Services from '@/app/(home)/_components/Services/Services';
import Projects from '@/app/(home)/_components/Projects/Project';
import OnGoing from '@/app/(home)/_components/OnGoingProject/OnGoingProject';
import Contact from '@/app/(home)/_components/ContactMe/ContactMe';
import Footer from '@/components/Shared/Footer';
import EducationSection from './_components/Education/Education';


const page = () => {

    return (
        <div className=' bg-black'>
            <Header />
            <About />
            <EducationSection/>
            <Quote />
            <FloatingSkills />
            <Reviews />
            <Stats />
            <Services />
            <Projects />
            <OnGoing />
            <Contact />
            <Footer />
        </div>
    );
};

export default page;