import React from 'react';
import { Metadata } from 'next';
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from '@/components/Shared/ThemeToggler';
import { SignedIn, UserButton } from '@clerk/nextjs';


export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'This is the dashboard layout of the portfolio client site.',
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <SidebarProvider suppressHydrationWarning>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between pr-5 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />

                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <ModeToggle />
                    </div>
                </header>
                <div className=" p-5">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>

    );
};

export default DashboardLayout;