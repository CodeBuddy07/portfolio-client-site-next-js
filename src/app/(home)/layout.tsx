import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/HomeComponents/Navbar/Navbar';
import { LenisProvider } from '@/Providers/LenisProvider';


export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'This is the dashboard layout of the portfolio client site.',
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {



    return (

        <LenisProvider>
            <Navbar />
            <main > {/* Add padding to account for fixed navbar */}
                {children}
            </main>
        </LenisProvider>


    );
};

export default DashboardLayout;