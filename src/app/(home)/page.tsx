import About from '@/components/HomeComponents/About/About';
import FloatingSkills from '@/components/HomeComponents/SkillSlider/SkillSlider';
import { Header } from '@/components/HomeComponents/Header/Header';
import Quote from '@/components/HomeComponents/Quote/Quote';

import React from 'react';
import Reviews from '@/components/HomeComponents/Reviews/Reviews';
import Stats from '@/components/HomeComponents/Stats/Stats';
import Services from '@/components/HomeComponents/Services/Services';
import Projects from '@/components/HomeComponents/Projects/Project';
import OnGoing from '@/components/HomeComponents/OnGoingProject/OnGoingProject';
import Contact from '@/components/HomeComponents/ContactMe/ContactMe';
import Footer from '@/components/Shared/Footer';


const page = () => {

    return (
        <div className=' bg-black'>
            <Header/>
            <About/>
            <Quote/>
            <FloatingSkills/>
            <Reviews/>
            <Stats/>
            <Services/>
            <Projects/>
            <OnGoing/>
            <Contact/>
            <Footer/>
        </div>
    );
};

export default page;