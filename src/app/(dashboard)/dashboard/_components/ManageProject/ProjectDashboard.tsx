// app/dashboard/projects/project-dashboard.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { AddProjectDialog } from "./AddProjectDialog";
import { EditProjectDialog } from "./EditProjectDialog";
import { DeleteProjectDialog } from "./DeleteProjectDialog";


// Define Project type inline to avoid circular dependencies
export type Project = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
  startDate: string;
  finishDate?: string;
  liveLink?: string;
  repoLink?: string;
  techStacks: string[];
  budget?: number;
  extraInfo?: string;
};

// Default projects for initial setup
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with product listings, shopping cart, and payment integration.",
    status: "completed",
    category: "Web Development",
    startDate: "2024-01-15",
    finishDate: "2024-03-20",
    liveLink: "https://example.com/ecommerce",
    repoLink: "https://github.com/user/ecommerce",
    techStacks: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    budget: 5000,
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills with interactive elements.",
    status: "in-progress",
    category: "Web Development",
    startDate: "2024-02-10",
    techStacks: ["React", "Tailwind CSS", "Framer Motion"],
    budget: 1200,
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and team collaboration features.",
    status: "planned",
    category: "Mobile App",
    startDate: "2024-04-01",
    techStacks: ["React Native", "Firebase", "Redux"],
    budget: 3800,
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "Real-time weather tracking application with location-based forecasts and historical data analysis.",
    status: "completed",
    category: "Web Application",
    startDate: "2023-11-05",
    finishDate: "2024-01-10",
    liveLink: "https://weather-dashboard-demo.com",
    repoLink: "https://github.com/user/weather-dashboard",
    techStacks: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    budget: 2200,
  },
  {
    id: "5",
    title: "Recipe Sharing Platform",
    description: "Social platform for food enthusiasts to share and discover recipes with rating system.",
    status: "in-progress",
    category: "Web Application",
    startDate: "2024-03-01",
    techStacks: ["Vue.js", "Node.js", "Express", "MongoDB", "AWS S3"],
    budget: 4500,
  }
];

// Move service functions directly into the component to avoid dependencies
export default function ProjectDashboard() {
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Pagination settings
  const itemsPerPage = 5;
  
  // Service functions
  const fetchProjects = useCallback(async (): Promise<Project[]> => {
    // In a real application, this would be an API call
    try {
      // For demo purposes, we'll use localStorage
      const storedProjects = localStorage.getItem('portfolio-projects');
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
      return defaultProjects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return defaultProjects;
    }
  }, []);
  
  // Load projects on component mount - using an empty dependency array to run only once
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProjects();
  }, [fetchProjects]); // Include fetchProjects in the dependency array
  
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle add project
  const handleAddProject = async (newProject: Omit<Project, "id">) => {
    try {
      // Create a new project with ID
      const createdProject: Project = {
        ...newProject,
        id: Date.now().toString(),
      };
      
      // Update state and localStorage
      const updatedProjects = [...projects, createdProject];
      setProjects(updatedProjects);
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };
  
  // Handle edit project
  const handleEditProject = async (updatedProject: Project) => {
    try {
      // Update the project in state
      const updatedProjects = projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      );
      
      setProjects(updatedProjects);
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };
  
  // Handle delete project
  const handleDeleteProject = async (id: string) => {
    try {
      // Remove project from state
      const updatedProjects = projects.filter(p => p.id !== id);
      
      setProjects(updatedProjects);
      localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects));
      
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };
  
  // Status badge color mapping
  const statusColors: Record<string, string> = {
    "completed": "bg-green-500",
    "in-progress": "bg-blue-500",
    "planned": "bg-yellow-500"
  };

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading projects...</div>;
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
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              paginatedProjects.map((project) => (
                <TableRow key={project.id}>
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
                  <TableCell>${project.budget?.toLocaleString() || "N/A"}</TableCell>
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}  
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Add Project Dialog */}
      <AddProjectDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddProject}
      />
      
      {/* Edit Project Dialog */}
      {selectedProject && (
        <EditProjectDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          project={selectedProject}
          onEdit={handleEditProject}
        />
      )}
      
      {/* Delete Project Dialog */}
      {selectedProject && (
        <DeleteProjectDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          project={selectedProject}
          onDelete={() => handleDeleteProject(selectedProject.id)}
        />
      )}
    </div>
  );
}