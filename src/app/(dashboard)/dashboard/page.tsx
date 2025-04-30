import { ProjectDashboardSkeleton } from "@/app/(dashboard)/dashboard/_components/ManageProject/LoadingSkeleton";
import ProjectDashboard from "@/app/(dashboard)/dashboard/_components/ManageProject/ProjectDashboard";
import { Suspense } from "react";


export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
      <Suspense fallback={<ProjectDashboardSkeleton />}>
        <ProjectDashboard />
        <div>
        </div>
      </Suspense>
    </div>
  )
}
