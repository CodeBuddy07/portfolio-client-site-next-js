import { Suspense } from "react";
import TestimonialDashboard from "./_components/TestimonialDashboard";
import { ProjectDashboardSkeleton } from "../_components/ManageProject/LoadingSkeleton";


const page = () => {
    return (
        <div className="container mx-auto py-10">
            <Suspense fallback={<ProjectDashboardSkeleton />}>
                <TestimonialDashboard />
                <div>
                </div>
            </Suspense>
        </div>

    );
};

export default page;