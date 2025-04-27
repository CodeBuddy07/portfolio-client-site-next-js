import About from '@/components/HomeComponents/About/About';
import { Header } from '@/components/HomeComponents/Header/Header';

import React from 'react';


const page = () => {

    return (
        <div className=' bg-black'>
            <Header/>
            <About/>
        </div>
    );
};

export default page;