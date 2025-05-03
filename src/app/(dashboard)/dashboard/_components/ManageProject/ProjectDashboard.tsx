// app/dashboard/projects/project-dashboard.tsx
"use client";

import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AddProjectDialog } from "./AddProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { IProject } from "@/app/api/_models/ProjectModel";
import { useProjects } from "@/Tanstack/Project/useProjects";
import PaginationComponent from "@/components/Shared/Pagination";
import { ProjectDashboardSkeleton } from "./LoadingSkeleton";
import { AddTestimonialDialog } from "../../testimonials/_components/AddTestimonialDialog";




// Default projects for initial setup


// Move service functions directly into the component to avoid dependencies
export default function ProjectDashboard() {
  // State management

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  // Pagination settings
  const itemsPerPage = 10;

  // Service functions
  const { data: projectsData, isLoading } = useProjects({ search: searchQuery, page: currentPage, limit: itemsPerPage });

  const projects = projectsData?.projects || []; // Ensure projects is an array


  // Status badge color mapping
  const statusColors: Record<string, string> = {
    "completed": "bg-green-500",
    "in-progress": "bg-blue-500",
    "planned": "bg-yellow-500"
  };

  if (isLoading) {
    return (
      <ProjectDashboardSkeleton />
    );
  }


  return (
    <div className="space-y-6">
      {/* Search and Add section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project: IProject) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[project.status]}>
                      {project.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(project.deadline).toLocaleDateString()}</TableCell>
                  <TableCell> {project.budget! > 0 ? `$ ${project.budget?.toLocaleString()}` : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProject(project);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProject(project);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProject(project);
                            setIsReviewDialogOpen(true);
                          }}
                          className="text-red-600"
                        >
                          Add Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={projectsData?.pagination?.pages || 1}
        onPageChange={setCurrentPage}
      />


      {/* Add Project Dialog */}
      <AddProjectDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {/* Edit Project Dialog */}
      {selectedProject && (
        <EditProjectDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          project={selectedProject}
        />
      )}

      {/* Add Review Dialog */}
      {selectedProject && (
        <AddTestimonialDialog
          isOpen={isReviewDialogOpen}
          onClose={() => setIsReviewDialogOpen(false)}
          projectId={selectedProject._id as string} // Explicitly cast _id to string
        />
      )}

      {/* Delete Project Dialog */}
      {selectedProject && (
        <DeleteProjectDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          project={{ id: selectedProject._id as string, title: selectedProject.title }} // Explicitly cast _id to string
        />
      )}
    </div>
  );
}