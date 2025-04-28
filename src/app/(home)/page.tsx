import About from '@/components/HomeComponents/About/About';
import FloatingSkills from '@/components/HomeComponents/SkillSlider/SkillSlider';
import { Header } from '@/components/HomeComponents/Header/Header';
import Quote from '@/components/HomeComponents/Quote/Quote';

import React from 'react';
import Reviews from '@/components/HomeComponents/Reviews/Reviews';
import Stats from '@/components/HomeComponents/Satats/Stats';


const page = () => {

    return (
        <div className=' bg-black'>
            <Header/>
            <About/>
            <Quote/>
            <FloatingSkills/>
            <Reviews/>
            <Stats/>
        </div>
    );
};

export default page;