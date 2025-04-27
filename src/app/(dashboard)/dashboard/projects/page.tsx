// app/dashboard/projects/page.tsx
import { ProjectDashboardSkeleton } from "@/components/DashboardComponents/ManageProject/LoadingSkeleton";
import ProjectDashboard from "@/components/DashboardComponents/ManageProject/ProjectDashboard";
import { Suspense } from "react";


export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
      <Suspense fallback={<ProjectDashboardSkeleton />}>
        <ProjectDashboard />
      </Suspense>
    </div>
  );
}