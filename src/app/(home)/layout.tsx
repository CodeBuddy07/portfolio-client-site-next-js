import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/app/(home)/_components/Navbar/Navbar';
import { LenisProvider } from '@/Providers/LenisProvider';
import AnimatedCursor from "react-animated-cursor"
import StickySideBar from '@/components/Shared/StickySideSocial';


export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'This is the dashboard layout of the portfolio client site.',
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {



    return (
        <LenisProvider>
            <AnimatedCursor
                innerSize={8}
                outerSize={18}
                innerScale={1}
                outerScale={2}

                outerAlpha={0.2}
                innerStyle={{
                    backgroundColor: 'white'
                }}
                outerStyle={{

                    backgroundColor: '#DC2626',
                    mixBlendMode: 'exclusion',

                }}

            />
            <Navbar />
            <StickySideBar/>
            <main > {/* Add padding to account for fixed navbar */}
                {children}
            </main>
        </LenisProvider>


    );
};

export default DashboardLayout;